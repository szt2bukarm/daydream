import GradientWave from '../GradientWave/GradientWave'
import ColorCard from './ColorCard/ColorCard'
import styles from './colors.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { use, useEffect, useRef, useState } from 'react'

const data = [
    {
        text: ["One that started it all.","Perfect for any occasion."],
        name: 'Starter',
        colors: ['#2D2D2D','#EE4137'],
        image: '1'
    },
    {
        text: ["Deep, refined, and effortlessly cool.","A colorway that’s truly stealthy."],
        name: 'Stealth Black',
        colors: ['#1B1B1B'],
        image: '2'
    },
    {
        text: ["Inspired by old translucent tech."],
        name: 'Electric Purple',
        colors: ["#2D2D2D","#A692C2"],
        image: '3'
    }, 
    {
        text: ["It’s crisp, minimal, and timeless.","A pure, futuristic statement."],
        name: "Snow White",
        colors: ["#FFFFFF"],
        image: "4"
    },
    {
        text: ["Cool, refreshing, and effortlessly smooth.","A breath of clarity."],
        name: "Aqua Blue",
        colors: ["#B0B9BF","#5872B3"],
        image: "5"
    },
    {
        text: ["Nostalgia redefined.","Classic tones with a modern twist."],
        name: 'Retro',
        colors: ["#BFBBAE","#878171"],
        image: "6"
    },
    {
        text: ["Expansive, dreamy, and boundless.","A window to new horizons."],
        name: "Vista",
        colors: ["#6CBDD5","#8BCC81"],
        image: "7"
    }
]

export default function Colors() {
    const horizontalTrigger = useRef(null);
    const [width, setWidth] = useState(window.innerWidth);

    // Handle resize event
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // useGSAP(() => {
    //     gsap.to(`.${styles.wrapper}`, {
    //         scrollTrigger: {
    //             trigger: `.${styles.wrapper}`,
    //             start: 'top top',
    //             end: 'top top',
    //             pin: true
    //         }
    //     })
    // }, [])

    useEffect(() => {
        const cards = document.querySelector(`.${styles.cards}`);
        if (!cards || !cards.children.length) return;

        gsap.set(cards, {
            x: 0
        })

        const rect = cards.children[0].getBoundingClientRect();
        const totalWidth = (rect.width + 16) * data.length;
        const scrollDistance = -(totalWidth - (width - (width > 1324 ? 600 : 32)));

        if (!horizontalTrigger.current) {
            horizontalTrigger.current = gsap.to(`.${styles.cards}`, {
                x: scrollDistance,
                ease: "none",
                scrollTrigger: {
                    trigger: `.${styles.variants}`,
                    start: 'top top',
                    end: 'top+=3000 top',
                    scrub: true
                }
            });
        }
        
        // Refresh ScrollTrigger to apply changes
        ScrollTrigger.refresh();

        return () => {
            // Cleanup on unmount
            if (horizontalTrigger.current) {
                horizontalTrigger.current.kill();
                horizontalTrigger.current = null;
            }
        };
    }, [width]); // Runs only when width changes


    useGSAP(() => {
        gsap.to(`.${styles.variants}`, {
            scrollTrigger: {
                trigger: `.${styles.variants}`,
                start: 'top top',
                end: 'top+=3000 top',
                pin: true,
                markers: true // you can remove markers if you don't want to see them
            }
        })
    },[])


    return (
        <div className={styles.wrapper}>
            <div className={styles.imageWrapper}>
                <div className={styles.background}></div>
                <img src="Colors/colors.webp" className={styles.image} />
            </div>
            <div className={styles.variants}>
                {/* <div className={styles.gradient}>
                    <GradientWave />
                </div> */}
                <p className={styles.text}>Colored like no other</p>
                <div className={styles.cards}>
                    {data.map((item,index) => (
                        <ColorCard key={index} text={item.text} colors={item.colors} name={item.name} image={item.image} />
                    ))}
                </div>
            </div>
        </div>
    )
}