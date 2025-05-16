import AlbumCard from '../../AlbumCard/AlbumCard';
import ShowcaseHeader from '../../Showcase/ShowcaseHeader'
import ShowcaseHeaderMobile from '../../Showcase/ShowcaseHeaderMobile';
import ShowcaseSubtext from '../../Showcase/ShowcaseSubtext'
import ShowcaseSubtextMobile from '../../Showcase/ShowcaseSubtextMobile'
import styles from './showcasealbummobile.module.scss'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const albums = [
    {
        image: 'album1',
        title: 'PLAN A'
    },
    {
        image: 'album2',
        title: 'Hardstone Psycho'
    },
    {
        image: 'album3',
        title: 'Testing'
    },
    {
        image: 'album4',
        title: 'DRIP SEASON 4EVER'
    },
    {
        image: 'album5',
        title: 'TEC'
    },
    {
        image: 'album6',
        title: 'Rodeo'
    },
    {
        image: 'album7',
        title: 'Life of a DON'
    },
    {
        image: 'album8',
        title: 'For All The Dogs'
    },
    {
        image: 'album9',
        title: 'Astroworld'
    },
];

export default function ShowcaseAlbumMobile() {

    useGSAP(() => {
        gsap.set(`.${styles.wrapper}`, {
            opacity: 0
        })
        gsap.to(`.${styles.wrapper}`, {
            opacity: 1,
            scrollTrigger: {
                trigger: `.${styles.wrapper}`,
                start: 'top-=400 0%',
                end: 'bottom 0%',
            }
        })
    },[])

    return (
        <div className={styles.wrapper}>
                <ShowcaseHeaderMobile>
                Plays all your favorites,<br></br>and then some
                </ShowcaseHeaderMobile>
                <div className={styles.albums}>
                {albums.map((album, index) => (
                        <AlbumCard key={index} image={album.image} title={album.title} index={index} />
                    ))}
                    {albums.map((album, index) => (
                        <AlbumCard key={index} image={album.image} title={album.title} index={index} />
                    ))}
                    {albums.map((album, index) => (
                        <AlbumCard key={index} image={album.image} title={album.title} index={index} />
                    ))}
                    {albums.map((album, index) => (
                        <AlbumCard key={index} image={album.image} title={album.title} index={index} />
                    ))}
                </div>
                <ShowcaseSubtextMobile>
                Access millions of tracks instantly, or use <b>Daydream Link</b> to load your personal library onto the device.
                No Wi-Fi? No problem. Your music stays with you, ready to play anytime, anywhere.
                </ShowcaseSubtextMobile>
        </div>
    )
}