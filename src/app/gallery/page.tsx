'use client'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import navStyles from '../components/Nav/nav.module.scss'

const imageUrls = [
  '/Gallery/1.webp',
  '/Gallery/2.webp',
  '/Gallery/3.webp',
  '/Gallery/4.webp',
  '/Gallery/5.webp',
  '/Gallery/6.webp',
  '/Gallery/8.webp',
  '/Gallery/7.mp4',
  '/Gallery/9.webp',
  '/Gallery/10.webp',
  '/Gallery/11.webp',
  '/Gallery/12.webp',
  '/Gallery/13.webp',
]

function InfiniteScrollGallery() {
  const groupRef = useRef<THREE.Group>(null)
  const scrollTarget = useRef(0)
  const scrollCurrent = useRef(0)
  const scrollVelocity = useRef(0)
  const [itemData, setItemData] = useState<{ length: number; spacing: number }[]>([])
  const FIXED_HEIGHT = 10
  const SPACING = 0.5
  const snapping = useRef(false)
  const snapCooldown = useRef(0.5)
  const { camera } = useThree()

  const [isIdle, setIsIdle] = useState(false)
  const idleTimer = useRef<NodeJS.Timeout | null>(null)
  const items = useMemo(() => [...imageUrls, ...imageUrls, ...imageUrls], [])

  const [isMobile, setIsMobile] = useState(false)
  const [mobileWidth, setMobileWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 900)
      setMobileWidth(width > 450 ? width * 0.55 : width * 0.65)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const singleSetLength = useMemo(() => {
    if (itemData.length < imageUrls.length || itemData.some(item => !item)) return 0
    return itemData
      .slice(0, imageUrls.length)
      .reduce((acc, item) => acc + item.length + item.spacing, 0)
  }, [itemData])

  const resetIdleTimer = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current)
    setIsIdle(false)
    idleTimer.current = setTimeout(() => {
      setIsIdle(true)
    }, 5000)
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      scrollTarget.current += (isMobile ? 1 : -1) * e.deltaY * 0.02
      snapping.current = false
      snapCooldown.current = 0.5
      resetIdleTimer()
    }

    let lastTouchX = 0
    let lastTouchY = 0

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchX = e.touches[0].clientX
      lastTouchY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const currentX = e.touches[0].clientX
      const currentY = e.touches[0].clientY
      const deltaX = lastTouchX - currentX
      const deltaY = lastTouchY - currentY
      scrollTarget.current += (isMobile ? deltaY : -deltaX) * 0.05
      lastTouchX = currentX
      lastTouchY = currentY
      snapping.current = false
      snapCooldown.current = 0.5
      resetIdleTimer()
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    resetIdleTimer()

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [isMobile])

  useFrame((_, delta) => {
    if (!groupRef.current || singleSetLength === 0) return

    if (isIdle) {
      scrollTarget.current -= 0.01
    }

    const prev = scrollCurrent.current
    scrollCurrent.current = THREE.MathUtils.lerp(scrollCurrent.current, scrollTarget.current, delta * 10)
    scrollVelocity.current = scrollCurrent.current - prev

    if (isMobile) {
      groupRef.current.position.y = scrollCurrent.current
    } else {
      groupRef.current.position.x = scrollCurrent.current
    }

    const children = groupRef.current.children
    children.forEach((child) => {
      const mesh = child as THREE.Mesh
      const worldPos = isMobile
        ? mesh.position.y + groupRef.current!.position.y
        : mesh.position.x + groupRef.current!.position.x

      if (worldPos < -singleSetLength) {
        isMobile
          ? (mesh.position.y += singleSetLength * 3)
          : (mesh.position.x += singleSetLength * 3)
      } else if (worldPos > singleSetLength * 2) {
        isMobile
          ? (mesh.position.y -= singleSetLength * 3)
          : (mesh.position.x -= singleSetLength * 3)
      }
    })

    children.forEach((child) => {
      const mesh = child as THREE.Mesh
      const worldPos = isMobile
        ? mesh.position.y + groupRef.current!.position.y
        : mesh.position.x + groupRef.current!.position.x
      const material = mesh.material as THREE.MeshBasicMaterial

      const distance = Math.abs(worldPos)
      const targetOpacity = isIdle ? 1 : distance < 2 ? 1 : 0.5
      material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, delta * 3)
    })

    if (!isIdle && Math.abs(scrollVelocity.current) < 0.01 && !snapping.current) {
      snapCooldown.current -= delta
      if (snapCooldown.current <= 0) {
        snapping.current = true
        const closest = findClosestImage(groupRef.current, isMobile)
        if (closest) {
          const offset = isMobile ? closest.position.y : closest.position.x
          scrollTarget.current = -offset
        }
      }
    }

    const speed = Math.abs(scrollVelocity.current)
    const minZ = 14
    const maxZ = 15
    const targetZ = THREE.MathUtils.clamp(minZ + speed * 10, minZ, maxZ)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 10)
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
          singleSetLength={singleSetLength}
          itemData={itemData}
          isMobile={isMobile}
          mobileWidth={mobileWidth}
        />
      ))}
    </group>
  )
}

function findClosestImage(group: THREE.Group, isMobile: boolean) {
  let closest: THREE.Object3D | null = null
  let minDistance = Infinity

  group.children.forEach((child) => {
    const mesh = child as THREE.Mesh
    const pos = isMobile ? mesh.position.y + group.position.y : mesh.position.x + group.position.x
    const distance = Math.abs(pos)
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
  singleSetLength,
  itemData,
  isMobile,
  mobileWidth,
}: {
  url: string
  index: number
  setItemData: React.Dispatch<React.SetStateAction<{ length: number; spacing: number }[]>>
  fixedHeight: number
  spacing: number
  singleSetLength: number
  itemData: { length: number; spacing: number }[]
  isMobile: boolean
  mobileWidth: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const isVideo = url.endsWith('.mp4')
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const [aspect, setAspect] = useState(1)

  useEffect(() => {
    if (isVideo) {
      const video = document.createElement('video')
      video.src = url
      video.crossOrigin = 'anonymous'
      video.loop = true
      video.muted = true
      video.playsInline = true
      video.setAttribute('playsinline', '') // ✅ Fallback
      video.setAttribute('webkit-playsinline', '') // ✅ WebKit iOS-specific
      video.autoplay = true // ✅ Attempt autoplay (muted required)
      video.play()

      video.addEventListener('loadedmetadata', () => {
        const tex = new THREE.VideoTexture(video)
        setAspect(video.videoHeight / video.videoWidth)
        setTexture(tex)
      })
    } else {
      new THREE.TextureLoader().load(url, (tex) => {
        setAspect(tex.image.height / tex.image.width)
        setTexture(tex)
      })
    }
  }, [url])

  const width = isMobile ? mobileWidth / 50 : fixedHeight * (1 / aspect)
  const height = isMobile ? (mobileWidth * aspect) / 50 : fixedHeight
  const length = isMobile ? height : width

  useEffect(() => {
    const originalIndex = index % imageUrls.length
    if (texture && (!itemData[originalIndex] || itemData[originalIndex].length !== length)) {
      setItemData((prev) => {
        const newData = [...prev]
        newData[originalIndex] = { length, spacing }
        return newData
      })
    }
  }, [texture, length, index, spacing, itemData])

  const position = useMemo(() => {
    const originalIndex = index % imageUrls.length
    if (itemData.length < imageUrls.length || !itemData[originalIndex]) return [0, 0, 0]

    let pos = 0
    for (let i = 0; i < originalIndex; i++) {
      const item = itemData[i]
      if (!item) continue
      pos += item.length + item.spacing
    }

    if (index >= imageUrls.length) {
      pos += singleSetLength * Math.floor(index / imageUrls.length)
    }

    const offset = pos - singleSetLength * 1.5 + itemData[originalIndex].length / 2
    return isMobile ? [0, offset, 0] : [offset, 0, 0]
  }, [itemData, index, singleSetLength, isMobile])

  return texture ? (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} toneMapped={false} transparent opacity={0.5} />
    </mesh>
  ) : null
}

export default function GalleryPage() {
  const [viewportHeight, setViewportHeight] = useState('90vh')

  useEffect(() => {
    const nav = document.querySelector(`.${navStyles.navWrapper}`)
    setTimeout(() => {
      if (nav) {
        nav.style.opacity = '1'
        nav.style.pointerEvents = 'all'
      }
    }, 750)
    const handleResize = () => {
      const width = window.innerWidth
      setViewportHeight(width <= 900 ? '100dvh' : '90vh')
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const lastWidth = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
  
      const crossedWidthThreshold =
        (lastWidth.current <= 900 && currentWidth > 900) ||
        (lastWidth.current > 900 && currentWidth <= 900);
  
      
      if (crossedWidthThreshold) {
        window.location.reload();
      }
  
      lastWidth.current = currentWidth;
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  return (
    <div
      style={{
        height: viewportHeight,
        overflow: 'hidden',
        width: '100%',
        touchAction: 'none',
        overscrollBehavior: 'none',
      }}
    >
      <Canvas camera={{ position: [0, 0, 14], fov: 50 }}>
        <ambientLight intensity={1} />
        <InfiniteScrollGallery />
      </Canvas>
    </div>
  )
}
