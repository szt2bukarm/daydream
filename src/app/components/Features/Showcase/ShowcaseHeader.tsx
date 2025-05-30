'use client';
import styles from './showcaseHeader.module.scss';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useLenis } from '@studio-freight/react-lenis';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ShowcaseHeader({ triggerClass,start,end, children }: { triggerClass: string;start?:string,end?:string, children: React.ReactNode }) {
    const headerRef = useRef<HTMLParagraphElement | null>(null);
    const lenis = useLenis();

    useGSAP(() => {
        if (!headerRef.current) return;

        const anim = gsap.timeline({
            scrollTrigger: {
                trigger: `.${triggerClass}`,
                start: `top+=${start} 0%`,
                end: `top+=${end} 0%`,
                // markers: true,
                onEnter: () => {
                    gsap.to(headerRef.current, {
                        opacity: 1,
                        duration: 0.15,
                        delay: start == "200" ? 1 : 0
                    });
                },
                onEnterBack: () => {
                    gsap.to(headerRef.current, {
                        opacity: 1,
                        duration: 0.15
                    });
                },
                onLeave: () => {
                    if (end === "500") return;
                    gsap.to(headerRef.current, {
                        opacity: 0,
                        duration: 0.15
                    });
                },
                onLeaveBack: () => {
                    gsap.to(headerRef.current, {
                        opacity: 0,
                        duration: 0.15
                    });
                },
            },
        });

        gsap.set(headerRef.current, { opacity: 0 });

        return () => {
            anim.scrollTrigger?.kill();
        };
    }, [lenis, triggerClass]);

    return (
        <p className={styles.header} ref={headerRef}>
            {children}
        </p>
    );
}
