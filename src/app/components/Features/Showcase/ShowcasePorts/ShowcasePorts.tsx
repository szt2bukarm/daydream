import styles from './showcaseports.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type';
import { useRef } from 'react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useLenis } from '@studio-freight/react-lenis';
gsap.registerPlugin(ScrollTrigger);

export default function ShowcasePorts() {
    const textRef = useRef(null);
    const cableRefs = useRef([]);
    const lenis = useLenis();

    useGSAP(() => {
        if (!lenis) return;
        const splitText = new SplitType(textRef.current, { types: 'lines' });

        splitText.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        gsap.set(cableRefs.current, {
            y: 1000
        })

        gsap.set(splitText.lines, {
            y: 100,
            rotate: 3
        })
        gsap.set(`.${styles.header}`, {
            opacity: 0
        })

        ScrollTrigger.create({
            trigger: `.${styles.wrapper}`,
            start: 'top+=400 0%',
            end: 'top+=500 0%',
            onEnter: () => {
                gsap.to(splitText.lines, {
                    y: 0,
                    rotate: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power4.out',
                    onComplete: () => lenis.start()
                });
                gsap.to(`.${styles.header}`, {
                    opacity: 1,
                    delay: 0.3,
                })
                gsap.to(cableRefs.current, {
                    y: 0,
                    duration: 1,
                    delay: 0.3,
                    stagger: 0.2,
                    ease: 'power4.out'
                })
            },
            onLeaveBack: () => {
                gsap.to(splitText.lines, {
                    y: -100,
                    rotate: 3,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: 'power4.in',
                    onStart: () => {
                        lenis.stop()
                    }
                });
                gsap.to(`.${styles.header}`, {
                    opacity: 0,
                })
                gsap.to(cableRefs.current, {
                    y: 1000,
                    duration: 1
                })
            }
        })
    },[lenis])

    return (
        <div className={styles.wrapper}>
            <div className={styles.relative}>
                <div className={styles.header}>Crisp sound out of<br></br>every port</div>
                <div className={styles.subtext} ref={textRef}>Daydream delivers high-fidelity sound through every connection. With a <b>premium DAC</b> at its core, it outputs rich, detailed audio whether you're using <b>USB-C, 3.5mm, or 6.35mm</b>.</div>
            
                <div className={styles.cables}>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <img key={index} src={`Features/Cables/cable${index + 1}.png`} className={styles.cable} ref={el => cableRefs.current[index] = el} />
                    ))}
                </div>
            </div>
        </div>
    )
}