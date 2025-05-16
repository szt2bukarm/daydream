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
import { useStore } from "@/useStore";

gsap.registerPlugin(ScrollTrigger);


export default function Features() {
  const wrapperRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const { isMobile } = useStore();

  useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
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

  if (width <= 724 || isMobile || height <= 730) return <div></div>;

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
