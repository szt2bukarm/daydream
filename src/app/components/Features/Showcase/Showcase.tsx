import styles from './showcase.module.scss'
import ShowcaseAlbums from './ShowcaseAlbums/ShowcaseAlbums'
import ShowcaseSocial from './ShowcaseSocial/ShowcaseSocial'

export default function Showcase() {
    return (
        <div className={styles.wrapper}>
            {/* <img src="Features/frame.png" className={styles.frame} /> */}
            <ShowcaseAlbums />
            <ShowcaseSocial />
        </div>
    )
}