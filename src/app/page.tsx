"use client"
import Hero from "./components/Hero/Hero";
import Introduction from "./components/Introduction/Introduction";
import FloatingCards from "./components/FloatingCards/FloatingCards";
import Features from "./components/Features/Features";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from './main.module.scss'
import { useStore } from "@/useStore";
import FullCards from "./components/Cards/FullCards";
import Render from "./components/Logo3D/Logo3D";
import Colors from "./components/Colors/Colors";
import Specs from "./components/Specs/Specs";
import Footer from "./components/Footer/Footer";
import FeaturesMobile from "./components/Features/ShowcaseMobile/FeaturesMobile";
import navStyles from './components/Nav/nav.module.scss'
import Logo3D from "./components/Logo3D/Logo3D";
import Text3D from "./components/Text3D/Text3D";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import { useLenis } from "@studio-freight/react-lenis";
import HeightWarning from "./components/HeightWarning/HeightWarning";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [mounted,setMounted] = useState(false);
  const lastWidth = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);
  const lastHeight = useRef(typeof window !== 'undefined' ? window.innerHeight : 0);
  const {isMobile} = useStore();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.stop();
    setTimeout(() => {
      window.scrollTo(0,0);
      lenis.start();
    },1)
  },[lenis])

  useEffect(() => {
    const handleResize = () => {
      if (isMobile) return;
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;
  
      const crossedWidthThreshold =
        (lastWidth.current <= 725 && currentWidth > 725) ||
        (lastWidth.current > 725 && currentWidth <= 725);
  
      const crossedHeightThreshold =
        (lastHeight.current <= 730 && currentHeight > 730) ||
        (lastHeight.current > 730 && currentHeight <= 730);
  
      if (crossedWidthThreshold || crossedHeightThreshold) {
        window.location.reload();
      }
  
      lastWidth.current = currentWidth;
      lastHeight.current = currentHeight;
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    setMounted(true);
    const nav = document.querySelector(`.${navStyles.navWrapper}`)
    setTimeout(() => {
      if (nav) {
        nav.style.opacity = '1';
        nav.style.pointerEvents = 'all';
      }
    }, 750);
    return () => {
      ScrollTrigger.getAll().forEach((instance) => {
        instance.kill();
      });
    }
  },[])

  useEffect(() => {
    const handleSpace = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes((document.activeElement as HTMLElement)?.tagName)) {
        e.preventDefault();
      }
    };
  
    window.addEventListener('keydown', handleSpace);
  
    return () => {
      window.removeEventListener('keydown', handleSpace);
    };
  }, []);

  if (!mounted) return <></>;   

  return (
    <>
    <HeightWarning />
    <div className={styles.wrapper}>
      <VideoPlayer />
      <Hero />
      <Introduction />
      <FloatingCards />
      <FeaturesMobile />
      <Features />
      <div style={{position: "relative",width: '100%',height: '100%',contain: "style"}}>
        <FullCards />
        <Logo3D />
      </div>
      <Text3D />
      <Colors />
      <Specs />
    </div>
    <Footer />
    </>
  )
}