"use client"
import { Link } from 'next-view-transitions'
import TransitionLink from '../TransitionLink'
import styles from './nav.module.scss'
import { useStore } from '@/useStore'
import { useEffect } from 'react';

export default function Nav() {
    const { loaded } = useStore();

    useEffect(() => {
        if (loaded) {
            setTimeout(() => {
                document.querySelector(`.${styles.navWrapper}`).style.opacity = '1'
            }, 750);
        }
    },[loaded])

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