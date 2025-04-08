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
            start: 'top 70%',
            end: 'top 70%',
            onEnter: () => {
                gsap.to([`.${styles.backgroundRight}`, `.${styles.imageRight}`], {
                    x: 0,
                    stagger: 0.15,
                    duration: 1.5,
                    ease: 'power4.out'
                });
                gsap.to(`.${styles.backgroundRight}`, {
                    rotate: -28,
                    delay: 0.2
                });
                gsap.to(`.${styles.imageRight}`, {
                    rotate: -18,
                    delay: 0.25
                });
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
            start: 'top 70%',
            end: 'top 70%',
            // markers: true,
            onEnter: () => {
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
                    delay: 0.15
                });                
            }})
    },[mounted])

    if (!mounted) return <></>;

    return (
        <div className={styles.wrapper} ref={imageRef}>
            <div className={`${styles.imageWrapper} ${orientation == "right" ? styles.imageWrapperRight : styles.imageWrapperLeft}`}>
                <img src={`About/poster${image}.png`}className={`${styles.image} ${orientation == "right" ? styles.imageRight : styles.imageLeft}`} />
                <div className={`${styles.background} ${orientation == "right" ? styles.backgroundRight : styles.backgroundLeft}`}></div>
            </div>
        </div>
    )
}