import React, { useEffect, useMemo, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import styles from './showcaselogoshader.module.scss'
import { useStore } from '@/useStore';

// Utility to load a texture with settings
const loadTextureAsync = (path: string): Promise<THREE.Texture> => {
  const loader = new THREE.TextureLoader();
  return new Promise((resolve) => {
    loader.load(path, (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.minFilter = THREE.LinearMipMapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
      texture.flipY = false;
      resolve(texture);
    });
  });
};

const Scene = () => {
  const { size } = useThree();
  const [channel0, setChannel0] = useState<THREE.Texture | null>(null);
  const [channel1, setChannel1] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loadTextures = async () => {
      const [tex0, tex1] = await Promise.all([
        loadTextureAsync('/texture11.png'),
        loadTextureAsync('/texture00.jpg')
      ]);
      setChannel0(tex0);
      setChannel1(tex1);
    };

    loadTextures();
  }, []);

  const shaderMaterial = useMemo(() => {
    if (!channel0 || !channel1) return null;

    return new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2() },
        iChannel0: { value: channel0 },
        iChannel1: { value: channel1 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        #define TWO_PI 6.283185307179586476925286766559
        #define NUM_LAYERS 10
        #define LAYER_SEPERATION_FACTOR 0.000001
        #define ROTATION_MATRIX_MAX_SKEW 0.0
        #define ROTATION_MATRIX_SKEW_PERIOD 10.4

        uniform vec2 iResolution;
        uniform float iTime;
        uniform sampler2D iChannel0;
        uniform sampler2D iChannel1;
        varying vec2 vUv;

        float Hash_From2D(vec2 Vec) {
          return fract(sin(Vec.x + Vec.y * 37.0) * 104003.9);
        }

        float OscilateSinScalar(float Min, float Max, float Period) {
          return (Max-Min) * (sin(iTime*TWO_PI/Period)*0.5+0.5) + Min;
        }

        mat2 ZRotate_Skewed(float Angle) {
          float Skew = 6.0 - OscilateSinScalar(0.0, ROTATION_MATRIX_MAX_SKEW, ROTATION_MATRIX_SKEW_PERIOD);
          Angle = cos(Angle*0.1)*cos(Angle*0.7)*cos(Angle*0.73)*2.0;    
          return mat2(sin(Angle * Skew),cos(Angle),-cos(Angle * Skew),sin(Angle));
        }

        vec4 SampleMaterial(vec2 uv) {
          float t = iTime * 1.0;
          float Sample0 = texture2D(iChannel0, uv * 3.0).b;
          Sample0 -= 0.1 + sin(t + sin(uv.x) + sin(uv.y)) * 0.6; 
          Sample0 *= 0.3;
          Sample0 = abs(Sample0);
          Sample0 = 0.45/(Sample0*6.0+1.0);
          vec4 Colour = vec4(Sample0) * texture2D(iChannel0, uv * 0.04);
          return Colour * texture2D(iChannel1, (uv + (iTime*4.3)) * 0.001735);
        }

        vec3 PostProcessColour(vec3 Colour, vec2 uv) {
          Colour -= vec3(length(uv*0.1));
          Colour += Hash_From2D(uv*iTime*0.01)*0.02;
          float Brightness = length(Colour);
          Colour = mix(Colour, vec3(Brightness), Brightness - 0.5);
          return Colour;
        }

        void main() {
          vec2 uv = vUv * iResolution.xy;
          uv = uv / iResolution.xy - 0.5;
          uv.x *= iResolution.x / iResolution.y;

          vec3 finalColor = vec3(0.0);
          float ScaleValue = 8.75;
          float ScrollValue = -12.6;

          for (float i = 0.0; i < 1.0; i += (1.0/float(NUM_LAYERS))) {
            vec2 uv2 = uv;
            uv2 *= ZRotate_Skewed(iTime * i*i * 12.0 * LAYER_SEPERATION_FACTOR);
            uv2 *= ScaleValue * (i*i+2.0); 
            uv2.xy += ScrollValue;
            finalColor += SampleMaterial(uv2).xyz * (1.0/float(NUM_LAYERS)) * 3.5;
          }

          finalColor = PostProcessColour(finalColor, uv);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.DoubleSide,
      transparent: true
    });
  }, [channel0, channel1]);

  useFrame((state) => {
    if (shaderMaterial) {
      shaderMaterial.uniforms.iTime.value = state.clock.elapsedTime;
      shaderMaterial.uniforms.iResolution.value.set(size.width, size.height);
    }
  });

  if (!shaderMaterial) return null;

  return (
    <mesh scale={[size.width / 270, size.height / 290, 1]}>
      <planeGeometry args={[2, 2]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};


const ShowcaseLogoShader = () => {
  const {isMobile} = useStore();


  const cappedDPR = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1;

  return (
    <div className={isMobile ? styles.mobileWrapper : styles.wrapper}>
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        style={{ pointerEvents: 'none' }}
        camera={{ position: [0, 0, 1], near: 0.1, far: 10 }}
        dpr={cappedDPR}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default ShowcaseLogoShader;
