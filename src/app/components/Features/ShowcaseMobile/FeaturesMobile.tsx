import { useEffect, useState } from 'react'
import ShowcaseText from '../Showcase/ShowcaseText'
import styles from './featuresmobile.module.scss'
import ShowcaseAlbumMobile from './ShowcaseAlbumMobile/ShowcaseAlbumMobile'
import ShowcasePortsMobile from './ShowcasePortsMobile/ShowcasePortsMobile'
import ShowcaseSocailMobile from './ShowcaseSocialMobile/ShowcaseSocailMobile'
import { useStore } from '@/useStore'

export default function FeaturesMobile() {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const { isMobile } = useStore();

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (width > 724 && !isMobile && height > 730) return <div></div>;

    return (
        <div className={styles.wrapper}>
            <ShowcaseText inline={true} />
            <ShowcaseAlbumMobile />
            <ShowcaseSocailMobile />
            <ShowcasePortsMobile />
        </div>
    )
}