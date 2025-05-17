import GradientWave from '../GradientWave/GradientWave'
import ColorCard from './ColorCard/ColorCard'
import styles from './colors.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { use, useEffect, useRef, useState } from 'react'
gsap.registerPlugin(ScrollTrigger);

const data = [
    {
        text: ["One that started it all.","Perfect for any occasion."],
        name: 'Starter',
        colors: ['#2D2D2D','#EE4137'],
        image: '1',
    },
    {
        text: ["Deep, refined, and effortlessly cool.","A colorway that’s truly stealthy."],
        name: 'Stealth Black',
        colors: ['#1B1B1B'],
        image: '2',
    },
    {
        text: ["Inspired by old translucent tech."],
        name: 'Electric Purple',
        colors: ["#2D2D2D","#A692C2"],
        image: '3',
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
    const horizontalTrigger = useRef<ScrollTrigger | null>(null);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const mobileCardsRef = useRef<HTMLDivElement[]>([]);
    const spanRef = useRef([]);

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useGSAP(() => {
        gsap.set(`.${styles.image}`, {
            y: width < 724 ? 100 : 200
        })

        gsap.set(`.${styles.gradient}`, {
            y: 200
        })

        const tl = gsap.timeline();
        tl.to(`.${styles.image}`, {
            y: width < 724 ? 50 : 100    
        })

        ScrollTrigger.create({
            trigger: `.${styles.wrapper}`,
            start: width < 724 ? 'top-=1000 top' : 'top-=500 top',
            end: width < 724 ? 'top+=500 top' : 'top+=1000 top',
            scrub: true,
            animation: tl,
        })

        gsap.to(`.${styles.gradient}`, {
            y: 400,
            scrollTrigger: {
                trigger: `.${styles.wrapper}`,
                start: 'top-=200 top',
                end: 'top+=2500 top',
                scrub: true
            }
        })
    },[])

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
                force3D: true,
                scrollTrigger: {
                    trigger: `.${styles.variants}`,
                    start: 'top top',
                    end: 'top+=3000 top',
                    scrub: true,
                }
            });
        }
        
        ScrollTrigger.refresh();

        return () => {
            if (horizontalTrigger.current) {
                horizontalTrigger.current.kill();
                horizontalTrigger.current = null;
            }
        };
    }, [width, height]); 


    useGSAP(() => {
        if (width <= 724) return;
        ScrollTrigger.create({
            trigger: `.${styles.variants}`,
            start: 'top top',
            end: 'top+=3000 top',
            pin: true,
        })
    },[])

    useGSAP(() => {
        if (!spanRef.current) return;
    
        ScrollTrigger.matchMedia({
            "(min-width: 1324px)": () => {
                const tl = gsap.timeline();
                spanRef.current.forEach((el, i) => {
                    tl.to(el, {
                        opacity: 0,
                        duration: 0.05
                    }, i * 0.05);
                });
    
                ScrollTrigger.create({
                    trigger: `.${styles.variants}`,
                    start: 'top top',
                    end: '+=300',
                    scrub: true,
                    animation: tl,
                });
            }
        });
    }, []);

    useGSAP(() => {
        if (width > 724) return;
        gsap.set(mobileCardsRef.current, {
            opacity: 0
        })

        mobileCardsRef.current.forEach((el, i) => {
            gsap.to(el, {
                opacity: 1,
                duration: 0.3,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 70%',
                }
            })
        })
    },[])

    return (
        <div className={styles.wrapper}>

            <div className={styles.imageWrapper}>
                <div className={styles.background}></div>
                <img src="Colors/colors.webp" className={styles.image} />
                <div className={styles.gradient}>
                    <GradientWave />
                </div>
            </div>

            <div className={styles.variants}>
                <div className={styles.text}>
                    <span ref={el => spanRef.current[3] = el}>Colored</span>
                    <span ref={el => spanRef.current[2] = el}>like</span>
                    <span ref={el => spanRef.current[1] = el}>no</span>
                    <span ref={el => spanRef.current[0] = el}>other</span>
                </div>
                {width > 724 && (
                    <div className={styles.cards} style={{willChange: "transform"}}>
                    {data.map((item,index) => (
                        <ColorCard key={index} text={item.text} colors={item.colors} name={item.name} image={item.image}/>
                    ))}
                </div>
                )}
                {width <= 724 && (
                    <div className={styles.cardsMobile}>
                        {data.map((item,index) => (
                            <div key={index} ref={el => mobileCardsRef.current[index] = el} style={{display:'flex',justifyContent: 'center'}}>
                            <ColorCard text={item.text} colors={item.colors} name={item.name} image={item.image} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}