import styles from './showcasesocial.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef, useEffect, useState } from 'react';

export default function Circle({ width, height, index }: { width: number; height: number; index: number }) {
  const ref = useRef(null);
  const [adjustedHeight, setAdjustedHeight] = useState(height);

  useEffect(() => {
    const updateHeight = () => {
      const windowWidth = window.innerWidth;
      setAdjustedHeight(windowWidth < 724 ? height : height + 40);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [height]);

  useGSAP(() => {
    gsap.to(ref.current, {
      opacity: 0.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      delay: index * 0.5,
    });
  }, []);

  return <div ref={ref} className={styles.circle} style={{ width: `${width}px`, height: `${adjustedHeight}px` }}></div>;
}
