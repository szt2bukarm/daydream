"use client"
import { useStore } from "@/useStore"
import { useEffect, useRef } from "react"

export default function FadeLayer() {
    const {setFadeLayer} = useStore()
    const layerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (layerRef.current) {
            setFadeLayer(layerRef.current)
        }
    }, [layerRef.current])

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0, 
            width: '100vw', 
            height: '100%',
            overflow: 'hidden',
            zIndex: 2,
            opacity: 0,
            backgroundColor: 'black'
            }} ref={layerRef}></div>
    )
}