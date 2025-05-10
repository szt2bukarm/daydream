import styles from './showcasesocial.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Circle from './Circle'
import { useRef } from 'react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useLenis } from '@studio-freight/react-lenis';
import SplitType from 'split-type';
import ShowcaseHeader from '../ShowcaseHeader';
import ShowcaseSubtext from '../ShowcaseSubtext';
gsap.registerPlugin(ScrollTrigger);


export default function ShowcaseSocial() {
    const lenis = useLenis();
    const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
    let resizeTimeout = null;
    const uiRef = useRef(null);

    useGSAP(() => {
        if (!lenis) return;
        gsap.set([`.${styles.header}`, `.${styles.circles}`], {
            opacity: 0,
            pointerEvents: 'none'
        })
    },[lenis]);

    const setupScrollTrigger = () => {
        const trigger = ScrollTrigger.create({
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
                    // onComplete: () => lenis.start()
                });
                gsap.to(uiRef.current, {
                    opacity: 1,
                    duration: 0.15
                })
            },
            onLeaveBack: () => {
                gsap.to([`.${styles.header}`, `.${styles.circles}`,uiRef.current], {
                    opacity: 0,
                    onComplete: () => {
                        gsap.set(`.${styles.wrapper}`, {
                            display: "none"
                        })        
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
            },
            onEnterBack: () => {
                // lenis?.stop();
                // setTimeout(() => {
                //     lenis?.start();
                // }, 1000);
                gsap.set(`.${styles.wrapper}`, {
                    display: "block"
                })
                gsap.to([`.${styles.header}`, `.${styles.circles}`], {
                    opacity: 1,
                    delay: 0.3
                });
            }
        });
        return trigger;
    }

    useGSAP(() => {
        if (!lenis) return;
        if (typeof window === 'undefined') return;
        scrollTriggerInstance.current = setupScrollTrigger();

        let lastWidth = window.innerWidth;

        const handleResize = () => {
            if (lastWidth === window.innerWidth) return;
            lastWidth = window.innerWidth;
            clearTimeout(resizeTimeout!);

            resizeTimeout = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 200);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [lenis]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.relative}>
                <div>
                    <ShowcaseHeader triggerClass={styles.wrapper} start="300" end="400">
                    Connect with who<br></br>matter the most
                    </ShowcaseHeader>
                    <ShowcaseSubtext triggerClass={styles.wrapper} start="300" end="400">
                    With Daydream, sharing isn’t just about music—it’s about connection. Instantly share your favorite tracks, playlists, or listening stats with friends. See what your circle is playing in real time and discover new music together.
                    </ShowcaseSubtext>
                </div>
                <div ref={uiRef} style={{opacity: 0}}>
                    <video autoPlay loop muted playsInline className={styles.image}>
                        <source src="Features/social.mp4" type="video/mp4" />
                    </video>
                    {/* <div className={styles.ui}>
                        <div className={styles.toprow}>
                            <p className={styles.time}>11:27</p>
                            <p className={styles.menuItemSelected}>Friends · Now Playing</p>
                        </div>
                    <p className={styles.smallText}>Friend's live activity</p>
                    </div> */}
                </div>
                <div className={styles.circles}>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Circle key={index} width={index * 300} height={index * 300} index={index} mobile={false} />
                    ))}
                </div>
            </div>
        </div>
    );
}
