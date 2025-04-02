import styles from './glowbutton.module.scss';

export default function GlowButton({children}:{children:React.ReactNode}) {
    return (
    <div className={styles.wrapper}>
        <div
            className={styles.borderGradientBottom}
            style={{
            background: `radial-gradient(circle, #ffffff, transparent 10%)`,
            animationDuration: "10s",
            }}
        ></div>
        <div
            className={styles.borderGradientTop}
            style={{
            background: `radial-gradient(circle, #ffffff, transparent 10%)`,
            animationDuration: "10s",
            }}
        ></div>
        <div className={styles.innerContent}>{children}</div>
    </div>
    )
}