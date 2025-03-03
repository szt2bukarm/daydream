import Aurora from './Aurora'
import styles from './hero.module.scss'
import gsap from 'gsap'
import scrollTrigger from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(scrollTrigger)

export default function Hero() {

    // useGSAP(() => {
    //     gsap.to(`.${styles.overlay}`, {
    //         opacity: 1,
    //         scrollTrigger: {
    //             trigger: `.${styles.wrapper}`,
    //             start: 'bottom 40%',
    //             end: 'bottom 40%',
    //             markers: true
    //         }
    //     })
    // },[])

    return (
        <div className={styles.wrapper}>
            <img src="hero.jpeg" style={{width:"100%",height:"100%",objectFit:"cover",position:"absolute"}} />
            <Aurora />
            {/* <div className={styles.overlay}></div> */}
        </div>
    )
}