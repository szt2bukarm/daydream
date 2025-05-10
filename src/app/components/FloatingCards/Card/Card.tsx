import styles from './card.module.scss'

export default function Card({icon,text,header,style,image}:{icon?:string,text?:string,header?:string,style?:string,image?:string}) {
    return (
        <div className={`${styles.wrapper} ${style == "dark" ? styles.dark : styles.light}`}>
            <img src={`FloatingCard/${image}.webp`} alt="Card icon" className={styles.note} />
            <div className={styles.inner}>
                <div className={styles.icon}>{icon}</div>
                <div className={styles.textWrapper}>
                    <div className={styles.header}>{header}</div>
                    <div className={styles.text}>{text}</div>
                </div>
            </div>
        </div>
    )
}