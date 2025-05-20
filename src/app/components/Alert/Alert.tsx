"use client";
import { useStore } from '@/useStore'
import styles from './alert.module.scss'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useLenis } from '@studio-freight/react-lenis';
import { useEffect, useState } from 'react';
export default function Alert() {
    const {showAlert,setShowAlert} = useStore();
    const [width, setWidth] = useState(window.innerWidth);
    const lenis = useLenis();

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useGSAP(() => {
        gsap.set(`.${styles.wrapper}`,{opacity: 0})
        gsap.set(`.${styles.alert}`,{opacity: 0,scale: 0.5})

        if (showAlert) {
            lenis?.stop();
            document.body.classList.add('lock-scroll');
            gsap.to(`.${styles.wrapper}`,{
                opacity: 1,
                duration: 0.1,
                onComplete: () => {
                    gsap.to(`.${styles.alert}`,{
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        ease: 'back.out(1.7)'
                    })
                }
            })
        }
    },[showAlert])

    const closeAlert = () => {
        gsap.to(`.${styles.wrapper}`,{
            opacity: 0,
            duration: 0.3
        })
        gsap.to(`.${styles.alert}`,{
            opacity: 0,
            // scale: 0.5,
            duration: 0.25,
            // ease: 'back.out(1.7)',
            onComplete: () => {
                setShowAlert(false)
                lenis?.start();
                document.body.classList.remove('lock-scroll');
    
            }
        })
    }

    if (!showAlert) {
        return <></>;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.overlay} onClick={closeAlert}></div>
            <div className={styles.alert}>
                {width > 500 && 
                <p className={styles.title}>
                Thank you for your interest,<br></br>but Daydream is only a concept.
                </p>}
                {width <= 500 && 
                <p className={styles.title}>
                Thank you for your interest, but Daydream is only a concept.
                </p>}
                <p className={styles.subtext}>Need a website?<br></br>Take a look at our portfolios:</p>
            <div className={styles.contactWrapper}>
                <div className={styles.col}>
                    <p className={styles.name}>Bukvity Lorisz</p>
                    <p className={styles.role}>Designer</p>
                </div>
                <div className={styles.links}>
                    <a className={styles.link} href='https://www.behance.net/bukvitylorisz' target='_blank'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="33" viewBox="0 0 50 33" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M32.4509 5.5464H45.1675V1.90482H32.4509V5.5464ZM38.7192 12.8601C35.8825 12.8601 33.7281 14.6175 33.5206 17.8648H43.6979C43.008 14.0109 41.296 12.8601 38.7192 12.8601ZM39.1166 27.9219C41.7359 27.9219 43.6579 26.2673 44.0503 24.8734H49.5588C47.9842 29.9147 44.7326 32.746 38.8942 32.746C31.4437 32.746 27.2624 27.4469 27.2624 20.4154C27.2624 3.85619 51.1558 3.26251 49.9561 21.9616H33.5206C33.6806 25.7587 35.2477 27.9219 39.1166 27.9219ZM14.3284 27.1933C17.3351 27.1933 19.4395 26.0367 19.4395 22.9159C19.4395 19.6789 17.58 18.2748 14.4584 18.2748H6.92543V27.1933H14.3284ZM13.931 13.4068C16.4328 13.4068 18.1599 12.2422 18.1599 9.53701C18.1599 6.68724 16.1504 5.80756 13.4037 5.80756H6.92543V13.4068H13.931ZM14.8133 0.254883C20.7391 0.254883 24.858 2.21359 24.858 8.3081C24.858 11.3257 23.6459 13.5745 20.5842 15.0897C24.5031 16.2539 26.3576 19.3107 26.3576 23.3272C26.3576 29.7031 21.3015 32.746 15.2531 32.746H0.00732422V0.254883H14.8133Z" fill="#656565"/>
                        </svg>
                    </a>
                    <a className={styles.link} href='https://lorisbukvic.graphics/' target='_blank'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                    <path d="M22 0C9.84973 0 0 9.84973 0 22C0 34.1503 9.84973 44 22 44C34.1503 44 44 34.1503 44 22C44 9.84973 34.1503 0 22 0ZM35.9455 12.5469H31.9351C31.474 10.6122 30.876 8.83326 30.1659 7.26052C31.5225 8.0147 32.7826 8.96182 33.9103 10.0897C34.6726 10.8519 35.3519 11.675 35.9455 12.5469ZM38.8438 22C38.8438 23.4702 38.6555 24.9113 38.2925 26.2969H32.7896C32.9272 24.9071 33 23.4706 33 22C33 20.5294 32.9272 19.0929 32.7896 17.7031H38.2925C38.6555 19.0887 38.8438 20.5298 38.8438 22ZM22 38.8438C21.5531 38.8438 20.1912 37.9654 18.8337 35.2504C18.2714 34.1258 17.7889 32.8447 17.3941 31.4531H26.6058C26.211 32.8446 25.7286 34.1258 25.1662 35.2504C23.8088 37.9654 22.4469 38.8438 22 38.8438ZM16.398 26.2969C16.2393 24.9006 16.1562 23.4584 16.1562 22C16.1562 20.5416 16.2393 19.0994 16.398 17.7031H27.602C27.7607 19.0994 27.8438 20.5416 27.8438 22C27.8438 23.4584 27.7607 24.9006 27.602 26.2969H16.398ZM5.15625 22C5.15625 20.5298 5.34454 19.0887 5.70745 17.7031H11.2104C11.0728 19.0929 11 20.5294 11 22C11 23.4706 11.0728 24.9071 11.2104 26.2969H5.70745C5.34454 24.9113 5.15625 23.4702 5.15625 22ZM22 5.15625C22.4469 5.15625 23.8088 6.03462 25.1663 8.74955C25.7286 9.87422 26.2111 11.1553 26.6059 12.5469H17.3941C17.7889 11.1554 18.2713 9.87422 18.8337 8.74955C20.1912 6.03462 21.5531 5.15625 22 5.15625ZM13.8341 7.26052C13.1239 8.83326 12.526 10.6121 12.0649 12.5469H8.05449C8.64823 11.675 9.3274 10.8519 10.0897 10.0897C11.2175 8.96182 12.4775 8.0147 13.8341 7.26052ZM8.05449 31.4531H12.0649C12.526 33.3878 13.124 35.1667 13.8341 36.7395C12.4775 35.9853 11.2174 35.0382 10.0897 33.9103C9.3274 33.1481 8.64815 32.325 8.05449 31.4531ZM30.1659 36.7395C30.8761 35.1667 31.474 33.3879 31.9351 31.4531H35.9455C35.3518 32.325 34.6726 33.1481 33.9103 33.9103C32.7825 35.0382 31.5225 35.9853 30.1659 36.7395Z" fill="#656565"/>
                    </svg>
                    </a>
                </div>
            </div>
            <div className={styles.contactWrapper}>
                <div className={styles.col}>
                    <p className={styles.name}>Bukvic Armin</p>
                    <p className={styles.role}>Developer</p>
                </div>
                <a className={styles.link} href='https://bukvicarmin.vercel.app/' target='_blank'>
                <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                <path d="M22 0C9.84973 0 0 9.84973 0 22C0 34.1503 9.84973 44 22 44C34.1503 44 44 34.1503 44 22C44 9.84973 34.1503 0 22 0ZM35.9455 12.5469H31.9351C31.474 10.6122 30.876 8.83326 30.1659 7.26052C31.5225 8.0147 32.7826 8.96182 33.9103 10.0897C34.6726 10.8519 35.3519 11.675 35.9455 12.5469ZM38.8438 22C38.8438 23.4702 38.6555 24.9113 38.2925 26.2969H32.7896C32.9272 24.9071 33 23.4706 33 22C33 20.5294 32.9272 19.0929 32.7896 17.7031H38.2925C38.6555 19.0887 38.8438 20.5298 38.8438 22ZM22 38.8438C21.5531 38.8438 20.1912 37.9654 18.8337 35.2504C18.2714 34.1258 17.7889 32.8447 17.3941 31.4531H26.6058C26.211 32.8446 25.7286 34.1258 25.1662 35.2504C23.8088 37.9654 22.4469 38.8438 22 38.8438ZM16.398 26.2969C16.2393 24.9006 16.1562 23.4584 16.1562 22C16.1562 20.5416 16.2393 19.0994 16.398 17.7031H27.602C27.7607 19.0994 27.8438 20.5416 27.8438 22C27.8438 23.4584 27.7607 24.9006 27.602 26.2969H16.398ZM5.15625 22C5.15625 20.5298 5.34454 19.0887 5.70745 17.7031H11.2104C11.0728 19.0929 11 20.5294 11 22C11 23.4706 11.0728 24.9071 11.2104 26.2969H5.70745C5.34454 24.9113 5.15625 23.4702 5.15625 22ZM22 5.15625C22.4469 5.15625 23.8088 6.03462 25.1663 8.74955C25.7286 9.87422 26.2111 11.1553 26.6059 12.5469H17.3941C17.7889 11.1554 18.2713 9.87422 18.8337 8.74955C20.1912 6.03462 21.5531 5.15625 22 5.15625ZM13.8341 7.26052C13.1239 8.83326 12.526 10.6121 12.0649 12.5469H8.05449C8.64823 11.675 9.3274 10.8519 10.0897 10.0897C11.2175 8.96182 12.4775 8.0147 13.8341 7.26052ZM8.05449 31.4531H12.0649C12.526 33.3878 13.124 35.1667 13.8341 36.7395C12.4775 35.9853 11.2174 35.0382 10.0897 33.9103C9.3274 33.1481 8.64815 32.325 8.05449 31.4531ZM30.1659 36.7395C30.8761 35.1667 31.474 33.3879 31.9351 31.4531H35.9455C35.3518 32.325 34.6726 33.1481 33.9103 33.9103C32.7825 35.0382 31.5225 35.9853 30.1659 36.7395Z" fill="#656565"/>
                </svg>
                </a>
            </div>
            <button className={styles.button} onClick={closeAlert}>Close</button>
            </div>
        </div>
    )
}