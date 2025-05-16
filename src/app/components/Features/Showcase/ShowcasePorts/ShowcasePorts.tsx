import styles from './showcaseports.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type';
import { useEffect, useRef } from 'react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useLenis } from '@studio-freight/react-lenis';
import Render2 from '@/app/components/Features/Showcase/ShowcaseLogoShader/ShowcaseLogoShader';
import ShowcaseHeader from '../ShowcaseHeader';
import ShowcaseSubtext from '../ShowcaseSubtext';
import ShowcaseLogoShader from '@/app/components/Features/Showcase/ShowcaseLogoShader/ShowcaseLogoShader';
gsap.registerPlugin(ScrollTrigger);

export default function ShowcasePorts() {
    const scrollTriggerInstance = useRef<null | ScrollTrigger>(null);
    const cableRefs = useRef([]);
    const lenis = useLenis();
    const renderRef = useRef(null);
    let resizeTimeout = null;

    useEffect(() => {
        setTimeout(() => {
            gsap.set(renderRef.current, {
                display: "block",
                opacity: 0
            })
        }, 500);
    },[])

    useGSAP(() => {
        gsap.set(cableRefs.current, {
            x: -1000
        })
    },[lenis])

    const setupScrollTrigger = () => {
        const trigger = ScrollTrigger.create({
            trigger: `.${styles.wrapper}`,
            start: 'top+=400 0%',
            end: 'top+=500 0%',
            onEnter: () => {
                gsap.to(renderRef.current, {
                    opacity: 1,
                    duration: 0.15
                })
                gsap.set(cableRefs.current, {
                    x: -1000,
                    opacity: 1
                })
                gsap.to(cableRefs.current, {
                    x: -200,
                    duration: 1,
                    delay: 0.3,
                    stagger: 0.2,
                    ease: 'power4.out'
                })
                
                gsap.to(cableRefs.current, {
                    x: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power4.in',
                    delay: 1.5,
                    // onComplete: () => {
                    //     lenis?.start();
                    // }
                })
            },
            // onEnterBack: () => {
                // lenis?.stop();
                // setTimeout(() => {
                    // lenis?.start();
                // }, 700);
            // },
            onLeaveBack: () => {
                gsap.to([cableRefs.current,renderRef.current], {
                    opacity: 0,
                    duration: 0.15,
                    stagger: 0.1
                })
            }
        })
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
                <ShowcaseHeader triggerClass={styles.wrapper} start='400' end='500'>
                Crisp sound out of<br></br>every port
                </ShowcaseHeader>
                <ShowcaseSubtext triggerClass={styles.wrapper} start='400' end='500'>
                    Daydream delivers high-fidelity sound through every connection. With a <b>premium DAC</b> at its core, it outputs rich, detailed audio whether you're using <b>USB-C, 3.5mm, or 6.35mm</b>.
                </ShowcaseSubtext>
                </div>
                <div ref={renderRef} style={{display: 'none'}}>
                    <ShowcaseLogoShader />
                </div>
                <div className={styles.cables}>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <img key={index} src={`Features/Cables/cable${index + 1}.webp`} className={styles.cable} ref={el => cableRefs.current[index] = el} />
                    ))}
                </div>
            </div>
        </div>
    )
}