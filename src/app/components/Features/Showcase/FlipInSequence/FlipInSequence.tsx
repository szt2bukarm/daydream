import styles from './flipinsequence.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useState } from 'react';
import Image from 'next/image';

export default function FlipInSequence() {
    const [image, setImage] = useState(0);
    const totalFrames = 61;

    useGSAP(() => {
        gsap.set(`.${styles.wrapper}`, {
            y: window.innerHeight,
            scale: 3
        })
        gsap.to(`.${styles.wrapper}`, {
            y: 0,   
            scale: 1,
            scrollTrigger: {
                trigger: `.${styles.wrapper}`,
                start: 'top 0%',
                end: 'bottom 0%',
                // markers: true,
                scrub: true,
                onUpdate: (self) => {
                    const currentFrame = Math.floor(self.progress * (totalFrames - 1)) + 1;
                    setImage(currentFrame);
                    console.log(currentFrame)
                }
            }
        })
    },[])

    useGSAP(() => {
    })

    return (
        <div className={styles.wrapper}>
            <Image alt='png sequence' width={1052} height={524}  layout="intrinsic" src={`/Features/FlipInSequence/flipin${image}.webp`}/>
        </div>
    )
}