import styles from './teaserbutton.module.scss';

export default function TeaserButton() {
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
        <div className={styles.innerContent}>Watch Teaser</div>
    </div>
    )
}