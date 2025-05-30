import GlowButton from '../../Shared/TeaserButton/GlowButton'
import styles from './aboutfooter.module.scss'
import aboutStyles from '../AboutContent/aboutcontent.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef, useState } from 'react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useStore } from '@/useStore'
gsap.registerPlugin(ScrollTrigger);
export default function AboutFooter() {
    const button = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [mounted, setMounted] = useState(false);
    const {setShowAlert} = useStore();
    useEffect(() => {
        setMounted(true);
    },[])


    useGSAP(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mounted]);

    useGSAP(() => {
        if (!mounted) return;
        gsap.set([`.${styles.wrapper}`,`.${styles.header}`, `.${styles.text}`, button.current], {
            opacity: 0
        })

        gsap.to(`.${aboutStyles.wrapper}`, {
            backgroundColor: "#000",
            scrollTrigger: {
                trigger: `.${styles.wrapper}`,
                start: 'top-=700 70%',
                end: 'top+=200 70%',
                scrub: true,
                // markers: true
            }
        })

        gsap.to([`.${styles.header}`, `.${styles.text}`, button.current, `.${styles.wrapper}`], {
            opacity: 1,
            // stagger: 1,
            scrollTrigger: {
                trigger: `.${styles.wrapper}`,
                start: 'top 70%',
                end: 'top+=400 70%',
                scrub: true,
                
            }
        })
    },[mounted])

    if (!mounted) return <></>;

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
                <GlowButton onClick={() => setShowAlert(true)}>Open Positions</GlowButton> 
            </div>
            <div className={styles.backgroundWrapper}>
                <img src="/About/logostroke.webp" alt="Daydream logo outline" className={styles.backgroundImage} />
                <div className={styles.background}>
                    <div className={styles.backgroundInner}>
                        <div className={styles.blob}>   </div>
                    </div>
                </div>
            </div>
        </div>
    )
}