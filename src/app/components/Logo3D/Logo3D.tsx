"use client"
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useStore } from '@/useStore'
import fullcardStyle from '../Cards/fullcards.module.scss'
import { useGSAP } from '@gsap/react'
import styles from './logo3d.module.scss'
import SplitType from 'split-type'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Text3D from '../Text3D/Text3D'
gsap.registerPlugin(ScrollTrigger);

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const meshRef = useRef()
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
  let resizeTimeout = null;

  scene.traverse((child) => {
    if (child.isMesh) {
      child.scale.set(50, 50, 50)
      child.material = new THREE.MeshBasicMaterial({
        colorWrite: false,
        stencilWrite: true,
        stencilFunc: THREE.AlwaysStencilFunc,
        stencilRef: 1,
        stencilZPass: THREE.ReplaceStencilOp,
        depthWrite: false,
        depthTest: false
      })
    }
  })

  const setupScrollTrigger = (meshRef) => {
    const tl = gsap.timeline();

    const trigger = ScrollTrigger.create({
      trigger: `.${styles.wrapper}`,
      start: 'top top',
      end: 'top+=6000 top',
      scrub: true,
      pin:true,
      animation: tl,
      // markers: true,
    })

    tl.to(meshRef.scale, {
      x: 0.8,
      y: 0.8,
      z: 0.8,
      duration: 1,
      force3D: true,
    }, 1.2)

    // Second animation: rotate (25%-75% of scroll)
    tl.to(meshRef.rotation, {
      y: '+=12',
      duration: 4,
      force3D: true,
    }, 1.7) 

    return trigger;
  }

  useEffect(() => {
    if (!meshRef.current) return

    meshRef.current.rotation.y = Math.PI / 2
    meshRef.current.position.set(0, 0, 0)
    meshRef.current.scale.set(20, 20, 20)

    scrollTriggerInstance.current = setupScrollTrigger(meshRef.current);
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (lastWidth === window.innerWidth) return;
      lastWidth = window.innerWidth;
        scrollTriggerInstance.current?.refresh();
        window.dispatchEvent(new Event('resize'));
    }

    window.addEventListener('resize', handleResize);

    return () => {
      // scrollTriggerInstance.current?.kill();
      window.removeEventListener('resize', handleResize);
    }
  }, [meshRef])

  return <primitive ref={meshRef} object={scene} />
}

function Scene1() {
  return (
    <>
      <Suspense fallback={null}>
        <Model url="/model.glb" />
        <directionalLight intensity={10} position={[1, 2, 0]} />
      </Suspense>

      {/* Plane Mesh for Stencil Effect */}
      <mesh scale={[50, 50, 1]} renderOrder={1}>
        <planeGeometry />
        <meshBasicMaterial
          color="black"
          stencilWrite={true}
          stencilFunc={THREE.NotEqualStencilFunc}
          stencilRef={1}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>
    </>
  )
}

export default function Logo3D() {
  const [hidden,setHidden] = useState(false);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
  let resizeTimeout = null;
  const cappedDPR = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1

  useEffect(() => {
    setTimeout(() => {
      setHidden(true)
    }, 500);
  },[])

  const setupScrollTrigger = () => {
    const trigger = ScrollTrigger.create({
      trigger: `.${styles.wrapper}`,
      start: 'top+=1000 top',
      end: 'top+=6000 top',
      onEnter: () => {
        setHidden(false);
      },
      onLeaveBack: () => {
        setHidden(true)
      },
      onLeave: () => {
        setHidden(true)
      },
      onEnterBack: () => {
        setHidden(false);
      }
    });
  
    return trigger;
  }



  useEffect(() => {
    if (typeof window === 'undefined') return;

    scrollTriggerInstance.current = setupScrollTrigger();
    // textInstance.current = textTrigger();

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (lastWidth === window.innerWidth) return;
      lastWidth = window.innerWidth;
      // clearTimeout(resizeTimeout!);
      // resizeTimeout = setTimeout(() => {
        scrollTriggerInstance.current?.refresh();  
        // textInstance.current?.refresh();
      // }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  },[]);



  return (
    <div className={styles.wrapper}>
      <Canvas dpr={cappedDPR} orthographic resize={{ scroll: false }} camera={{ position: [0, 0, 20], zoom: 100, near: 0.1, far: 1000 }} gl={{ alpha: true, stencil: true, antialias: true }} style={{ width: '100vw', height: '100dvh', zIndex: 1, background: 'transparent',pointerEvents: 'none',display: hidden ? 'none' : 'block'}}>
          <Scene1 />
        </Canvas>
    </div>
  )
}
