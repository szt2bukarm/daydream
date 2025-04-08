import { useRef } from 'react';
import styles from './showcasesocial.module.scss'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const orbits = [
    { size: '890px', duration: 25, img: 'Features/user5.png' },
    { size: '1100px', duration: 20, img: 'Features/user6.png' }
];

export default function Faces() {
    const orbitRefs = useRef([]);
    const itemRefs = useRef([]);
    const gradientRefs = useRef([]);

    useGSAP(() => {
        orbits.forEach((orbit, index) => {
            gsap.to(orbitRefs.current[index], {
                rotate: 360,
                duration: orbit.duration,
                repeat: -1,
                ease: 'linear'
            });

            gsap.to(itemRefs.current[index], {
                rotate: -360,
                duration: orbit.duration,
                repeat: -1,
                ease: 'linear'
            });
        });

        gsap.set(`.${styles.facesWrapper}`, {
            opacity: 0,
            display: "none"
        })
        
        ScrollTrigger.create({
            trigger: `.${styles.facesWrapper}`,
            start: 'top+=300 0%',
            end: 'top+=400 0%',
            onEnter: () => {
                gsap.set(`.${styles.facesWrapper}`, {
                    display: "block"
                })
                gsap.set(`.${styles.expandedDetails}`, {
                    opacity: 0
                })
                gsap.set(`.${styles.expandedImage}`, {
                    scale: 1.85
                })
                gsap.set(`.${styles.expanded}`, {
                    scale: 0,
                    width: 145
                })
                gsap.to(`.${styles.expanded}`, {
                    scale: 1,
                    delay: 0.5,
                    duration: 0.4,
                    ease: "back.out(1.1)"
                })
                gsap.to(`.${styles.expandedImage}`, {
                    scale: 1,
                    delay: 0.9,
                })
                gsap.to(`.${styles.expanded}`, {
                    width: 430,
                    duration: 0.20,
                    delay: 0.9
                })
                gsap.to(`.${styles.expandedDetails}`, {
                    opacity: 1,
                    duration: 0.20,
                    delay: 1.2
                })
                gsap.to(`.${styles.facesWrapper}`, {
                    opacity: 1,
                    delay: 0.4,
                })
            },
            onEnterBack: () => {
                gsap.set(`.${styles.facesWrapper}`, {
                    display: "block"
                })
                gsap.set(`.${styles.expandedDetails}`, {
                    opacity: 0
                })
                gsap.set(`.${styles.expandedImage}`, {
                    scale: 1.85
                })
                gsap.set(`.${styles.expanded}`, {
                    scale: 0,
                    width: 145
                })
                gsap.to(`.${styles.expanded}`, {
                    scale: 1,
                    delay: 0.5,
                    duration: 0.4,
                    ease: "back.out(1.1)"
                })
                gsap.to(`.${styles.expandedImage}`, {
                    scale: 1,
                    delay: 0.9,
                })
                gsap.to(`.${styles.expanded}`, {
                    width: 430,
                    duration: 0.20,
                    delay: 0.9
                })
                gsap.to(`.${styles.expandedDetails}`, {
                    opacity: 1,
                    duration: 0.20,
                    delay: 1.2
                })
                gsap.to(`.${styles.facesWrapper}`, {
                    opacity: 1,
                    // delay: 0.4,
                })
            },
            onLeave: () => {
                gsap.to(`.${styles.expanded}`, {
                    scale: 0,
                    delay: 0.4,
                    duration: 0.2,
                    ease: "back.out(1.1)"
                })
                gsap.to(`.${styles.expandedImage}`, {
                    scale: 2,
                    delay: 0.2,
                })
                gsap.to(`.${styles.expanded}`, {
                    width: 145,
                    duration: 0.2,
                    delay: 0.1
                })
                gsap.to(`.${styles.expandedDetails}`, {
                    opacity: 0,
                    duration: 0.05,
                    // delay: 1.2
                })
                gsap.to(`.${styles.facesWrapper}`, {
                    opacity: 0,
                    duration: 0.2,
                    delay: 0.6,
                    onComplete: () => {
                        gsap.set(`.${styles.facesWrapper}`, {
                            display: 'none',
                        })
                    }
                })
            },
            onLeaveBack: () => {
                gsap.to(`.${styles.expanded}`, {
                    scale: 0,
                    delay: 0.4,
                    duration: 0.2,
                    ease: "back.out(1.1)"
                })
                gsap.to(`.${styles.expandedImage}`, {
                    scale: 2,
                    delay: 0.2,
                })
                gsap.to(`.${styles.expanded}`, {
                    width: 145,
                    duration: 0.2,
                    delay: 0.1
                })
                gsap.to(`.${styles.expandedDetails}`, {
                    opacity: 0,
                    duration: 0.05,
                    // delay: 1.2
                })
                gsap.to(`.${styles.facesWrapper}`, {
                    opacity: 0,
                    duration: 0.2,
                    delay: 0.6,
                    onComplete: () => {
                        gsap.set(`.${styles.facesWrapper}`, {
                            display: 'none',
                        })
                    }
                })
            }
        })
    },[])

    return (
        <div className={styles.facesWrapper}>
        {orbits.map((orbit, index) => (
            <div
                key={index}
                className={styles.orbit}
                ref={el => (orbitRefs.current[index] = el)}
                style={{ width: orbit.size, height: orbit.size }}
            >
                <div
                    className={styles.orbitItem}
                    ref={el => (itemRefs.current[index] = el)}
                >
                    <img src={orbit.img} className={styles.userImage} alt={`User ${index + 1}`} />
                </div>
            </div>
        ))}

        <div className={styles.orbit} style={{ width: "670px", height: "670px" }}>
            <div className={styles.expandedItem}>
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
                        <img className={styles.expandedImage} src="Features/user1.png" />
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
        </div>
        </div>
    )
}