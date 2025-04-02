"use client";
import AboutContent from '../components/About/AboutContent/AboutContent'
import GradientWave from '../components/GradientWave/GradientWave'
import styles from './about.module.scss'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';
import { useEffect } from 'react';
import { useStore } from '@/useStore';
import Footer from '../components/Footer/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const {setScrollPos} = useStore();

    useEffect(() => {
        return () => {
          ScrollTrigger.getAll().forEach((instance) => {
            instance.kill();
          });
        }
      },[])

      useEffect(() => {
        const handleScroll = () => {
          setScrollPos(window.scrollY);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [setScrollPos]);



    return (
        <div className={styles.wrapper}>
            <div className={styles.gradient}>
                <GradientWave />
            </div>
            <AboutContent />
            <Footer />
        </div>
    )
}