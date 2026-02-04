# Font Files Note

The 3D logo component (`components/three/Logo3D.tsx`) references a font file at `/fonts/inter_bold.json`.

## Options:

### Option 1: Use Text Mesh (Recommended for now)
Replace the `Text3D` component with a simpler text mesh or use the `@react-three/drei` `Text` component which doesn't require font files.

### Option 2: Generate Font JSON
Use [facetype.js](https://gero3.github.io/facetype.js/) to convert Inter Bold TTF to Three.js JSON format:
1. Download Inter Bold from Google Fonts
2. Upload to facetype.js
3. Download the JSON file
4. Place in `public/fonts/inter_bold.json`

### Option 3: Use Alternative 3D Text
Use the simpler `Text` component from drei:
```tsx
import { Text } from '@react-three/drei';

<Text
  font="/fonts/Inter-Bold.ttf"
  fontSize={0.5}
  color={COLORS.white}
>
  wabyte
</Text>
```

## Current Implementation
The current code uses `Text3D` which provides the best 3D effect with bevels and depth. For production, you'll need to either:
- Add the font JSON file
- Or modify the component to use the simpler `Text` component

The application will still run, but the 3D logo won't render until the font file is available.
