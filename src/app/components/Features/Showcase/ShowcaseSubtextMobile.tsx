import styles from './showcasesubtext.module.scss'

export default function ShowcaseSubtextMobile({children}: {children: React.ReactNode}) {
    return (
        <p className={styles.subtextMobile}>
            {children}
        </p>
    )
}