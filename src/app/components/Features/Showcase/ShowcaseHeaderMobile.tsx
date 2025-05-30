import styles from './showcaseHeader.module.scss'

export default function ShowcaseHeaderMobile({children}: {children: React.ReactNode}) {
    return <p className={styles.headerMobile}>{children}</p>
}