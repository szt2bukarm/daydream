import styles from './showcasesocial.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Circle from './Circle'
import { useRef } from 'react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useLenis } from '@studio-freight/react-lenis';
import SplitType from 'split-type';
gsap.registerPlugin(ScrollTrigger);

const orbits = [
    { size: '890px', duration: 25, img: 'Features/user5.png' },
    { size: '1100px', duration: 20, img: 'Features/user6.png' }
];

export default function ShowcaseSocial() {
    const textRef = useRef(null);
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


        gsap.set([`.${styles.header}`, `.${styles.circles}`], {
            opacity: 0,
            pointerEvents: 'none'
        })
        gsap.set(splitText.lines, {
            y:  100,    
            rotate: 3
        })

        ScrollTrigger.create({
            trigger: `.${styles.wrapper}`,
            start: 'top+=300 0%',
            end: 'top+=400 0%',
            // markers: true,
            onEnter: () => {
                gsap.set(`.${styles.wrapper}`, {
                    display: "block"
                })
                gsap.to([`.${styles.header}`, `.${styles.circles}`], {
                    opacity: 1,
                    onComplete: () => lenis.start()
                });
                gsap.to(splitText.lines, {
                    y: 0,
                    rotate: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power4.out',
                });
            },
            onLeaveBack: () => {
                gsap.to([`.${styles.header}`, `.${styles.circles}`], {
                    opacity: 0,
                    onComplete: () => {
                        gsap.set(`.${styles.wrapper}`, {
                            display: "none"
                        })        
                    }
                });
                gsap.to(splitText.lines, {
                    y: -100,
                    rotate: 3,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: 'power4.in',
                    onStart: () => {
                        lenis.stop()
                        window.scrollBy(0, -5)
                    }
                });
            },
            onLeave: () => {
                gsap.to([`.${styles.header}`, `.${styles.circles}`], {
                    opacity: 0,
                    onComplete: () => {
                        gsap.set(`.${styles.wrapper}`, {
                            display: "none"
                        })
                    }
                });
                gsap.to(splitText.lines, {
                    y: -100,
                    rotate: 3,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: 'power4.in',
                    onStart: () => {
                        lenis.stop()
                        window.scrollBy(0, 5)
                    }
                });
            },
            onEnterBack: () => {
                gsap.set(`.${styles.wrapper}`, {
                    display: "block"
                })
                gsap.to([`.${styles.header}`, `.${styles.circles}`], {
                    opacity: 1,
                    delay: 0.3
                });
                gsap.to(splitText.lines, {
                    y: 0,
                    rotate: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power4.out',
                    onComplete: () => lenis.start()
                });
            }
        });
    },[lenis]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.relative}>
                <div>
                    <p className={styles.header}>Connect with who<br/>matter the most</p>
                    <p className={styles.subtext} ref={textRef}>
                        With Daydream, sharing isn’t just about music—it’s about connection. Instantly share your favorite tracks, playlists, or listening stats with friends. See what your circle is playing in real time and discover new music together.
                    </p>
                </div>

                <div className={styles.circles}>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Circle key={index} width={index * 300} height={index * 300} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
