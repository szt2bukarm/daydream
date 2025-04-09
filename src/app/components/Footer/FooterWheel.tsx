import styles from './footerwheel.module.scss'
import navStyles from '../Nav/nav.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function FooterWheel() {

    useGSAP(() => {
        setTimeout(() => {
            gsap.to(`.${navStyles.navWrapper}`, {
            scrollTrigger: {
                trigger: `.${styles.wrapper}`,
                start: 'top-=150 top',
                end: 'top-=150 top',
                scrub: true,
                markers: true,
                onEnter: () => {
                    const nav = document.querySelector(`.${navStyles.navWrapper}`)
                    nav.style.opacity = '0'
                    nav.style.pointerEvents = 'none'
                },
                onEnterBack: () => {
                    const nav = document.querySelector(`.${navStyles.navWrapper}`)
                    nav.style.opacity = '1'
                    nav.style.pointerEvents = 'all'
                }
            }
        })
        }, 10);
    },[])


    
    return (
        <div className={styles.wrapper}>
            <div className={styles.background}></div>
            <img src="textlogo.png" className={styles.logo} />
            <div className={styles.wheel}>
                <p>asd</p>
                <img src="Colors/1.png" className={`${styles.image} ${styles.image1}`} />
                <img src="Colors/2.png" className={`${styles.image} ${styles.image2}`} />
                <img src="Colors/3.png" className={`${styles.image} ${styles.image3}`} />
                <img src="Colors/4.png" className={`${styles.image} ${styles.image4}`} />
                <img src="Colors/5.png" className={`${styles.image} ${styles.image5}`} />
                <img src="Colors/6.png" className={`${styles.image} ${styles.image6}`} />
                <img src="Colors/7.png" className={`${styles.image} ${styles.image7}`} />
                <img src="Colors/8.png" className={`${styles.image} ${styles.image8 }`} />
                <img src="Colors/1.png" className={`${styles.image} ${styles.image9 }`} />
                <img src="Colors/2.png" className={`${styles.image} ${styles.image10 }`} />
                <img src="Colors/3.png" className={`${styles.image} ${styles.image11 }`} />
                <img src="Colors/4.png" className={`${styles.image} ${styles.image12}`} />
                <img src="Colors/5.png" className={`${styles.image} ${styles.image13 }`} />
                <img src="Colors/6.png" className={`${styles.image} ${styles.image14 }`} />
                <img src="Colors/7.png" className={`${styles.image} ${styles.image15 }`} />
                <img src="Colors/8.png" className={`${styles.image} ${styles.image16 }`} />
                <img src="Colors/1.png" className={`${styles.image} ${styles.image17 }`} />
                <img src="Colors/2.png" className={`${styles.image} ${styles.image18 }`} />
                <img src="Colors/3.png" className={`${styles.image} ${styles.image19 }`} />
                <img src="Colors/4.png" className={`${styles.image} ${styles.image20 }`} />
                <img src="Colors/5.png" className={`${styles.image} ${styles.image21 }`} />
                <img src="Colors/6.png" className={`${styles.image} ${styles.image22 }`} />
                <img src="Colors/7.png" className={`${styles.image} ${styles.image23 }`} />
                <img src="Colors/8.png" className={`${styles.image} ${styles.image24 }`} />
           </div>
           <p className={styles.text}>Join Waitlist for<br></br>Daydream Model 1</p>
            <button className={styles.button}>Join Waitlist</button>

        </div>
    )
}