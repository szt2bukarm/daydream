import { useEffect, useRef, useState } from 'react';
import styles from './aboutheader.module.scss';
import SplitType from 'split-type';
import gsap from 'gsap';

export default function AboutHeader() {
    const textRef = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);
    let resizeTimeout = null;

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getMarginTop = (width) => {
        if (width > 1324) return 100;
        if (width > 724) return 60;
        return 30;
    };

    const splitText = () => {
        const split = new SplitType(textRef.current, { types: 'lines' });

        split.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        return split;
    };

    useEffect(() => {
        const text = textRef.current;
        if (!text) return;

        if (width > 724) {
            text.style.fontSize = '49px';
        }

        const initialSplit = splitText();

        setTimeout(() => {
            text.style.fontSize = '';
        }, 0);

        gsap.fromTo(`.${styles.wrapper}`, {
            marginTop: getMarginTop(width),
        }, {
            marginTop: 0,
            delay: 1,
            ease: 'power4.out'
        });

        gsap.fromTo(`.${styles.logo}`, {
            opacity: 0,
            scale: 0.5,
        }, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            delay: 0.7,
            ease: 'back.out(5)'
        });

        gsap.fromTo(initialSplit.lines,
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
                delay: 1
            }
        );

        let lastWidth = window.innerWidth;
        const handleResize = () => {
            if (lastWidth === window.innerWidth) return;
            lastWidth = window.innerWidth;
            clearTimeout(resizeTimeout);

            if (text.style.opacity !== '0') {
                gsap.to(text, { opacity: 0, duration: 0.2 });
            }

            resizeTimeout = setTimeout(() => {
                initialSplit.revert();

                if (width > 724) {
                    text.style.fontSize = '49px';
                }

                const resizedSplit = splitText();

                setTimeout(() => {
                    text.style.fontSize = '';
                }, 0);

                gsap.set(resizedSplit.lines, { opacity: 1, y: 0, rotate: 0 });

                gsap.to(text, { opacity: 1, duration: 0.2 });
            }, 200);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            initialSplit.revert();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <img src="logo.svg" className={styles.logo} />
            <p className={styles.text} ref={textRef}>
                Behind Daydream is a team dedicated to rethinking how we experience music
            </p>
        </div>
    );
}  