import styles from './showcasetext.module.scss';
import { useEffect, useRef, forwardRef, useState } from "react";
import SplitType from "split-type";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useLenis } from '@studio-freight/react-lenis';
import featuresStyles from '../features.module.scss'
import featuresMobileStyles from '../ShowcaseMobile/featuresmobile.module.scss'
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

export default function ShowcaseText({inline}:{inline?:boolean}) {
    const textRef = useRef([]);
    const lenis = useLenis();
    const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
    const splitInstanceRef = useRef<SplitType | null>(null);
    let resizeTimeout = null;

    const splitAndStyleText = () => {
        const el = textRef.current;
        const split = new SplitType(el, { types: 'lines' });
        split.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });
        gsap.set(split.lines, {
            y: 100,
            rotate: 3
        });
        return split;
    };

    useGSAP(() => {
        gsap.to(`.${styles.wrapper}`, {
            scrollTrigger: {
                trigger: inline ? `.${featuresMobileStyles.wrapper}` : `.${featuresStyles.wrapper}`,
                start: inline ? "top-=400" : 'top 0%',
                end: inline ? "bottom 0%" : "top+=200 0%",
                // markers: true,
                onEnter: () => {
                    gsap.set(`.${styles.wrapper}`, {
                        opacity: 1
                    })
                },
                onLeave: () => {
                    if (inline) return;
                    gsap.set(`.${styles.wrapper}`, {
                        opacity: 0,
                        delay: 1
                    })
                },
                onEnterBack: () => {
                    gsap.set(`.${styles.wrapper}`, {
                        opacity: 1
                    })
                },
            }
        })
    })
    const preventScroll = (e: TouchEvent) => e.preventDefault();

    const setupScrollTrigger = (splitTextInstance: SplitType) => {
        gsap.set(splitTextInstance.lines, { y: 100, rotate: 3 });
        const trigger = ScrollTrigger.create({
            trigger: inline ? `.${featuresMobileStyles.wrapper}` : `.${featuresStyles.wrapper}`,
            start: inline ? "top-=400" : 'top 0%',
            end: inline ? "bottom 0%" : "top+=200 0%",
            onEnter: () => {
                if (!splitTextInstance.lines) return;
                const currentY = gsap.getProperty(splitTextInstance.lines[0], 'y');
                if (currentY !== 0) {
                    if (!inline) {
                        lenis.stop();
                        document.addEventListener('touchmove', preventScroll, { passive: false });
                        document.body.classList.add('lock-scroll');
                    }
                    gsap.to(splitTextInstance.lines, {
                        y: 0,
                        rotate: 0,
                        duration: 1.2,
                        stagger: 0.1,
                        ease: 'power4.out',
                        onComplete: () => {
                            lenis.start();
                            document.body.classList.remove('lock-scroll');
                            document.removeEventListener('touchmove', preventScroll);
                        }
                    });
                }
            },
            onLeave: () => {
                if (inline) return;
                if (!inline) {
                    lenis.stop()
                    window.scrollBy(0, 5)
                }
                if (!splitTextInstance.lines) return;
                gsap.to(splitTextInstance.lines.reverse(), {
                    y: -100,
                    rotate: 3,
                    duration: 1,
                    stagger: 0.05,
                    delay: 0.2,
                    onComplete: () => {
                        gsap.set(splitTextInstance.lines, {
                            opacity: 0
                        })
                    }
                });
            },
            onEnterBack: () => {
                if (inline) return;
                if (!inline) {
                    lenis.stop();
                }
                if (!splitTextInstance.lines) return;
                gsap.set(splitTextInstance.lines, {
                    opacity: 1
                })
                gsap.to(splitTextInstance.lines.reverse(), {
                    y: 0,
                    rotate: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power4.out',
                    onComplete: () => lenis.start()
                });
            },
        });
        return trigger;
    };

    useGSAP(() => {
        // Initial setup
        if (!lenis) return;
        if (typeof window === 'undefined') return;
        const splitTextInstance = splitAndStyleText();
        if (!splitTextInstance) return;

        splitInstanceRef.current = splitTextInstance;
        scrollTriggerInstance.current = setupScrollTrigger(splitTextInstance);

        let lastWidth = window.innerWidth;

        const handleResize = () => {
            if (lastWidth === window.innerWidth) return;
            lastWidth = window.innerWidth;
            clearTimeout(resizeTimeout!);

            // Fade out text during resize
            textRef.current.forEach(text => {
                if (text && text.style.opacity !== '0') {
                    gsap.to(text, { opacity: 0, duration: 0.2 });
                }
            });

            resizeTimeout = setTimeout(() => {
                // Revert previous split
                if (splitInstanceRef.current) {
                    splitInstanceRef.current.revert();
                    splitInstanceRef.current = null;
                }

                // Kill existing scroll trigger
                if (scrollTriggerInstance.current) {
                    scrollTriggerInstance.current.kill();
                    scrollTriggerInstance.current = null;
                }

                // Re-split text
                const newSplit = splitAndStyleText();
                if (!newSplit) return;
                splitInstanceRef.current = newSplit;

                // Create new scroll trigger
                const newTrigger = setupScrollTrigger(newSplit);
                scrollTriggerInstance.current = newTrigger;

                // Refresh ScrollTrigger calculations
                ScrollTrigger.refresh();


                // Restore text opacity
                textRef.current.forEach(text => {
                    if (text) {  
                        gsap.to(text, { opacity: 1, duration: 0.2 });
                    }
                });
            }, 200);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [lenis]);


    return (
        <div className={`${styles.wrapper} ${inline ? '' : styles.absolute}`} style={{marginTop : inline ? "200px" : "0px", marginBottom : inline ? "100px" : "0px"}}>
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

