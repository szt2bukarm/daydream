"use client";
import AboutContent from '../components/About/AboutContent/AboutContent'
import GradientWave from '../components/GradientWave/GradientWave'
import styles from './about.module.scss'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';
import { useEffect, useState } from 'react';
import { useStore } from '@/useStore';
import Footer from '../components/Footer/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const {setScrollPos} = useStore();
    const [mounted,setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    },[])

    useEffect(() => {
        return () => {
          ScrollTrigger.getAll().forEach((instance) => {
            instance.kill();
          });
        }
      },[])


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