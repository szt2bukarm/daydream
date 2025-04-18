'use client'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useRef, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'

const imageUrls = [
  '/Gallery/1.png',
  '/Gallery/2.png',
  '/Gallery/3.png',
  '/Gallery/4.png',
  '/Gallery/5.png',
  '/Gallery/6.png',
  '/Gallery/7.png',
  '/Gallery/8.png',
  '/Gallery/9.png',
]

function InfiniteScrollGallery() {
  const groupRef = useRef<THREE.Group>(null)
  const scrollTarget = useRef(0)
  const scrollCurrent = useRef(0)
  const scrollVelocity = useRef(0)
  const [itemData, setItemData] = useState<{ width: number; spacing: number }[]>([])
  const FIXED_HEIGHT = 10
  const SPACING = 0.5
  const snapping = useRef(false)
  const snapCooldown = useRef(0)

  const items = useMemo(() => [...imageUrls, ...imageUrls, ...imageUrls], [])

  const singleSetWidth = useMemo(() => {
    if (itemData.length < imageUrls.length) return 0
    return itemData
      .slice(0, imageUrls.length)
      .reduce((acc, item) => acc + item.width + item.spacing, 0)
  }, [itemData])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      scrollTarget.current += e.deltaY * 0.02
      snapping.current = false
      snapCooldown.current = 0.05
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current || singleSetWidth === 0) return

    const prev = scrollCurrent.current
    scrollCurrent.current = THREE.MathUtils.lerp(scrollCurrent.current, scrollTarget.current, delta * 10)
    scrollVelocity.current = scrollCurrent.current - prev
    groupRef.current.position.x = scrollCurrent.current

    // Wrap for infinite scroll
    const children = groupRef.current.children
    children.forEach((child) => {
      const mesh = child as THREE.Mesh
      const worldX = mesh.position.x + groupRef.current!.position.x

      if (worldX < -singleSetWidth) {
        mesh.position.x += singleSetWidth * 3
      } else if (worldX > singleSetWidth * 2) {
        mesh.position.x -= singleSetWidth * 3
      }
    })

    // Opacity fading based on distance
    children.forEach((child) => {
      const mesh = child as THREE.Mesh
      const worldX = mesh.position.x + groupRef.current!.position.x
      const material = mesh.material as THREE.MeshBasicMaterial

      const distance = Math.abs(worldX)
      const targetOpacity = distance < 3 ? 1 : 0.5 // Center image opacity is 1, others fade to 0.5
      material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, delta * 10)
    })

    // Snap logic
    if (Math.abs(scrollVelocity.current) < 0.01 && !snapping.current) {
      snapCooldown.current -= delta
      if (snapCooldown.current <= 0) {
        snapping.current = true
        const closest = findClosestImage(groupRef.current)
        if (closest) {
          const offset = closest.position.x
          scrollTarget.current = -offset
        }
      }
    }
  })

  return (
    <group ref={groupRef}>
      {items.map((url, i) => (
        <ImageCard
          key={i}
          url={url}
          index={i}
          setItemData={setItemData}
          fixedHeight={FIXED_HEIGHT}
          spacing={SPACING}
          singleSetWidth={singleSetWidth}
          itemData={itemData}
        />
      ))}
    </group>
  )
}

function findClosestImage(group: THREE.Group) {
  let closest: THREE.Object3D | null = null
  let minDistance = Infinity

  group.children.forEach((child) => {
    const mesh = child as THREE.Mesh
    const worldX = mesh.position.x + group.position.x
    const distance = Math.abs(worldX)

    if (distance < minDistance) {
      minDistance = distance
      closest = mesh
    }
  })

  return closest
}

function ImageCard({
  url,
  index,
  setItemData,
  fixedHeight,
  spacing,
  singleSetWidth,
  itemData,
}: {
  url: string
  index: number
  setItemData: React.Dispatch<React.SetStateAction<{ width: number; spacing: number }[]>>
  fixedHeight: number
  spacing: number
  singleSetWidth: number
  itemData: { width: number; spacing: number }[]
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useLoader(THREE.TextureLoader, url)
  const aspect = texture.image ? texture.image.width / texture.image.height : 1
  const width = fixedHeight * aspect

  useEffect(() => {
    if (
      texture.image &&
      (!itemData[index % imageUrls.length] || itemData[index % imageUrls.length].width !== width)
    ) {
      setItemData((prev) => {
        const newData = [...prev]
        newData[index % imageUrls.length] = { width, spacing }
        return newData
      })
    }
  }, [texture.image, width, index])

  const positionX = useMemo(() => {
    if (itemData.length < imageUrls.length) return 0

    let xPos = 0
    const originalIndex = index % imageUrls.length

    for (let i = 0; i < originalIndex; i++) {
      xPos += itemData[i].width + itemData[i].spacing
    }

    if (index >= imageUrls.length) {
      xPos += singleSetWidth * Math.floor(index / imageUrls.length)
    }

    return xPos - singleSetWidth * 1.5 + width / 2
  }, [itemData, index, width, singleSetWidth])

  return (
    <mesh ref={meshRef} position={[positionX, 0, 0]}>
      <planeGeometry args={[width, fixedHeight]} />
      <meshBasicMaterial map={texture} toneMapped={false} transparent opacity={0.5} />
    </mesh>
  )
}

export default function GalleryPage() {
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={1} />
        <InfiniteScrollGallery />
      </Canvas>
    </div>
  )
}
