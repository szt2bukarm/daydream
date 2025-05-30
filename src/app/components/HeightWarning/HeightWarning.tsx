import styles from './heightwarning.module.scss'
export default function HeightWarning() {
    return (
        <div className={styles.wrapper}>
            <p>Please expand the window's height beyond 500px</p>
        </div>
    )
}