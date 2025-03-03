import styles from './introduction.module.scss'
import TeaserButton from './TeaserButton/TeaserButton'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type'
import { CustomEase,ScrollTrigger } from 'gsap/all'
import { useEffect, useRef } from 'react'
gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);

export default function Introduction() {
    gsap.registerEase("customEase", CustomEase.create("customEase", ".9,.6,.2,1"));
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
                    start: 'top 70%',
                    end: 'top 70%',
                }
            }
        );

        return () => splitText.revert();
    }, []);

    useGSAP(() => {
        gsap.set(`.${styles.image}`, { y: 200 })
        gsap.to(`.${styles.image}`, {
            y: 0,
            scrollTrigger: {
                trigger: `.${styles.wrapper}`,
                start: '10% 20%',
                end: '80% 20%',
                markers: false,
                scrub: true,
            }
        })
    },[])

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: `.${styles.imageWrapper}`,
            start: '80% 80%',
            end: 'bottom+=2000 80%',
            markers: false,
            pin: `.${styles.imageWrapper}`,
        })
    },[])

    useGSAP(() => {
        gsap.to(`.${styles.image}`, {
            opacity: 0.05,
            scrollTrigger: {
                trigger: `.${styles.imageTextWrapper}`,
                start: 'top 20%',
                end: 'bottom+=500 20%',
                markers: false,
                scrub: true,
            }
        })
    })

    return (
        <div className={styles.wrapper}>
            <div className={styles.textWrapper}>
                <div ref={el => textRef.current[0] = el} className={styles.text}>
                    A music player built for the now. Seamless, social, and made to move with you.
                </div>
            </div>
            <div className={styles.textWrapper}>
                <div ref={el => textRef.current[1] = el} className={styles.text}>
                Connect, share, and discover music together — because great sound is meant to be experienced, not just heard.
                </div>
            </div>

            <div className={styles.imageWrapper}>
                <div className={styles.teaserButtonWrapper}>
                    <TeaserButton />
                </div>
                <div className={styles.imageTextWrapper}>
                    <p className={styles.imageText}>FROM THE WALKMAN TO THE IPOD, MUSIC PLAYERS HAVE ALWAYS SHAPED HOW WE LISTEN.</p>
                    <p className={styles.imageText}>BUT MUSIC HAS EVOLVED—IT’S NO LONGER JUST PERSONAL, IT’S SOCIAL. DAYDREAM IS INSPIRED BY THE PAST, BUILT FOR NOW.</p>
                    <p className={styles.imageText}>BECAUSE MUSIC ISN’T JUST HEARD—IT’S FELT, TOGETHER.</p>
                </div>
                <img src="introduction.png" className={styles.image} />
            </div>
        </div>
    )
}
