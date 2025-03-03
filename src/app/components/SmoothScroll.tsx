"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1, }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScroll;