"use client";
import { useStore } from "@/useStore";
import { ReactLenis } from "@studio-freight/react-lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function SmoothScroll({ children }: { children: React.ReactNode }) {
  const {loaded} = useStore();

  if (!loaded) return;

  return (
    <ReactLenis className="current-page" root options={{ lerp: 0.1, duration: 1,smoothTouch: true }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;