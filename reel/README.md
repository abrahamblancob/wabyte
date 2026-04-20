# wabyte-reel → MP4

One-off tooling that converts `wabyte-reel.html` (a self-unpacking Babel/React
reel composition, 1080×1920, 25s) into an H.264 MP4.

Lives on the `reel-to-video` branch only — not meant to reach `main`.

## Run

```bash
cd reel
npm install
npx playwright install chromium
npm run convert
```

Output: `reel/out/wabyte-reel.mp4`.

## How it works

1. Playwright launches headless Chromium at 1080×1920.
2. Loads the reel HTML from disk; waits for the bundler's loading indicator
   to disappear (signals manifest unpack is complete).
3. Waits a 2s warmup so React/Babel finishes bootstrapping, then records the
   full 25s of animation to WebM via Playwright's `recordVideo`.
4. ffmpeg re-encodes to H.264 MP4 at 30fps CRF 18 with faststart, trimming the
   warmup leader.

## Requirements

- Node 18+
- ffmpeg on `PATH`
