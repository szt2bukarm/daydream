import { Link } from 'next-view-transitions'
import TransitionLink from '../TransitionLink'
import styles from './nav.module.scss'

export default function Nav() {
    return (
        <div className={styles.navWrapper}>
            <div className={styles.nav}>
                <img src="logo.svg" className={styles.logo} />
                <TransitionLink href="/" className={styles.navItem}>Main</TransitionLink>
                <TransitionLink href="/gallery" className={styles.navItem}>Gallery</TransitionLink>
                <TransitionLink href="/about" className={styles.navItem}>About</TransitionLink>
            </div>
        </div>
    )
}