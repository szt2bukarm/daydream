import styles from './floatingcards.module.scss'
import GradientWave from "../GradientWave/GradientWave";
import ScrollVelocity from "../ScrollText/ScrollText";
import Card from './Card/Card';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function FloatingCards() {
    const cardsRef = useRef([]);

    useGSAP(() => {
        gsap.to(`.${styles.wrapper}`, {
            scrollTrigger: {
                trigger: `.${styles.wrapper}`,
                start: 'top 0%',
                end: 'bottom+=1200 0%',
                markers: true,
                pin: true
            }
        })

        gsap.set(cardsRef.current[0], {
            x: "150vw",
            y: 110,
            rotate: 15
        })
        gsap.set(cardsRef.current[1], {
            x: "150vw",
            y: 40,
            rotate: -15
        })
        gsap.set(cardsRef.current[2], {
            x: "150vw",
            y: 35,
            rotate: 20
        })
        gsap.set(cardsRef.current[3], {
            x: "150vw",
            y: 120,
            rotate: -15
        })
    }, [])
    
    useGSAP(() => {
        gsap.to(cardsRef.current[0], {
            x: "3vw",
            rotate: -3,
            scrollTrigger: {
                trigger: cardsRef.current[0],
                start: '0 top',
                end: '500 top',
                markers: false,
                scrub: true
            }
        })
        gsap.to(cardsRef.current[1], {
            x: "25vw",
            rotate: 3,
            scrollTrigger: {
                trigger: cardsRef.current[1],
                start: '500 top',
                end: '1000 top',
                markers: false,
                scrub: true
            }
        })
        gsap.to(cardsRef.current[2], {
            x: "47vw",
            rotate: -4,
            scrollTrigger: {
                trigger: cardsRef.current[2],
                start: '1000 top',
                end: '1500 top',
                markers: false,
                scrub: true
            }
        })
        gsap.to(cardsRef.current[3], {
            x: "62vw",
            rotate: 3,
            scrollTrigger: {
                trigger: cardsRef.current[3],
                start: '1500 top',
                end: '2000 top',
                markers: false,
                scrub: true
            }
        })
    },[])

    return (
        <div className={styles.wrapper}>
            <GradientWave />
            <ScrollVelocity texts={["SHARE CONNECT DISCOVER"]} className='scrollText' velocity={300}/>
            <div ref={el => cardsRef.current[0] = el} style={{position: "absolute",top:0,zIndex: 2}}>
                <Card style="dark" />
            </div>
            <div ref={el => cardsRef.current[1] = el} style={{position: "absolute",top:0,zIndex: 2}}>
                <Card style="light" />
            </div>
            <div ref={el => cardsRef.current[2] = el} style={{position: "absolute",top:0,zIndex: 2}}>
                <Card style="dark" />
            </div>
            <div ref={el => cardsRef.current[3] = el} style={{position: "absolute",top:0,zIndex: 2}}>
                <Card style="light" />
            </div>
        </div>
    )

}