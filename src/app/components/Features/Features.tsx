'use client';

import { useEffect, useRef, useState } from "react";
import SplitType from "split-type";
import styles from './features.module.scss';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Showcase from "./Showcase/Showcase";
import FlipInSequence from "./Showcase/FlipInSequence/FlipInSequence";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useLenis } from "@studio-freight/react-lenis";
import ShowcaseAlbums from "./Showcase/ShowcaseAlbums/ShowcaseAlbums";
import ShowcaseSocial from "./Showcase/ShowcaseSocial/ShowcaseSocial";
import ShowcaseText from "./Showcase/ShowcaseText";
import Faces from "./Showcase/ShowcaseSocial/Faces";
import ShowcasePorts from "./Showcase/ShowcasePorts/ShowcasePorts";

gsap.registerPlugin(ScrollTrigger);

function isMobileDevice() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent.toLowerCase();
  return /android|iphone|ipad|ipod|mobile/.test(ua);
}

export default function Features() {
  const wrapperRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth > 724 || !isMobileDevice();
  });

  useEffect(() => {
    const handleResize = () => {
      const newShouldRender = window.innerWidth > 724 || !isMobileDevice();
      setShouldRender(newShouldRender);
    };

    handleResize(); // run once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      trigger: `.${styles.wrapper}`,
      start: 'top 0%',
      end: 'top+=500 0%',
      pin: true,
    });

    return () => {
      trigger.kill();
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <img src="gradient.png" className={`${styles.gradient} ${styles.gradientLeft}`} />
      <img src="gradient.png" className={`${styles.gradient} ${styles.gradientRight}`} />

      <ShowcaseText />
      <FlipInSequence />
      <ShowcaseAlbums />
      <Faces />
      <ShowcaseSocial />
      <ShowcasePorts />
    </div>
  );
}
