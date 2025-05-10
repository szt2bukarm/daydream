import { useGSAP } from '@gsap/react'
import ShowcaseHeaderMobile from '../../Showcase/ShowcaseHeaderMobile'
import Circle from '../../Showcase/ShowcaseSocial/Circle'
import ShowcaseSubtextMobile from '../../Showcase/ShowcaseSubtextMobile'
import styles from './showcasesocialmobile.module.scss'
import gsap from 'gsap'

export default function ShowcaseSocailMobile() {

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



    return <div className={styles.wrapper}>
        <ShowcaseHeaderMobile>
        Connect with who<br></br>matter the most
        </ShowcaseHeaderMobile>

        <div style={{marginBlock: "100px"}}></div>
        <div className={styles.innerWrapper}>
        <div className={styles.circles}>
            {Array.from({ length: 8 }).map((_, index) => (
                <Circle key={index} width={index * 120} height={index * 120} index={index} mobile={true}/>
            ))}
        </div>

        <div className={styles.expanded}>
                    <div
                        className={styles.borderGradientBottom}
                        style={{
                        background: `radial-gradient(circle, #ffffff, transparent 10%)`,
                        animationDuration: "10s",
                        }}
                    ></div>
                    <div
                        className={styles.borderGradientTop}
                        style={{
                        background: `radial-gradient(circle, #ffffff, transparent 10%)`,
                        animationDuration: "10s",
                        }}
                    ></div>
                    <div className={styles.innerContent}>
                        <img className={styles.expandedImage} src="Features/user1.webp" alt='User face icon' />
                        <div className={styles.expandedDetails}>
                            <p className={styles.expandedName}>Feliza Lemoine</p>
                            <p className={styles.expandedText}>Currently Listening</p>
                            <div className={styles.expandedPlayingWrapper}>
                                <div className={styles.expandedPlaying}></div>
                                <p className={styles.expandedPlayingTrack}>BROTHER STONE</p>
                                <p className={styles.expandedPlayingFeat}>Ft. Kodak Black</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>


        <ShowcaseSubtextMobile>
        With Daydream, sharing isn’t just about music—it’s about connection. Instantly share your favorite tracks, playlists, or listening stats with friends. See what your circle is playing in real time and discover new music together.
        </ShowcaseSubtextMobile>
    </div>
}