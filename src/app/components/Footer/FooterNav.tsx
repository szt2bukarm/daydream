import { useEffect, useRef, useState } from 'react';
import TransitionLink from '../TransitionLink'
import styles from './footernav.module.scss'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import wheelStyles from './footerwheel.module.scss'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import navStyles from '../Nav/nav.module.scss';

const letters = ['D', 'A', 'Y', 'D', 'R', 'E', 'A', 'M']; // Array of letters
const logoPaths = letters.map(letter => `LogoSVG/${letter}.svg`); // Paths of the logos


export default function FooterNav() {
    const letterRefs = useRef([]);
    const [credits,setCredits] = useState(false);
    const pathRef = useRef(null);
    const [mounted,setMounted] = useState(false);
    const [width,setWidth] = useState(window.innerWidth);
    const transformInstance = useRef<ScrollTrigger | null>(null);
    let resizeTimeout = null;

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setMounted(true);
    },[]);

    useGSAP(() => {
        if (!mounted) return;
        if (typeof window === 'undefined') return;
        gsap.set(pathRef.current,{
            animationPlayState: "paused"
        })
        gsap.set(letterRefs.current, {
            x: 100,
            opacity: 0
        })

        gsap.to(letterRefs.current, {
            x: 0,
            duration: 0.7,
            ease: 'power4.out',
            stagger: 0.05,
            delay: 0.5,
            scrollTrigger: {
                trigger: `.${wheelStyles.wrapper}`,
                start: '10% top',
                end: '10% top',
                // markers: true
            }
        })

        gsap.to(letterRefs.current, {
            opacity: 1,
            duration: 0,
            delay: 0.5,
            stagger: 0.05,
            scrollTrigger: {
                trigger: `.${wheelStyles.wrapper}`,
                start: '10% top',
                end: '10% top',
            }
        })

        gsap.to(pathRef.current, {
            animationPlayState: "running",
            scrollTrigger: {
                trigger: `.${wheelStyles.wrapper}`,
                start: '10% top',
                end: '10% top',
            }
        })

        // gsap.to(`.${styles.wrapper}`, {
        //     y: 0,
        //     scrollTrigger: {
        //         trigger: `.${wheelStyles.wrapper}`,
        //         start: '0% top',
        //         end: '100% top',
        //         scrub: true,
        //         // markers: true
        //     }
        // })

    }, [mounted]);

    const transformTimeline = () => {
        gsap.set(`.${styles.wrapper}`, {
            y: 150
        })
        const tl = gsap.timeline();
        tl.to(`.${styles.wrapper}`, {
            y: 0,
        })
        const trigger = ScrollTrigger.create({
            trigger: `.${wheelStyles.wrapper}`,
            start: '-10% top',
            end: '80% top',
            scrub: true,
            animation: tl,
            // markers: true    
        })
        return trigger;
    }

    const handleCredits = () => {
        setCredits(!credits);
    }

    useGSAP(() => {
        if (!mounted) return;
        gsap.to(`.${styles.creditsTextWrapper}`, {
            y: credits ? 0 : 170,
            duration: 0.3,
            ease: "power4.out"
        })
        gsap.to([`.${styles.footer}`], {
            y: credits ? -170 : 0,
            duration: 0.3,
            ease: "power4.out"
        })

        gsap.to([`.${styles.navWrapper}`,`.${styles.backgroundLogo}`],{
            y: credits ? 170 : 0,
            duration: 0.3,
            ease: "power4.out"
        })
    },[credits])

    useEffect(() => {
        const onScroll = () => {
            setCredits(false);
        }
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    },[])

    useGSAP(() => {
        if (!mounted) return;
        transformInstance.current = transformTimeline();
        
        const handleResize = () => {
            clearTimeout(resizeTimeout!);
            resizeTimeout = setTimeout(() => {
                transformInstance.current.refresh();
            },200)
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    },[mounted])


    if (!mounted) return <></>;

    return (
        <div className={styles.wrapper}>
            <div className={styles.footer}>
                <div className={styles.navWrapper}>
                    <p className={styles.navText}>NAV</p>
                    <TransitionLink href="/" className={styles.navItem}>
                        <p className={styles.navItemTextInline}>Daydream</p>
                        <p className={styles.navItemTextSlideup}>Daydream</p>
                    </TransitionLink>
                    <TransitionLink href="/gallery" className={styles.navItem}>
                        <p className={styles.navItemTextInline}>Gallery</p>
                        <p className={styles.navItemTextSlideup}>Gallery</p>
                    </TransitionLink>
                    <TransitionLink href="/about" className={styles.navItem}>
                        <p className={styles.navItemTextInline}>About</p>
                        <p className={styles.navItemTextSlideup}>About</p>
                    </TransitionLink>
                </div>

                <div className={styles.logo}>
                    <img alt="Logo letter" src="LogoSVG/logo.svg" className={styles.logoSVG} ref={(el) => (letterRefs.current[0] = el)}/>
                    {logoPaths.map((path, index) => (
                        <img
                        key={index}
                        src={path}
                        className={styles.letter}
                        ref={(el) => (letterRefs.current[index+1] = el)} 
                        />
                    ))}
                </div>

                <div className={styles.disclamerWrapper}>
                    {width > 724 && 
                    <p className={styles.disclamer}>Daydream is a concept. An exploration in design fiction, see:</p>
                    }
                    {width <= 724 && 
                    <p className={styles.disclamer}>Daydream is a concept.<br></br>An exploration in design fiction, see:</p>
                    }
                    <button onClick={handleCredits} className={styles.credits}>SITE CREDITS</button>
                </div>

                <div className={styles.backgroundLogo}>
                <svg className={styles.svg} viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                    <path 
                        ref={pathRef}
                        className={styles.path}
                        d="M510.67,33.83C472.66,12.43,429.13,1.48,380.06,1H248.74c-18.33,0-33.19,14.86-33.19,33.19v60.38c0,15.61-10.9,29.02-26.14,32.39-24.59,5.43-47.46,14.11-68.62,26.02-37.99,21.41-67.47,51.23-88.39,89.48C11.46,280.71,1,324.61,1,374.15s10.46,92.49,31.39,130.24c20.92,37.77,50.4,67.23,88.39,88.39,38.01,21.17,81.54,32,130.61,32.47h131.32c18.33,0,33.19-14.86,33.19-33.19v-60.3c0-15.64,10.94-29.06,26.22-32.4,24.56-5.37,47.41-13.95,68.55-25.72,37.99-21.16,67.47-50.62,88.39-88.39,20.92-37.76,31.39-81.17,31.39-130.24s-10.46-93.44-31.39-131.68c-20.92-38.24-50.4-68.06-88.39-89.48Zm-26.9,290.04c-97.37,28.13-129.17,59.92-157.3,157.3-3.1,10.73-18.39,10.73-21.49,0-28.13-97.37-59.92-129.17-157.3-157.3-10.73-3.1-10.73-18.39,0-21.49,97.37-28.13,129.17-59.92,157.3-157.3,3.1-10.73,18.39-10.73,21.49,0,28.13,97.37,59.92,129.17,157.3,157.3,10.73,3.1,10.73,18.39,0,21.49Z" 
                        fill="none" 
                        stroke="#161616" 
                        stroke-width="1"
                    />
                    </svg>
                </div>
            </div>

            <div className={styles.creditsTextWrapper}>
                <p>Daydream brand, product, user interface designed, teaser video created by <b>Bukvity Lorisz</b><br></br>Site development by <b>Bukvic Armin</b></p>
                <p>Made as a Graphic Design Diploma project<br></br>@ Media and Design Institute, Eger, Hungary, in 2024-25</p>
            </div>
        </div>
    )
}