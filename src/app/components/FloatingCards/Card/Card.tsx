import styles from './card.module.scss'

export default function Card({icon,text,header,style}:{icon?:string,text?:string,header?:string,style?:string}) {
    return (
        <div className={`${styles.wrapper} ${style == "dark" ? styles.dark : styles.light}`}>
            <img src={`FloatingCard/note${style == "dark" ? "dark" : "light"}.png`} className={styles.note} />
            <div className={styles.inner}>
                <div className={styles.icon}>🎭</div>
                <div className={styles.textWrapper}>
                    <div className={styles.header}>Listen Together, Anywhere</div>
                    <div className={styles.text}>Stay in sync. Play a track, and your friends hear it with you—live, wherever they are.</div>
                </div>
            </div>
        </div>
    )
}