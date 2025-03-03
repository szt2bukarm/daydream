import styles from './nav.module.scss'

export default function Nav() {
    return (
        <div className={styles.navWrapper}>
            <div className={styles.nav}>
                <img src="logo.svg" className={styles.logo} />
                <div className={styles.navItem}>Main</div>
                <div className={styles.navItem}>About</div>
                <div className={styles.navItem}>Teaser</div>
            </div>
        </div>
    )
}