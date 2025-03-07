import { useEffect, useRef } from "react";
import SplitType from "split-type";
import styles from './features.module.scss'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Showcase from "./Showcase/Showcase";
import FlipInSequence from "./Showcase/FlipInSequence/FlipInSequence";

export default function Features() {
    const textRef = useRef([]);

    useEffect(() => {
        const splitText = new SplitType(textRef.current, { types: 'lines' });

        splitText.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        gsap.fromTo(splitText.lines,
            {
                opacity: 0,
                y: 100,
                rotate: 3
            },
            {
                opacity: 1,
                y: 0,
                rotate: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: `.${styles.wrapper}`,
                    start: 'top top',
                    end: 'top top',  
                    markers: false
                }
            }
        );

        return () => splitText.revert();
    }, []);

    useGSAP(() => {
        gsap.to(`.${styles.wrapper}`, {
            scrollTrigger: {
                trigger: `.${styles.wrapper}`,
                start: 'top 0%',
                end: 'bottom+=10000 0%',
                markers: false,
                pin: true
            }
        })

        gsap.to(`.${styles.absolute}`, {
            opacity: 0,
            scrollTrigger: {
                trigger: `.${styles.absolute}`,
                start: 'top+=700 0%',
                end: 'top+=1000 0%',
                markers: true,
                scrub: true,
                toggleActions: "play none none reverse"
            }
        })
    },[])


    return (
        <div className={styles.wrapper}>
            <div className={styles.absolute}>
                <div className={styles.textWrapper}>
                    <div ref={el => textRef.current[0] = el} className={styles.text}>
                        Daydream is crafted with precision. Minimal, tactile, and built to feel as good as it sounds.
                    </div>
                </div>
                <div className={styles.textWrapper}>
                    <div ref={el => textRef.current[1] = el} className={styles.text}>
                        Its smooth, industrial design blends clean lines with premium materials, creating a device that’s both nostalgic and unmistakably modern.
                    </div>
                </div>
            </div>
            <FlipInSequence />
            <Showcase />
        </div>
    )
}