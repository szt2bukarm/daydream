import AboutHeader from '../AboutHeader/AboutHeader';
import AboutTextLeft from '../AboutText/AboutTextLeft';
import AboutTextRight from '../AboutText/AboutTextRight';
import styles from './aboutcontent.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useEffect, useState } from 'react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import AboutFooter from '../AboutFooter/AboutFooter';
import AboutTextMobile from '../AboutText/AboutTextMobile';
import AboutPostersDual from '../AboutPosters/AboutPoster';
import AboutPoster from '../AboutPosters/AboutPoster';

export default function AboutContent() {
    const [width, setWidth] = useState(window.innerWidth);
    const [allowResize, setAllowResize] = useState(false);

    const getMarginTop = (width) => {
        if (width > 1324) return 100;
        if (width > 724) return 60;
        return 30;
    };

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useGSAP(() => {
            gsap.fromTo(
                `.${styles.wrapper}`,
                { marginTop: 0, borderRadius: 0 },
                { marginTop: getMarginTop(width), borderRadius: '50px 50px 0 0', delay: 1, ease: 'power4.out',onComplete: () => setAllowResize(true) }
            );
    }, []);

    useEffect(() => {
        if (!allowResize) return;
        gsap.set(`.${styles.wrapper}`, { marginTop: getMarginTop(width) });
    }, [width]);

    return (
        <div className={styles.wrapper}>
            <AboutHeader />
            {width > 1324 && 
            <>
            <AboutTextLeft orientation='left' />
            <AboutTextRight orientation='right' />
            </>}
            {
                width <= 1324 &&
                <>
                <AboutTextMobile texts={["Inspired by the iconic players of the past and the way we discover music today, we’re creating tech that’s not just functional, but personal and fun.","Because music deserves more than just another app—it deserves a device built for the way you live."]} />
                <AboutPoster orientation='right' image='1' />
                <AboutTextMobile texts={["From the first sketches to the final build, we focus on craftsmanship and quality. Every material, every button, and every feature is carefully considered to create a seamless listening experience.","We believe in making tech that lasts, both in function and feeling—because great music deserves a great way to be heard."]} />
                <AboutPoster orientation='left' image='2' />
                </>
            }
            <AboutFooter />
        </div>
    );
}