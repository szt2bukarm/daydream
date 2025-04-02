import styles from './floatingcards.module.scss'
import GradientWave from "../GradientWave/GradientWave";
import ScrollVelocity from "../ScrollText/ScrollText";
import Card from './Card/Card';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const cards = [
    {
        icon: "🔗",
        header: "Connect Instantly",
        text: "Music should bring people together. With Daydream, your music connects with others.",
        image: "link",
    },
    {
        icon: "🎭",
        header: "Build Your Music Identity",
        text: "Your taste defines you. Create a personal profile that evolves with every song you play, shaping a unique musical fingerprint.",
        image: "fingerprint"
    },
    {
        icon: "📡",
        header: "Listen Together, Anywhere",
        text: "Stay in sync. Play a track, and your friends hear it with you—live, wherever they are.",
        image: "note"
    },
    {
        icon: "💡",
        header: "Discover Through Your Circle",
        text: "New music finds you. Get fresh daily recommendations based on what your friends are loving.",
        image: "spiral"
    }
]

export default function FloatingCards() {
    const cardsRef = useRef([]);

    useGSAP(() => {
        let triggers = []; // Store all ScrollTriggers
    
        const createAnimations = () => {
            // Kill existing triggers before creating new ones
            triggers.forEach(trigger => trigger.kill());
            triggers = [];
    
            // Calculate positions dynamically
            const isMobile = window.innerWidth <= 1024;
            const cardPositions = isMobile
                ? [{ x: "150vw", y: 100, rotate: 5 },
                   { x: "150vw", y: 100, rotate: -5 },
                   { x: "150vw", y: 100, rotate: 4 },
                   { x: "150vw", y: 100, rotate: -4 }]
                : [{ x: "150vw", y: 110, rotate: 15 },
                   { x: "150vw", y: 40, rotate: -15 },
                   { x: "150vw", y: 35, rotate: 20 },
                   { x: "150vw", y: 120, rotate: -15 }];
    
            // Apply initial card positions
            cardsRef.current.forEach((card, index) => {
                gsap.set(card, cardPositions[index]);
            });
    
            // ScrollTrigger for position switching
            let wrapperTrigger = ScrollTrigger.create({
                trigger: `.${styles.wrapper}`,
                start: 'top 0%',
                end: 'bottom 0%',
                onEnter: () => {
                    gsap.to([`.${styles.fixed}`, cardsRef.current], {
                        position: 'fixed',
                        top: 0,
                    });
                },
                onLeave: () => {
                    gsap.to([`.${styles.fixed}`, cardsRef.current], {
                        position: 'absolute',
                        top: 0,
                    });
                },
                onEnterBack: () => {
                    gsap.to([`.${styles.fixed}`, cardsRef.current], {
                        position: 'fixed',
                        top: 0,
                    });
                },
                onLeaveBack: () => {
                    gsap.to([`.${styles.fixed}`, cardsRef.current], {
                        position: 'absolute',
                        top: 0,
                    });
                }
            });
    
            // ScrollTrigger for overlay animation
            let overlayTrigger = gsap.to(`.${styles.overlay}`, {
                opacity: 0.5,
                scrollTrigger: {
                    trigger: `.${styles.wrapper}`,
                    start: 'bottom-=400 20%',
                    end: 'bottom 20%',
                    scrub: true
                }
            });
    
            // Store triggers for cleanup
            triggers.push(wrapperTrigger, overlayTrigger);
        };
    
        createAnimations(); // Run initially
    
        const onResize = () => {
            createAnimations(); // Reapply animations on resize
            ScrollTrigger.refresh(); // Ensure ScrollTrigger updates
        };
    
        window.addEventListener("resize", onResize);
    
        return () => {
            window.removeEventListener("resize", onResize);
            triggers.forEach(trigger => trigger.kill()); // Cleanup on unmount
        };
    }, []);
    
    useGSAP(() => {
        let triggers = []; // Store ScrollTrigger instances
    
        const createAnimations = () => {
            // Kill existing animations & triggers before creating new ones
            triggers.forEach(trigger => trigger.kill());
            triggers = [];
    
            const calculateX = () => {
                if (window.innerWidth > 1324) return ["3vw", "25vw", "47vw", "63vw"];
                if (window.innerWidth > 1024) return ["2.5vw", "20vw", "42vw", "58vw"];
                return ["10%", "10%", "10%", "10%"]; // Centering for < 1024px
            };
    
            let xValues = calculateX();
            
            let timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: `.${styles.wrapper}`,
                    start: "top top",
                    end: "bottom-=1000 top",
                    scrub: true,
                    markers: true
                }
            });
    
            // Animate each card sequentially
            cardsRef.current.forEach((card, index) => {
                timeline.to(card, {
                    x: xValues[index],
                    rotate: index % 2 === 0 ? -3 : 3,
                    duration: window.innerWidth < 1024 ? 0.05 : 0.15
                }, index*0.05); // Stagger effect
            });
    
            // Store the ScrollTrigger instance for later cleanup
            triggers.push(timeline.scrollTrigger);
    
            ScrollTrigger.refresh(); // Ensure ScrollTrigger updates
        };
    
        createAnimations(); // Run on mount
    
        const onResize = () => {
            createAnimations(); // Reapply animations on resize
        };
    
        window.addEventListener("resize", onResize);
    
        return () => {
            window.removeEventListener("resize", onResize);
            triggers.forEach(trigger => trigger.kill()); // Cleanup on unmount
        };
    }, []);        
    return (
        <div className={styles.wrapper}>
            <div className={styles.fixed}>
                <GradientWave />
                <ScrollVelocity texts={["SHARE CONNECT DISCOVER"]} className='scrollText' velocity={300}/>
                {cards.map((card, index) => (
                    <div key={index} ref={el => cardsRef.current[index] = el} style={{ position: "absolute", top: 0, zIndex: 2 }}>
                        <Card icon={card.icon} header={card.header} text={card.text} image={card.image} style={index % 2 == 0 ? "dark" : "light"} />
                    </div>
                ))}                
            </div>
            <div className={styles.overlay}></div>
        </div>
    )

}