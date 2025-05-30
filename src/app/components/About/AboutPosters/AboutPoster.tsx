import styles from "./aboutposters.module.scss"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import { useEffect, useRef, useState } from "react"

export default function AboutPoster({orientation,image}:{orientation?:string,image?:string}) {
    const imageRef = useRef(null);
    const [mounted,setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    },[])

    useGSAP(() => {
        if (!mounted) return;
        if (orientation !== "right") return;
        if (typeof window === 'undefined') return;
        gsap.set([`.${styles.imageRight}`, `.${styles.backgroundRight}`], {
            x: '-150vw',
            rotate: 0
        });

        ScrollTrigger.create({
            trigger: imageRef.current,
            start: 'top 50%',
            end: 'top 50%',
            // markers: true,
            onEnter: () => {
                if (gsap.getProperty(`.${styles.imageRight}`, 'x') === 0) return;
                gsap.to([`.${styles.backgroundRight}`, `.${styles.imageRight}`], {
                    x: 0,
                    stagger: 0.15,
                    duration: 1.5,
                    ease: 'power4.out',
                });
                gsap.to(`.${styles.backgroundRight}`, {
                    rotate: -28,
                    delay: 0.2
                });
                gsap.to(`.${styles.imageRight}`, {
                    delay: 0.25,
                    rotate: -18,
                    filter: 'brightness(250%)'
                });
                gsap.to(`.${styles.imageRight}`, {
                    delay: 0.6,
                    filter: 'brightness(100%)'
                })
            }
        })
    },[mounted])

    useGSAP(() => {
        if (!mounted) return;
        if (orientation !== "left") return;
        if (typeof window === 'undefined') return;
        gsap.set([`.${styles.imageLeft}`, `.${styles.backgroundLeft}`], {
            x: '150vw',
            rotate: 0
        });

        ScrollTrigger.create({
            trigger: imageRef.current,
            start: 'top 50%',
            end: 'top 50%',
            // markers: true,
            onEnter: () => {
                if (gsap.getProperty(`.${styles.imageLeft}`, 'x') === 0) return;
                gsap.to([`.${styles.backgroundLeft}`, `.${styles.imageLeft}`], {
                    x: 0,
                    stagger: 0.15,
                    duration: 1.5,
                    ease: 'power4.out'
                });
                
                gsap.to(`.${styles.backgroundLeft}`, {
                    rotate: 11,
                    delay: 0.1
                });
                
                gsap.to(`.${styles.imageLeft}`, {
                    rotate: 21,
                    filter: 'brightness(250%)',
                    delay: 0.15
                });     

                gsap.to(`.${styles.imageLeft}`, {
                    delay: 0.6,
                    filter: 'brightness(100%)'
                })           
            }})
    },[mounted])

    if (!mounted) return <></>;

    return (
        <div className={styles.wrapper} ref={imageRef}>
            <div className={`${styles.imageWrapper} ${orientation == "right" ? styles.imageWrapperRight : styles.imageWrapperLeft}`}>
                <img alt="Daydream poster" src={`About/poster${image}.webp`}className={`${styles.image} ${orientation == "right" ? styles.imageRight : styles.imageLeft}`} />
                <div className={`${styles.background} ${orientation == "right" ? styles.backgroundRight : styles.backgroundLeft}`}></div>
            </div>
        </div>
    )
}