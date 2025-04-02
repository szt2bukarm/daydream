import React, { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float iTime;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
varying vec2 vUv;

#define TAU 6.2831853071

void main() {
  vec2 uv = vUv;
  
  float o = texture2D(iChannel1, uv * 0.55 + vec2(0.0, iTime * 0.025)).r;
  float d = (texture2D(iChannel0, uv * 0.25 - vec2(0.0, iTime * 0.02 + o * 0.02)).r * 2.0 - 1.0);
  
  float v = uv.y + d * 0.1;
  v = 1.0 - abs(v * 3.0 - 1.0);
  v = pow(v, 3.0 + sin((iTime * 0.2 + d * 0.25) * TAU) * 0.5);
  
  vec3 color = vec3(0.0);
  
  float x = (1.0 - uv.x * 0.75);
  float y = 1.0 - abs(uv.y * 2.0 - 1.0);
  
  // Darker red on edges, vibrant in center
  vec3 baseColor1 = vec3(0.4, 0.05, 0.05);    // Dark red
  vec3 baseColor2 = vec3(0.7, 0.1, 0.1);      // Slightly more red, less orange
  vec3 highlightColor = vec3(0.8, 0.5, 0.4);  // A less intense orange
  
  // Gradient interpolation
  vec3 gradient1 = mix(baseColor1, baseColor2, y);
  vec3 gradient2 = mix(baseColor2, highlightColor, y);
  color += mix(gradient1, gradient2, x) * v;
  
  // Edge darkening effect
  float edgeDarkness = 1.0 - smoothstep(0.5, 0.3, length(uv - 0.5));
  color *= mix(1.0, 0.6, edgeDarkness);
  
  // Center vibrancy boost
  float centerGlow = pow(1.0 - length(uv - 0.5), 2.0) * 0.5;
  color += vec3(0.3, 0.05, 0.0) * centerGlow;

  vec2 seed = gl_FragCoord.xy;
  vec2 r;
  r.x = fract(sin((seed.x * 2.9898) + (seed.y * 78.2330)) * 43758.5453);
  r.y = fract(sin((seed.x * 13.7842) + (seed.y * 47.5134)) * 43758.5453);

  float alpha = smoothstep(0.3, 1.0, length(color));
  gl_FragColor = vec4(color, alpha);
}
`


function PortalEffect() {
  const materialRef = useRef()
  const { viewport } = useThree()
  
  const [noiseTex1, noiseTex2] = useLoader(THREE.TextureLoader, [
    '/texture0.png',
    '/texture1.jpg'
  ])

  const uniforms = useMemo(() => ({
    iTime: { value: 0 },
    iChannel0: { value: null },
    iChannel1: { value: null }
  }), [])

  useEffect(() => {
    if (noiseTex1 && noiseTex2) {
      noiseTex1.wrapS = noiseTex1.wrapT = THREE.RepeatWrapping
      noiseTex2.wrapS = noiseTex2.wrapT = THREE.RepeatWrapping
      uniforms.iChannel0.value = noiseTex1
      uniforms.iChannel1.value = noiseTex2
    }
  }, [noiseTex1, noiseTex2, uniforms])

  useFrame((state) => {
    uniforms.iTime.value = state.clock.elapsedTime
  })

  return (
    <mesh 
      scale={[viewport.width, viewport.height, 1]}
      position={[0, -viewport.height * 0.3, 0]} // Move down by 25% of viewport height
    >
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function Aurora() {
  return (
    <div style={{width: "200vw", height: "100vh",transform: "translateX(-50vw)",overflowX: "hidden"}}>
      <Canvas 
        camera={{ position: [0, 0, 1] }}
      >
        <PortalEffect />
      </Canvas>
    </div>
  )
}