import styles from './showcasetext.module.scss';
import { useEffect, useRef, forwardRef, useState } from "react";
import SplitType from "split-type";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useLenis } from '@studio-freight/react-lenis';
import featuresStyles from '../features.module.scss'
gsap.registerPlugin(ScrollTrigger);

export default function ShowcaseText() {
    const textRef = useRef([]);
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;
        const splitText = new SplitType(textRef.current, { types: 'lines' });

        splitText.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        gsap.set(splitText.lines, {
            y: 100,
            rotate: 3
        });

        ScrollTrigger.create({
            trigger: `.${featuresStyles.wrapper}`,
            start: 'top 0%',
            end: 'top+=200 0%',
            onEnter: () => {
                const currentY = gsap.getProperty(splitText.lines[0], 'y');
                if (currentY !== 0) {
                    lenis.stop();
                    gsap.to(splitText.lines, {
                        y: 0,
                        rotate: 0,
                        duration: 1.2,
                        stagger: 0.1,
                        ease: 'power4.out',
                        onComplete: () => lenis.start()
                    });
                }
            },
            onLeave: () => {
                lenis.stop()
                window.scrollBy(0, 5)

                gsap.to(splitText.lines.reverse(), {
                    y: -100,
                    rotate: 3,
                    duration: 1,
                    stagger: 0.05,
                    delay: 0.2
                });
            },
            onEnterBack: () => {
                lenis.stop();
                gsap.to(splitText.lines.reverse(), {
                    y: 0,
                    rotate: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power4.out',
                    onComplete: () => lenis.start()
                });
            },
        });

        return () => splitText.revert();
    }, [lenis]);

    return (
        <div className={styles.wrapper}>
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
    );
};

