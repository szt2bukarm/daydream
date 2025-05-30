import styles from './introduction.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type'
import { CustomEase,ScrollTrigger } from 'gsap/all'
import { useEffect, useRef } from 'react'
import GlowButton from '../Shared/TeaserButton/GlowButton'
import { useStore } from '@/useStore'
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);

export default function Introduction() {
    gsap.registerEase("customEase", CustomEase.create("customEase", ".9,.6,.2,1"));
    const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
    const splitInstanceRef = useRef<SplitType | null>(null);
    const overlayTriggerInstance = useRef<ScrollTrigger | null>(null);
    const textRef = useRef([]);
    let resizeTimeout: NodeJS.Timeout | null = null;
    const {setShowPlayer} = useStore();

    const splitAndStyleText = () => {
        const el = textRef.current;

          const split = new SplitType(el, { types: 'lines' });
      
          split.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
          });
      
      
        return split;
      };
    
      const setupScrollTrigger = (splitTextInstance: SplitType) => {
        gsap.set(splitTextInstance.lines, { y: 100, rotate: 3 })
        const trigger = ScrollTrigger.create({
            trigger: `.${styles.wrapper}`,
            start: 'top 70%',
            end: 'top 70%',
            // markers: true,
            onEnter: () => {
                gsap.to(splitTextInstance.lines, {
                    y: 0,
                    opacity: 1,
                    rotate: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power4.out'
                });
            }
        });

        return trigger;
    };

    const setupOverlay = () => {
        const tl = gsap.timeline();
        tl.to(`.${styles.image}`, {
            opacity: 0.05,
        })
        const trigger = ScrollTrigger.create({
            trigger: `.${styles.wrapper}`,
            start: 'bottom-=1000 0%',
            end: 'bottom 0%',
            animation: tl,
            scrub: true,
            // markers: true,
        })
        return trigger;
    };

    useGSAP(() => {
        if (typeof window === 'undefined') return;
        const splitTextInstance = splitAndStyleText();
        if (!splitTextInstance) return;

        splitInstanceRef.current = splitTextInstance;
        scrollTriggerInstance.current = setupScrollTrigger(splitTextInstance);
        overlayTriggerInstance.current = setupOverlay();

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
                // Kill existing scroll trigger
                if (scrollTriggerInstance.current) {
                    scrollTriggerInstance.current.refresh();
                }

                if (overlayTriggerInstance.current) {
                    overlayTriggerInstance.current.refresh();
                }

                // Re-split text
                const newSplit = splitAndStyleText();
                if (!newSplit) return;
                splitInstanceRef.current = newSplit;


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

    useGSAP(() => {
        gsap.set(`.${styles.image}`, { y: 200 })
        gsap.to(`.${styles.image}`, {
            y: 0,
            scrollTrigger: {
                trigger: `.${styles.wrapper}`,
                start: '10% 20%',
                end: '80% 20%',
                // markers: false,
                scrub: true,
            }
        })
    },[])

    useGSAP(() => {
        const height = window.innerHeight
        ScrollTrigger.create({
            trigger: `.${styles.imageWrapper}`,
            start: '80% 80%',
            end: `bottom+=${height} 80%`,
            // markers: false,
            pin: `.${styles.imageWrapper}`,
        })
    },[])

    return (
        <div className={styles.wrapper}>
            <div className={styles.textWrapper}>
                <div ref={el => textRef.current[0] = el} className={styles.text}>
                    A music player built for the now. Seamless, social, and made to move with you.
                </div>
                <div ref={el => textRef.current[1] = el} className={styles.text}>
                Connect, share, and discover music together — because great sound is meant to be experienced, not just heard.
                </div>
            </div>

            <div className={styles.imageWrapper}>
                <div className={styles.teaserButtonWrapper}>
                    <GlowButton onClick={() => setShowPlayer(true)}>Watch Teaser</GlowButton>
                </div>
                <div className={styles.imageTextWrapper}>
                    <p className={styles.imageText}>FROM THE WALKMAN TO THE IPOD, MUSIC PLAYERS HAVE ALWAYS SHAPED HOW WE LISTEN.</p>
                    <p className={styles.imageText}>BUT MUSIC HAS EVOLVED—IT’S NO LONGER JUST PERSONAL, IT’S SOCIAL. DAYDREAM IS INSPIRED BY THE PAST, BUILT FOR NOW.</p>
                    <p className={styles.imageText}>BECAUSE MUSIC ISN’T JUST HEARD—IT’S FELT, TOGETHER.</p>
                </div>
                <img src="introduction.webp" alt='Image showing two DAYDREAM player color variants' className={styles.image} />
            </div>
        </div>
    )
}
