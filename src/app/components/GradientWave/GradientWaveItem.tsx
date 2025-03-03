import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from './gradientwave.module.scss'
import { useRef } from "react";

export default function GradientWaveItem({ index }: { index: number }) {
    const ref = useRef(null);

    useGSAP(() => {
        console.log()
        gsap.to(ref.current, {
            width: "500%",
            duration: 3,
            repeat: -1,
            yoyo: true,
            delay: index * 0.33,
            // repeatDelay: 0.1,
            ease: "linear"
    })}, [])


    return (
        <div className={styles.gradient} ref={ref}></div>
    )
}