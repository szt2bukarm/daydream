import { useGSAP } from '@gsap/react'
import ShowcaseHeaderMobile from '../../Showcase/ShowcaseHeaderMobile'
import ShowcaseLogoShader from '../../Showcase/ShowcaseLogoShader/ShowcaseLogoShader'
import ShowcaseSubtextMobile from '../../Showcase/ShowcaseSubtextMobile'
import styles from './showcaseportsmobile.module.scss'
import gsap from 'gsap'

export default function ShowcasePortsMobile() {

    useGSAP(() => {
        gsap.set(`.${styles.wrapper}`, {
            opacity: 0
        })
        gsap.to(`.${styles.wrapper}`, {
            opacity: 1,
            scrollTrigger: {
                trigger: `.${styles.wrapper}`,
                start: 'top-=400 0%',
                end: 'bottom 0%',
            }
        })
    },[])

    return (
        <div className={styles.wrapper}>
            <ShowcaseHeaderMobile>
            Crisp sound out of<br></br>every port
            </ShowcaseHeaderMobile>

            <div className={styles.innerWrapper}>
                <div className={styles.cables}>
                {Array.from({ length: 3 }).map((_, index) => (
                        <img key={index} src={`Features/Cables/cable${index + 1}.webp`} className={styles.cable} />
                    ))}
                </div>
                <div className={styles.imageWrapper}>
                    <img className={styles.gradient} src='gradient.png' />
                    <img className={styles.image} src="FlipInsequence/flipin61.webp" />
                    <div className={styles.shader}>
                        <ShowcaseLogoShader />
                    </div>
                </div>
            </div>

            <ShowcaseSubtextMobile>
            Daydream delivers high-fidelity sound through every connection. With a <b>premium DAC</b> at its core, it outputs rich, detailed audio whether you're using <b>USB-C, 3.5mm, or 6.35mm</b>.
            </ShowcaseSubtextMobile>
        </div>
    )
}