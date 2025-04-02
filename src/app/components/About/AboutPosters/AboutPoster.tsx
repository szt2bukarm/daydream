import styles from "./aboutposters.module.scss"

export default function AboutPoster({orientation,image}:{orientation?:string,image?:string}) {
    return (
        <div className={styles.wrapper}>

            <div className={`${styles.imageWrapper} ${orientation == "right" ? styles.imageWrapperRight : styles.imageWrapperLeft}`}>
                <img src={`About/poster${image}.png`}className={`${styles.image} ${orientation == "right" ? styles.imageRight : styles.imageLeft}`} />
                <div className={`${styles.background} ${orientation == "right" ? styles.backgroundRight : styles.backgroundLeft}`}></div>
            </div>

        </div>
    )
}