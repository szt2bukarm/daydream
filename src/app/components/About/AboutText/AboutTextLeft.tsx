import styles from "./abouttext.module.scss";
import posterStyles from '../AboutPosters/aboutposters.module.scss'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { useRef } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function AboutTextLeft({ orientation }: { orientation: string }) {
    const textRef = useRef([]);
    const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
    const splitInstanceRef = useRef<SplitType | null>(null);
    let resizeTimeout: NodeJS.Timeout | null = null;

    const splitAndStyleText = () => {
        const textElements = textRef.current;
        if (!textElements) return null;

        // Temporarily set fixed dimensions for accurate splitting
        textElements.forEach(text => {
            if (text) {
                text.style.fontSize = '49px';
                text.style.width = '889px';
            }
        });

        const split = new SplitType(textElements, { types: 'lines' });

        // Wrap lines for overflow hidden
        split.lines?.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            line.parentNode?.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        // Reset dimensions after split
        setTimeout(() => {
            textElements.forEach(text => {
                if (text) {
                    text.style.fontSize = '';
                    text.style.width = '';
                }
            });
        }, 0);

        return split;
    };

    useGSAP(() => {
        gsap.set([`.${posterStyles.imageRight}`, `.${posterStyles.backgroundRight}`], {
            x: '-150vw',
            rotate: 0
        });

        ScrollTrigger.create({
            trigger: `.${orientation === "right" ? styles.wrapperRightText : styles.wrapperLeftText}`,
            start: 'top 30%',
            end: 'top 30%',
            onEnter: () => {
                gsap.to([`.${posterStyles.backgroundRight}`, `.${posterStyles.imageRight}`], {
                    x: 0,
                    stagger: 0.15,
                    duration: 1.5,
                    ease: 'power4.out'
                });
                gsap.to(`.${posterStyles.backgroundRight}`, {
                    rotate: -28,
                    delay: 0.2
                });
                gsap.to(`.${posterStyles.imageRight}`, {
                    rotate: -18,
                    delay: 0.25
                });
            }
        })
    },[])

    const setupScrollTrigger = (splitTextInstance: SplitType) => {
        // Set initial positions
        gsap.set(splitTextInstance.lines, { y: 100, rotate: 3 });

        // Create scroll trigger
        const trigger = ScrollTrigger.create({
            trigger: `.${orientation === "right" ? styles.wrapperRightText : styles.wrapperLeftText}`,
            start: 'top 30%',
            end: 'top 30%',
            onEnter: () => {
                gsap.to(splitTextInstance.lines, {
                    y: 0,
                    rotate: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power4.out'
                });
            }
        });

        return trigger;
    };


    useGSAP(() => {
        const splitTextInstance = splitAndStyleText();
        if (!splitTextInstance) return;

        gsap.set(splitTextInstance.lines, {
            y: 100,
            rotate: 3
        });

        ScrollTrigger.create({
            trigger: `.${orientation === "right" ? styles.wrapperRightText : styles.wrapperLeftText}`,
            start: 'top 30%',
            end: 'top 30%',
            onEnter: () => {
                gsap.to(splitTextInstance.lines, {
                    y: 0,
                    rotate: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power4.out'
                });
            }
        });
    }, []);


    useGSAP(() => {
        // Initial setup
        const splitTextInstance = splitAndStyleText();
        if (!splitTextInstance) return;

        splitInstanceRef.current = splitTextInstance;
        scrollTriggerInstance.current = setupScrollTrigger(splitTextInstance);

        const handleResize = () => {
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
    }, []);


    return (
        <div className={`${styles.wrapper} ${orientation === "right" ? styles.wrapperRightText : styles.wrapperLeftText}`}>

            <div className={styles.textWrapper}>
                <p ref={el => textRef.current[0] = el} className={`${styles.text} ${orientation === "right" ? styles.textRight : styles.textLeft}`}>
                    Inspired by the iconic players of the past and the way we discover music today, we’re creating tech that’s not just functional, but personal and fun.
                </p>
                <p ref={el => textRef.current[1] = el} className={`${styles.text} ${orientation === "right" ? styles.textRight : styles.textLeft}`}>
                    Because music deserves more than just another app—it deserves a device built for the way you live.
                </p>
            </div>

            <div className={`${posterStyles.imageWrapper} ${orientation === "right" ? posterStyles.imageWrapperLeft : posterStyles.imageWrapperRight}`}>
                <img src="About/poster1.png" className={`${posterStyles.image} ${orientation === "right" ? posterStyles.imageLeft : posterStyles.imageRight}`} />
                <div className={`${posterStyles.background} ${orientation === "right" ? posterStyles.backgroundLeft : posterStyles.backgroundRight}`}></div>
            </div>
        </div>
    );
}
