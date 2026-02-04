/**
 * Wave Shader
 * Custom GLSL shaders for sinusoidal wave gradient
 */

export const waveVertexShader = `
  uniform float uTime;
  uniform float uAmplitude;
  uniform float uFrequency;
  
  varying vec2 vUv;
  varying float vElevation;
  
  void main() {
    vUv = uv;
    
    // Create sinusoidal wave pattern
    float elevation = sin(position.x * uFrequency + uTime) * uAmplitude;
    elevation += sin(position.y * uFrequency * 0.5 + uTime * 0.7) * uAmplitude * 0.5;
    
    vElevation = elevation;
    
    vec3 newPosition = position;
    newPosition.z += elevation;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

export const waveFragmentShader = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uTime;
  
  varying vec2 vUv;
  varying float vElevation;
  
  void main() {
    // Create gradient from blue to cyan based on elevation and position
    float mixStrength = (vElevation + 1.0) * 0.5;
    mixStrength += vUv.x * 0.3;
    mixStrength = clamp(mixStrength, 0.0, 1.0);
    
    vec3 color = mix(uColor1, uColor2, mixStrength);
    
    // Add subtle glow effect
    float glow = sin(uTime * 2.0) * 0.1 + 0.9;
    color *= glow;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;
