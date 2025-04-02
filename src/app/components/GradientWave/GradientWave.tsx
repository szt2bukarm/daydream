import styles from './gradientwave.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import GradientWaveItem from './GradientWaveItem'
export default function GradientWave() {

    return (
        <div className={styles.wrapper}>
            {Array.from({ length: 20 }).map((_, index) => (
                <GradientWaveItem key={index} index={20 - index} />
            ))}
        </div>
    )
}