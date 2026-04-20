/**
 * wabyte-reel.html → MP4 converter (high quality)
 *
 * Playwright drives headless Chromium; we capture frames via CDP
 * Page.startScreencast (lossless JPEG quality 100) directly from the
 * compositor, which bypasses Playwright's lossy VP8 recorder. Frames
 * are written to disk and encoded to H.264 MP4 with libx264 at CRF 14.
 *
 * Before recording we inject CSS that hides the Stage preview chrome
 * (bottom play/pause bar, scrubber, timestamps) and unifies the outer
 * frame background with the stage background.
 *
 * Composition: 1080x1920 portrait, 25 seconds.
 */

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { mkdirSync, existsSync, rmSync, writeFileSync, statSync, readdirSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Reel composition parameters (extracted from wabyte-reel.html).
const REEL = {
    width: 1080,
    height: 1920,
    durationSec: 25,
    fps: 30, // output framerate
};

const WARMUP_SEC = 2; // bundle unpack + first paint buffer

// CSS injected before capture. Hides the Stage's bottom media-player bar and
// merges the outer frame bg with the stage bg so thin dark borders vanish.
//
// The bar's distinguishing inline style uses `rgba(20, 20, 20, 0.92)` and
// `max-width: 680px`; we match either property (plus the leading "rgba(20, 20, 20"
// prefix) to be resilient against minor alpha tweaks.
const CHROME_HIDER_CSS = `
  html, body {
    background: #2b2b2b !important;
    overflow: hidden !important;
  }
  div[style*="rgba(20, 20, 20"],
  div[style*="rgba(20,20,20"],
  div[style*="max-width: 680px"] {
    display: none !important;
  }
  .tweaks { display: none !important; }
`;

const HTML_PATH = resolve(__dirname, 'wabyte-reel.html');
const OUT_DIR = resolve(__dirname, 'out');
const FRAMES_DIR = resolve(OUT_DIR, 'frames');
const MP4_PATH = resolve(OUT_DIR, 'wabyte-reel.mp4');

if (!existsSync(HTML_PATH)) {
    console.error(`[error] Source HTML not found: ${HTML_PATH}`);
    process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });
if (existsSync(FRAMES_DIR)) rmSync(FRAMES_DIR, { recursive: true, force: true });
mkdirSync(FRAMES_DIR, { recursive: true });
if (existsSync(MP4_PATH)) rmSync(MP4_PATH);

console.log('[1/4] Launching headless Chromium...');
const browser = await chromium.launch({
    args: [
        '--disable-web-security',
        '--autoplay-policy=no-user-gesture-required',
        // High-fidelity rendering flags; disables frame-rate throttling of
        // background tabs/hidden compositors so we get smooth animation.
        '--disable-background-timer-throttling',
        '--disable-renderer-backgrounding',
        '--disable-backgrounding-occluded-windows',
    ],
});

const context = await browser.newContext({
    viewport: { width: REEL.width, height: REEL.height },
    deviceScaleFactor: 1,
});

const page = await context.newPage();
page.on('pageerror', (err) => console.error('[pageerror]', err.message));
page.on('console', (msg) => {
    if (msg.type() === 'error') console.error('[browser console error]', msg.text());
});

console.log('[2/4] Loading reel HTML and waiting for bundle to unpack...');
await page.goto(pathToFileURL(HTML_PATH).href, { waitUntil: 'load' });
await page.waitForFunction(() => !document.getElementById('__bundler_loading'), {
    timeout: 30_000,
});

await page.addStyleTag({ content: CHROME_HIDER_CSS });

// Belt-and-suspenders: some React/Stage internals re-attach style tags that
// can win specificity wars. Also install a MutationObserver-driven sweep that
// hides the player bar by its geometry (bottom-aligned, wide, short) so the
// chrome stays hidden regardless of inline style churn.
await page.evaluate(() => {
    const hideChrome = () => {
        for (const el of document.querySelectorAll('div')) {
            const r = el.getBoundingClientRect();
            if (r.top >= 1850 && r.width > 400 && r.height > 20 && r.height < 80) {
                el.style.display = 'none';
            }
        }
    };
    hideChrome();
    const mo = new MutationObserver(hideChrome);
    mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
    // Extra sweep on an interval in case the observer misses transient inserts.
    setInterval(hideChrome, 120);
});

await page.waitForTimeout(WARMUP_SEC * 1000);
// Reapply in case React swapped nodes after our first injection.
await page.addStyleTag({ content: CHROME_HIDER_CSS });

console.log(`[3/4] Capturing ${REEL.durationSec}s via CDP screencast (JPEG q=100)...`);
const client = await context.newCDPSession(page);

const frames = [];
client.on('Page.screencastFrame', async (frame) => {
    frames.push({
        timestamp: frame.metadata.timestamp, // seconds since epoch, monotonic within a session
        data: Buffer.from(frame.data, 'base64'),
    });
    // Acknowledge as fast as possible so Chromium keeps sending frames.
    try {
        await client.send('Page.screencastFrameAck', { sessionId: frame.sessionId });
    } catch {
        /* session may already be stopped */
    }
});

await client.send('Page.startScreencast', {
    format: 'jpeg',
    quality: 100,
    maxWidth: REEL.width,
    maxHeight: REEL.height,
    everyNthFrame: 1,
});

const startTs = Date.now();
await page.waitForTimeout(REEL.durationSec * 1000);
await client.send('Page.stopScreencast');
const capturedMs = Date.now() - startTs;

await browser.close();

if (frames.length === 0) {
    console.error('[error] No frames captured from screencast.');
    process.exit(1);
}

console.log(`    captured ${frames.length} frames in ${(capturedMs / 1000).toFixed(2)}s (~${(frames.length / (capturedMs / 1000)).toFixed(1)} fps avg).`);

// Write all frames to disk and build a concat list with real per-frame
// durations derived from the CDP timestamps, so ffmpeg can re-timebase to a
// constant 30fps without visible stutter.
const t0 = frames[0].timestamp;
const concatLines = [];
for (let i = 0; i < frames.length; i++) {
    const name = `f_${String(i).padStart(6, '0')}.jpg`;
    writeFileSync(join(FRAMES_DIR, name), frames[i].data);
    const nextTs = i + 1 < frames.length ? frames[i + 1].timestamp : frames[i].timestamp + 1 / REEL.fps;
    const dur = Math.max(0.001, nextTs - frames[i].timestamp);
    concatLines.push(`file '${name.replace(/'/g, "'\\''")}'`);
    concatLines.push(`duration ${dur.toFixed(6)}`);
}
// ffmpeg concat demuxer quirk: repeat the last filename (without duration).
concatLines.push(`file '${`f_${String(frames.length - 1).padStart(6, '0')}.jpg`}'`);

const concatListPath = join(FRAMES_DIR, 'concat.txt');
writeFileSync(concatListPath, concatLines.join('\n'));

const frameBytes = readdirSync(FRAMES_DIR)
    .filter((n) => n.endsWith('.jpg'))
    .reduce((s, n) => s + statSync(join(FRAMES_DIR, n)).size, 0);
console.log(`    frames on disk: ${(frameBytes / (1024 * 1024)).toFixed(1)} MB total.`);

console.log('[4/4] Encoding to MP4 via ffmpeg (libx264 CRF 14 veryslow)...');
// Read per-frame timestamps via concat demuxer, then retime to a constant
// 30fps output. CRF 14 with veryslow gives very high quality and small file.
await runFfmpeg([
    '-y',
    '-f', 'concat',
    '-safe', '0',
    '-i', concatListPath,
    '-vf', `fps=${REEL.fps},scale=${REEL.width}:${REEL.height}:flags=lanczos`,
    '-t', String(REEL.durationSec),
    '-c:v', 'libx264',
    '-preset', 'veryslow',
    '-tune', 'film',
    '-crf', '14',
    '-profile:v', 'high',
    '-level:v', '4.2',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    MP4_PATH,
]);

const mp4SizeMb = (statSync(MP4_PATH).size / (1024 * 1024)).toFixed(2);
console.log(`[done] MP4 ready: ${MP4_PATH} (${mp4SizeMb} MB)`);

function runFfmpeg(args) {
    return new Promise((resolveProm, rejectProm) => {
        const child = spawn('ffmpeg', args, { stdio: ['ignore', 'inherit', 'inherit'] });
        child.on('error', rejectProm);
        child.on('exit', (code) => {
            if (code === 0) resolveProm();
            else rejectProm(new Error(`ffmpeg exited with code ${code}`));
        });
    });
}
