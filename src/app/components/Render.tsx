"use client"
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useStore } from '@/useStore'
import fullcardStyle from './Cards/fullcards.module.scss'
import { useGSAP } from '@gsap/react'

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const meshRef = useRef()

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

  const tl = useRef<gsap.core.Timeline>();
  useEffect(() => {
    if (!meshRef.current) return

    meshRef.current.rotation.y = Math.PI / 2
    meshRef.current.position.set(0, 0, 0)
    meshRef.current.scale.set(20, 20, 20)
    const canvas = document.querySelector(`.canvas1`)
    // Create timeline
    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: `.${fullcardStyle.cards}`,
        start: 'top+=1500 top',
        end: 'top+=5000 top', // Total scroll distance
        scrub: 1,
        // pin: true,
        markers: true,
        onEnter: () => {
          canvas.style.opacity = '1'
        },
        onLeaveBack: () => {
          canvas.style.opacity = '0'
        },
        onLeave: () => {
          canvas.style.opacity = '0'
        },
        onEnterBack: () => {
          canvas.style.opacity = '1'
        }
      }
    })

    // gsap.to('.canvas2', {
    //   scrollTrigger: {
    //     trigger: `.${fullcardStyle.cards}`,
    //     start: 'top+=1500 top',
    //     end: 'top+=1600 top', // Total scroll distance
    //     scrub: 1,
    //     // pin: true,
    //     markers: true,
    //   },
    //   visibility: 'visible'
    // })

    // First animation: scale down (0-25% of scroll)
    tl.current.to(meshRef.current.scale, {
      x: 0.8,
      y: 0.8,
      z: 0.8,
      duration: 1
    }, 0) // Start immediately

    // Second animation: rotate (25%-75% of scroll)
    tl.current.to(meshRef.current.rotation, {
      y: '+=12',
      duration: 4
    }, 0.5) // Start at 25% of timeline

    // Third animation: scale up (75%-100% of scroll)
    // tl.current.to(meshRef.current.scale, {
    //   x: 15,
    //   y: 15,
    //   z: 15,
    //   duration: 1
    // }, 3) // Start after 2 seconds of timeline

    return () => {
      tl.current?.kill()
    }
  }, [])

  return <primitive ref={meshRef} object={scene} />
}

function Model2({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const meshRef = useRef()
  const tl = useRef<gsap.core.Timeline>();


  scene.traverse((child) => {
    if (child.isMesh) {
      child.scale.set(50, 50, 50)
      child.material = new THREE.MeshPhysicalMaterial({
        opacity: 0.5, roughness: 0.15, metalness: 0,
        thickness: 0.005, transmission: 1, ior: 100, transparent: true,
      })
    }
  })

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.PI / 2
      meshRef.current.position.set(0, 0, 0)
      meshRef.current.scale.set(0.8, 0.8, 0.8)
  
      // Create timeline
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: `.${fullcardStyle.cards}`,
          start: 'top+=1700 top',
          end: 'top+=4000 top', // Total scroll distance
          scrub: 1,
          // pin: true,
          markers: true,
        }
      })
  
      // First animation: scale down (0-25% of scroll)
  
      // Second animation: rotate (25%-75% of scroll)
      tl.current.to(meshRef.current.rotation, {
        y: '+=6.28',
        duration: 4
      }, 0.5) // Start at 25% of timeline
  
      // Third animation: scale up (75%-100% of scroll)
      // tl.current.to(meshRef.current.scale, {
      //   x: 15,
      //   y: 15,
      //   z: 15,
      //   duration: 1
      // }, 3) // Start after 2 seconds of timeline
  
      return () => {
        tl.current?.kill()
      }
    }
  }, [])

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

function Scene2() {
  return (
    <>
      <Suspense fallback={null}>
        <Model2 url="/model2.gltf" />
        <directionalLight intensity={10} position={[1, 2, 0]} />
      </Suspense>
    </>
  )
}

export default function Render() {

  return (
    <div className='render' style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', overflow: 'hidden',pointerEvents: 'none'}}>
      {/* First Layer - Model */}
      <div className='canvas1' style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 2, opacity: 1, pointerEvents: 'none'}}>
        <Canvas orthographic camera={{ position: [0, 0, 20], zoom: 100, near: 0.1, far: 1000 }} gl={{ alpha: true, stencil: true, antialias: true }} style={{ position: 'fixed', width: '100%', height: '100%', zIndex: 1, background: 'transparent',pointerEvents: 'none' }}>
          <Scene1 />
        </Canvas>
      </div>

      {/* Second Layer - Model2 */}
      {/* <div className='canvas2' style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1, opacity: 1, pointerEvents: 'none' }}>
        <Canvas orthographic camera={{ position: [0, 0, 20], zoom: 100, near: 0.1, far: 1000 }} gl={{ alpha: true, stencil: true, antialias: true }} style={{ position: 'fixed', width: '100%', height: '100%', zIndex: 1, background: 'transparent' }}>
          <Scene2 />
        </Canvas>
      </div> */}
    </div>
  )
}
