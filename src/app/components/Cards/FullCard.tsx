import styles from './fullcard.module.scss'

export default function Fullcard({image,icon,header,text}: {image:string,icon?:string,header?:string,text?:string}) {
    return (
        <div className={styles.wrapper} style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.70) 100%), url(Fullcards/card${image}.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center"            
            }}>
                <div className={styles.icon}>{icon}</div>
                <div className={styles.textWrapper}>
                    <p className={styles.header}>{header}</p>
                    <p className={styles.text}>{text}</p> 
                </div>
        </div>
    )
}