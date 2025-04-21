import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styles from './gradientwave.module.scss';

interface GradientWaveItemProps {
  index: number;
}

export default function GradientWaveItem({ index }: GradientWaveItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      width: "500%",
      duration: 2,
      repeat: -1,
      yoyo: true,
      delay: index * 0.2,
      ease: "linear",
      force3D: true,
      willChange: "width",
    });
  }, []);

  return (
    <div
      ref={ref}
      className={styles.gradient}
      style={{
        willChange: "width",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    />
  );
}
