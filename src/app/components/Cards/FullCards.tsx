import Fullcard from "./FullCard";
import styles from "./fullcards.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { use, useRef } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Logo3D from "../Logo3D/Logo3D";
import Text3D from "../Text3D/Text3D";

gsap.registerPlugin(ScrollTrigger);

const cards = [
    {
        icon: "🔒",
        image: "1",
        header: "Private Mode",
        text: "Keep your listening sessions truly yours. With Private Mode, your activity stays off the grid—no tracking, no sharing, just you and your music."
    },
    {
        icon: "✨",
        image: "2",
        header: "Daydream Assistant",
        text: "A smart companion built for music lovers. Find songs, control playback, and discover new tracks with simple voice commands."
    },
    {
        icon: "🛜",
        image: "2",
        header: "eSIM Connectivity",
        text: "Always online, no Wi-Fi needed. Stream, share, and stay connected wherever you go with built-in eSIM support."
    }
];

export default function FullCards() {
    const cardsRef = useRef([]);
    const overlayRef = useRef([]);
    const scrollTriggerInstance = useRef<null | ScrollTrigger>(null);
    const pinTriggerInstance = useRef<null | ScrollTrigger>(null);
    const overlayTriggerInstance = useRef<null | ScrollTrigger>(null);
    let resizeTimeout = null;
    
    useGSAP(() => {
        gsap.set(cardsRef.current, { y: "110vh" });
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(`.${styles.text}`, { opacity: 0 });
    },[]);

    const setupPin = () => {
        const trigger = ScrollTrigger.create({
            trigger: `.${styles.wrapper}`,
            start: 'top 0%',
            end: 'top+=3500 0%',
            // markers: true,
            pin: true,
        })
        return trigger;
    }

    const setupOverlay = () => {
        const tl = gsap.timeline();
        tl.to(overlayRef.current[2], {
            opacity: 1,
        })
        const trigger = ScrollTrigger.create({
            trigger: `.${styles.wrapper}`,
            start: 'top+=2000 0%',
            end: 'top+=2200 0%',
            animation: tl,
            scrub: true,
            // markers: true         
        })
        return trigger;
    }

    const setupTimeline = () => {
        const tl = gsap.timeline();

        const trigger = ScrollTrigger.create({
            trigger: `.${styles.cards}`,
            start: "top-=500 top",
            end: "top+=2000 top",
            scrub: true,
            animation: tl,
            // markers: true
        });

        // Card 1 animations
        tl.to(`.${styles.text}`, {
            opacity: 1,
            duration: 0.1
        }, 0)
        .to(cardsRef.current[0], { 
            y: 0,
            duration: 0.333
        }, 0)
        .to(`.${styles.text}`, {
            opacity: 0,
            duration: 0.1
        })
        .to(cardsRef.current[0], {
            y: 100,
            x: 50,
            rotateX: 3,
            rotateY: 5,
            scale: 0.9,
            duration: 0.333
        }, 0.333)
        .to(overlayRef.current[0], {
            opacity: 0.8,
            duration: 0.333
        }, 0.333);

        // Card 2 animations
        tl.to(cardsRef.current[1], {
            y: 0,
            duration: 0.333
        }, 0.333)
        .to(cardsRef.current[1], {
            y: 100,
            x: -50,
            rotateX: 2,
            rotateY: -4,
            scale: 0.9,
            duration: 0.333
        }, 0.666)
        .to(overlayRef.current[1], {
            opacity: 0.8,
            duration: 0.333
        }, 0.666);

        // Card 3 animation
        tl.to(cardsRef.current[2], {
            y: 0,
            duration: 0.333
        }, 0.666)
        tl.to(cardsRef.current[2], {
            y: 0,
            duration: 0.333
        }, 0.999)
        return trigger;
    }

    useGSAP(() => {
        if (typeof window === 'undefined') return;
        overlayTriggerInstance.current = setupOverlay();
        pinTriggerInstance.current = setupPin();
        scrollTriggerInstance.current = setupTimeline();

        const handleResize = () => {
            clearTimeout(resizeTimeout!);

            resizeTimeout = setTimeout(() => {
                overlayTriggerInstance.current?.refresh();
                pinTriggerInstance.current?.refresh();
                scrollTriggerInstance.current?.refresh(); 
            }, 200);
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    },[])


    return (
        <div className={styles.wrapper}>
            <p className={styles.text}>And that's not all</p>
            <div className={styles.cards}>
                {cards.map((card, index) => (
                    <div className={styles.card} ref={el => (cardsRef.current[index] = el)} key={index}>
                        <Fullcard {...card} />
                        <div style={{background: index == cards.length - 1 ? "linear-gradient(to bottom, #fff,#EE4137)" : "#000"}} ref={el => (overlayRef.current[index] = el)} className={styles.overlay}>
                        </div>
                    </div>
                ))}
            </div>
            {/* <Logo3D /> */}
        </div>
    );
}