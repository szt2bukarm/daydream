import styles from "./abouttext.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { useRef } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function AboutTextMobile({ texts }: { texts: string[] }) {
    const textRef = useRef([]);
    const wrapper = useRef(null);
    let resizeTimeout: NodeJS.Timeout;

    const splitAndStyleText = () => {
        const textElements = textRef.current;
        if (!textElements) return null;

        const split = new SplitType(textElements, { types: 'lines' });

        split.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        return split;
    };

    useGSAP(() => {
        const splitTextInstance = splitAndStyleText();
        if (!splitTextInstance) return;

        gsap.set(splitTextInstance.lines, {
            y: 100,
            rotate: 3
        });


        setTimeout(() => {
            ScrollTrigger.create({
                trigger: wrapper.current,
                start: 'top 70%',
                end: 'top 70%',
                markers: true,
                onEnter: () => {
                    gsap.to(splitTextInstance.lines, {
                        y: 0,
                        rotate: 0,
                        duration: 1.2,
                        stagger: 0.1,
                        ease: 'power4.out'
                    });
                    gsap.to(`.${styles.backgroundRightText}`, {
                        rotate: 11,
                        delay: 0.1
                    });
                }
            });
    
        }, 200);

        const handleResize = () => {
            clearTimeout(resizeTimeout);

            textRef.current.forEach(text => {
                if (text && text.style.opacity !== '0') {
                    gsap.to(text, { opacity: 0, duration: 0.2 });
                }
            });

            resizeTimeout = setTimeout(() => {
                splitTextInstance.revert();

                const resizedSplit = splitAndStyleText();

                gsap.set(resizedSplit.lines, { opacity: 1, y: 0, rotate: 0 });

                textRef.current.forEach(text => {
                    if (text) {
                        gsap.to(text, { opacity: 1, duration: 0.2 });
                    }
                });
            }, 200);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            splitTextInstance.revert();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`${styles.wrapper}`} ref={wrapper}>
            <div className={styles.textWrapper}>
                {texts.map((text, index) => (
                    <p key={index} ref={el => textRef.current[index] = el} className={`${styles.text}`}>
                        {text}
                    </p>
                ))}
            </div>
        </div>
    );
}