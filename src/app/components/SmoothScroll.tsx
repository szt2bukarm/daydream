"use client";
import { useStore } from "@/useStore";
import { ReactLenis } from "@studio-freight/react-lenis";
import { usePathname } from "next/navigation";

function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const {loaded} = useStore();

  if (!loaded) return;

  if (pathname === '/gallery') return (
    <>
    {children}
    </>
  );

  return (
    <ReactLenis className="current-page" root options={{ lerp: 0.1, duration: 1, }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;