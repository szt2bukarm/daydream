import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./hero.module.scss";
import Aurora from "./Aurora";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

const letters = ['D', 'A', 'Y', 'D', 'R', 'E', 'A', 'M'];
const logoPaths = letters.map(letter => `LogoSVG/${letter}.svg`);

export default function Hero() {
    const [imageIndex, setImageIndex] = useState(1);
    const totalFrames = 27;
    const intervalRef = useRef(null);
    const textRef = useRef(null);


    useEffect(() => {

        const split = new SplitType(textRef.current, { types: 'lines' });
        
        split.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            line.parentNode?.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });
        
        gsap.set(split.lines, {
            y: 100
        })
        gsap.to(split.lines, {
            y: 0,
            delay: 0.55,
            duration: 1,
            stagger: 0.2,
            ease: 'power4.out'
        })
    },[])

    useEffect(() => {
        let currentFrame = 1;
        const playSequence = () => {
            const nextFrame = () => {
                setImageIndex(currentFrame);

                if (currentFrame >= totalFrames) return;

                currentFrame++;

                let progress = currentFrame / totalFrames;
                let easedDuration = gsap.utils.interpolate(10, 60, gsap.parseEase("power4.out")(progress));

                intervalRef.current = gsap.delayedCall(easedDuration / 1000, nextFrame);
            };

            nextFrame();
        };

        setTimeout(() => {
        playSequence();
        }, 500);

        return () => {
            if (intervalRef.current) intervalRef.current.kill();
        };
    }, []);

    useGSAP(() => {
        gsap.to(`.${styles.wrapper}`, {
            // backgroundSize: "100% 100%",
            duration: 2,
            backgroundPosition: "0% 100%",    
            // delay: 1.5,
        })

        gsap.to(`.${styles.overlay}`, {
            borderRadius: 100,
            boxShadow: "inset 0 0 0 30px #080808,0 0 0 100px #080808",
            scrollTrigger: {
                trigger: `.${styles.wrapper}`,
                start: 'top 0%',
                end: 'bottom 0%',
                // markers: true,
                scrub: true
            }
        })
    })

    return (
        <div className={styles.wrapper}>
            {/* <div className="aurora" style={{opacity: 0}}> */}
            <div className={styles.imageWrapper}>
            <video autoPlay muted loop playsInline className={styles.image}>
                <source src={`hero.mp4`} type="video/mp4" />
            </video>
            </div>
            <div className={styles.fog1}></div>
            <div className={styles.fog2}></div> 
            <div className={styles.logo}>
                {logoPaths.map((path, index) => (
                    <img
                        key={index}
                        src={path}
                        alt={letters[index]}
                        className={styles.logoLetter}
                    />
                ))}
            </div>
            <p className={styles.text} ref={textRef}>Sound unchained.<br></br>Music, redefined.</p>
            <div className={styles.aurora}>
            <Aurora />
            </div>
            <div className={styles.overlay}></div>
        </div>
    );
}
