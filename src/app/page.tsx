"use client"
import Hero from "./components/Hero/Hero";
import Introduction from "./components/Introduction/Introduction";
import FloatingCards from "./components/FloatingCards/FloatingCards";
import Features from "./components/Features/Features";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
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

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [mounted,setMounted] = useState(false);

  const lastWidth = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;

      const crossedThreshold =
        (lastWidth.current <= 724 && currentWidth > 724) ||
        (lastWidth.current > 724 && currentWidth <= 724);

      if (crossedThreshold) {
        window.location.reload();
      }

      lastWidth.current = currentWidth;
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

  if (!mounted) return <></>;   

  return (
    <>
    <div className={styles.wrapper}>
      <Hero />
      <Introduction />
      <FloatingCards />
      <FeaturesMobile />
      <Features />
      <div style={{position: "relative",width: '100%',height: '100%'}}>
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