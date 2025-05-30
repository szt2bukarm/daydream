import styles from './flipinsequence.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useState } from 'react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import featuresStyles from '../../features.module.scss'

gsap.registerPlugin(ScrollTrigger);

export default function FlipInSequence() {
    const [image, setImage] = useState(0);
    const totalFrames = 61;
    const frameDuration = 15;


    useGSAP(() => {
        gsap.set(`.${styles.wrapper}`, {
            y: "120vh",
            scale: 3
        })

        ScrollTrigger.create({
            
            trigger: `.${featuresStyles.wrapper}`,
            start: 'top+=200 0%',
            end: 'bottom 0%',
            // markers: true,
            onEnter: () => {
                gsap.to(`.${styles.wrapper}`, {
                    y: 0,   
                    scale: 1,
                    duration: 1.1,
                    delay: 0.1,
                    onStart: () => {
                        let currentFrame = 1;
                        const interval = setInterval(() => {
                            currentFrame++;
                            if (currentFrame == totalFrames) {
                                clearInterval(interval); 
                            } else {
                                setImage(currentFrame);
                            }
                        }, frameDuration);
                    }
                })

            },
            onLeaveBack: () => {
                gsap.to(`.${styles.wrapper}`, {
                    y: "120vh",   
                    scale: 3,
                    duration: 1.1,
                    ease: 'power4.inOut',
                })

                let currentFrame = totalFrames;

                const interval = setInterval(() => {
                    currentFrame--;
                    if (currentFrame <= 0) {
                        clearInterval(interval); 
                    } else {
                        setImage(currentFrame);
                    }
                }, frameDuration);
            }
        })
    },[])

    return (
        <div className={styles.wrapper}>
            <img alt='png sequence' src={`/FlipInsequence/flipin${image}.webp`}/>
        </div>
    )
}