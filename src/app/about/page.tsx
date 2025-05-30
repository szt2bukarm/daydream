"use client";
import AboutContent from '../components/About/AboutContent/AboutContent'
import GradientWave from '../components/GradientWave/GradientWave'
import styles from './about.module.scss'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';
import { useCallback, useEffect, useState } from 'react';
import { useStore } from '@/useStore';
import Footer from '../components/Footer/Footer';
import navStyles from '../components/Nav/nav.module.scss'
import { Lenis, useLenis } from '@studio-freight/react-lenis';
import HeightWarning from '../components/HeightWarning/HeightWarning';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const [mounted,setMounted] = useState(false);
    const lenis = useLenis();    

    useEffect(() => {
        setMounted(true);
        const nav = document.querySelector(`.${navStyles.navWrapper}`)
        setTimeout(() => {
          if (nav) {
            nav.style.opacity = '1';
            nav.style.pointerEvents = 'all';
          }
        }, 750);
    },[])

    useEffect(() => {
      if (!lenis) return;
      lenis.stop();
      setTimeout(() => {
        window.scrollTo(0,0);
        lenis.start();
      },1)
    },[lenis])

    useEffect(() => {
        return () => {
          ScrollTrigger.getAll().forEach((instance) => {
            instance.kill();
          });
        }
      },[])


    return (
      <>
        <HeightWarning />
        <div className={styles.wrapper}>
            <div className={styles.gradient}>
                <GradientWave />
            </div>
            <AboutContent />
            <Footer />
        </div>
      </>
    )
}