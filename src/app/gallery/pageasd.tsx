"use client"
import styles from './gallery.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useLenis } from '@studio-freight/react-lenis'
import { useEffect, useState } from 'react'
gsap.registerPlugin(ScrollTrigger);
export default function Gallery() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    },[])
    

    useGSAP(() => {
        if (typeof window === 'undefined') return;
        let totalWidth = 0;
        for (let i = 0; i < 9; i++) {
            const image = document.querySelector(`.${styles.images} > img:nth-child(${i + 1})`);
            if (image) {
                totalWidth += image.offsetWidth + 16;
            }
        }
        const width = totalWidth;

        gsap.to(`.${styles.images}`, {
            x: -width,
            ease: 'linear',
            scrollTrigger: {
                trigger: `.${styles.wrapper}`,
                start: 'top+=1',
                end: '+=2000',
                markers: true,
                scrub: true,
                pin: true,
                onUpdate: (self) => {
                    console.log(self.progress)
                },
                onLeave: (self) => {
                    if (self.direction === 1) {
                        self.scroll(self.start + 2); // Safely reset scroll position
                    }
                },
                onLeaveBack: (self) => {
                    if (self.direction === -1) {
                        self.scroll(self.end - 2); // Safely reset scroll position
                    }
                }
            }
        })
    },[mounted])

    if (!mounted) return <></>;

    return (
        <div className={styles.wrapper}>
            <div className={styles.images}>
                <img src="Gallery/1.png" />
                <img src="Gallery/2.png" />
                <img src="Gallery/3.png" />
                <img src="Gallery/4.png" />
                <img src="Gallery/5.png" />
                <img src="Gallery/6.png" />
                <img src="Gallery/7.png" />
                <img src="Gallery/8.png" />
                <img src="Gallery/9.png" />
                <img src="Gallery/1.png" />
                <img src="Gallery/2.png" />
                <img src="Gallery/3.png" />
            </div>
        </div>
    )
}