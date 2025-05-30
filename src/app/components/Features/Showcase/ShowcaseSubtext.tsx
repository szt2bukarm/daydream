// ShowcaseSubtext.tsx
'use client';

import styles from './showcasesubtext.module.scss';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import SplitType from 'split-type';
import { useLenis } from '@studio-freight/react-lenis';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ShowcaseSubtext({
    triggerClass,
    start,
    end,
    children
}: {
    triggerClass: string;
    start?: string;
    end?: string;
    children: React.ReactNode;
}) {
    const subtextRef = useRef<HTMLParagraphElement | null>(null);
    const splitTextRef = useRef<SplitType | null>(null);
    const lenis = useLenis();

    const splitText = () => {
        if (!subtextRef.current) return;
        const split = new SplitType(subtextRef.current, { types: 'lines' });
        splitTextRef.current = split;

        split.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            wrapper.style.paddingBottom = '3px';
            line.parentNode?.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        return split;
    }

    useGSAP(() => {
        const split = splitText();
        if (!splitTextRef.current) return;

        gsap.set(split.lines, {
            y: 100,
            rotate: 3,
        });

        const anim = gsap.timeline({
            scrollTrigger: {
            trigger: `.${triggerClass}`,
            start: `top+=${start} 0%`,
            end: `top+=${end} 0%`,
            onEnter: () => {
                lenis?.stop();
                document.body.classList.add('lock-scroll');
                window.scrollBy(0,10);
                gsap.to(split.lines, {
                    y: 0,
                    rotate: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    // delay: 1,
                    ease: 'power4.out',
                    delay: start == "200" ? 1 : 0,
                });
                setTimeout(() => {
                    lenis.start();
                    document.body.classList.remove('lock-scroll');
                    },
                start == "200" ? 2500 : 1500);
            },
            onEnterBack: () => {
                lenis?.stop();
                document.body.classList.add('lock-scroll');
                window.scrollBy(0,-10);
                gsap.to(split.lines, {
                    y: 0,
                    rotate: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power4.out',
                })
                setTimeout(() => {
                        lenis.start();
                        document.body.classList.remove('lock-scroll');
                    },
                1500);
            },
            onLeave: () => {

                if (end === "500") return;
                gsap.to(split.lines, {
                    y: -100,
                    rotate: 3,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: 'power4.in',
                });
            },
            onLeaveBack: () => {
                gsap.to(split.lines, {
                    y: -100,
                    rotate: 3,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: 'power4.in',
                });
            },
            },
        });

        return () => {
            split.revert();
            anim.scrollTrigger?.kill();
        };
    }, [lenis, triggerClass, start, end]);

    return (
        <p className={styles.subtext} ref={subtextRef}>
            {children}
        </p>
    );
}
