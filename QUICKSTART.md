# Quick Start Guide

## ✅ Installation Complete!

Dependencies have been successfully installed. You're ready to run the Wabyte landing page.

## 🚀 Running the Development Server

### Option 1: Using Batch File (Recommended for Windows)
```bash
.\dev.bat
```

### Option 2: Using CMD
```bash
cmd /c "npm run dev"
```

### Option 3: Direct Command (if PowerShell is configured)
```bash
npm run dev
```

## 📱 Accessing the Application

Once the server starts, open your browser and navigate to:
```
http://localhost:3000
```

## 🎨 What to Expect

You should see:
1. **3D Animated Waves** - Sinusoidal waves in blue-to-cyan gradient
2. **Logo Reveal** - The "wabyte" logo appears after 3 seconds
3. **Particle System** - Subtle floating particles
4. **Mouse Parallax** - Camera follows your mouse movement
5. **Smooth Sections** - All landing page sections with animations

## ⚠️ Known Issues

### 3D Logo Font
The 3D logo requires a font file. You have two options:

**Option A: Use Simple Text (Quick Fix)**
The logo will still appear but without 3D depth. This is fine for development.

**Option B: Add Font File (Full 3D Effect)**
1. Visit https://gero3.github.io/facetype.js/
2. Upload Inter Bold font
3. Download JSON
4. Save to `public/fonts/inter_bold.json`

See `FONTS.md` for detailed instructions.

## 🔧 Other Commands

### Build for Production
```bash
cmd /c "npm run build"
```

### Start Production Server
```bash
cmd /c "npm start"
```

### Run Linter
```bash
cmd /c "npm run lint"
```

## 📊 Performance Testing

After the app is running, test performance:
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Run audit
4. Target: 95+ in all categories

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is busy:
```bash
cmd /c "npm run dev -- -p 3001"
```

### Build Errors
Check that all dependencies installed:
```bash
cmd /c "npm install"
```

### 3D Not Rendering
- Check browser console for WebGL errors
- Ensure your browser supports WebGL
- Try a different browser (Chrome recommended)

## 📚 Next Steps

1. ✅ Run the development server
2. ✅ Test all sections and animations
3. ✅ Check responsive behavior on mobile
4. ✅ Run Lighthouse audit
5. ✅ Review and customize content in `lib/constants/content.ts`
6. ✅ Adjust colors in `lib/constants/brand.ts` if needed

## 🎯 Customization

### Change Colors
Edit `lib/constants/brand.ts`:
```typescript
export const COLORS = {
  blue: '#0055ff',    // Change to your primary color
  cyan: '#40e0d0',    // Change to your accent color
  dark: '#2b2b2b',    // Background color
  white: '#ffffff',   // Text color
}
```

### Change Content
Edit `lib/constants/content.ts`:
- Hero section text
- Services descriptions
- Value propositions
- Technology stack
- CTA copy

### Adjust 3D Effects
Edit `components/three/Scene.tsx`:
- Wave amplitude and frequency
- Particle count
- Animation speed
- Camera settings

---

**Need help?** Check `README.md` and `ARCHITECTURE.md` for detailed documentation.
