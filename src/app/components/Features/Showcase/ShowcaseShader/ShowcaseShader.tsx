import React, { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import styles from './showcaseshader.module.scss'

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
  
  // Vertical adjustment: shift coordinates upward
  float verticalShift = 0.45;
  uv.y += verticalShift;
  
  // Sample textures with vertical offset
  float o = texture2D(iChannel1, uv * 0.55 + vec2(0.0, iTime * 0.025)).r;
  float d = (texture2D(iChannel0, uv * 0.25 - vec2(0.0, iTime * 0.02 + o * 0.02)).r * 2.0 - 1.0);
  
  // Adjust vertical calculations for higher position
  float v = (uv.y - verticalShift * 2.0) + d * 0.1;
  v = 1.0 - abs(v * 2.5 - 1.0);
  v = pow(v, 4.0 + sin((iTime * 0.2 + d * 0.25) * TAU) * 0.5);
  
  vec3 color = vec3(0.0);
  
  // Adjust gradient positioning
  float y = 1.0 - abs((uv.y - verticalShift) * 3.0 - 1.0);
  
    vec3 baseColor = vec3(0.149, 0.329, 0.369); // Dark blue
  vec3 highlightColor = vec3(0.298, 0.569, 0.698); // Bright blue
  
  color += mix(baseColor, highlightColor, y) * v;

  gl_FragColor = vec4(color, 1.0);
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
      position={[0, 0, 0]}
    >
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function ShowcaseShader() {
  return (
    <div className={styles.wrapper}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <PortalEffect />
      </Canvas>
    </div>
  )
}