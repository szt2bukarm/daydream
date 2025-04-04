import GlowButton from '../../Shared/TeaserButton/GlowButton'
import styles from './aboutfooter.module.scss'
import aboutStyles from '../AboutContent/aboutcontent.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger);
export default function AboutFooter() {
    const button = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useGSAP(() => {
        gsap.set([`.${styles.wrapper}`,`.${styles.header}`, `.${styles.text}`, button.current], {
            opacity: 0
        })

        ScrollTrigger.create({
            trigger: `.${styles.wrapper}`,
            start: 'top 60%',
            end: 'top 60%',
            onEnter: () => {
                gsap.to(`.${aboutStyles.wrapper}`, {
                    backgroundColor: "#000",
                    onComplete: () => {
                        gsap.to([`.${styles.wrapper}`,`.${styles.header}`, `.${styles.text}`, button.current], {
                            opacity: 1,
                            stagger: 0.1,
                        })   
                    }
                })       
            },
            onLeaveBack: () => {
                gsap.to([`.${styles.wrapper}`,`.${styles.header}`, `.${styles.text}`, button.current], {
                    opacity: 0,
                    duration: 0.5,
                    // stagger: 0.05,
                    onComplete: () => {
                        gsap.to(`.${aboutStyles.wrapper}`, {
                            backgroundColor: "#161616"
                        })
                    }
                })  
            }
        })
    })

    return (
        <div className={styles.wrapper}>

            {width > 724 ? (
                <>
                    <p className={styles.header}>Passionate about music and<br></br>design? We're building something<br></br> special. Come be a part of it.</p>
                    <p className={styles.text}>Daydream is an equal opportunity employer. We welcome all<br></br>backgrounds, valuing diversity in music, ideas, and people.</p>
                </>
            ) : (
                <>
                <p className={styles.header}>Passionate about music<br></br> and design? We're building<br></br> something special.<br></br>Come be a part of it.</p>
                <p className={styles.text}>Daydream is an equal opportunity employer.<br></br>We welcome allbackgrounds, valuing<br></br>diversity in music, ideas, and people.</p>
                </>
            )}

            <div ref={button}>
                <GlowButton>Open Positions</GlowButton> 
            </div>
            <div className={styles.backgroundWrapper}>
                <img src="about/logostroke.png" className={styles.backgroundImage} />
                <div className={styles.background}>
                    <div className={styles.backgroundInner}>
                        <div className={styles.blob}>   </div>
                    </div>
                </div>
            </div>
        </div>
    )
}