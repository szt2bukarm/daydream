import AlbumCard from '../../AlbumCard/AlbumCard';
import ShowcaseShader from '../ShowcaseShader/ShowcaseShader';
import styles from './showcasealbums.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useEffect, forwardRef } from 'react';
import SplitType from 'split-type';
import { useLenis } from '@studio-freight/react-lenis';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import featuresStyles from '../../features.module.scss';
import ShowcaseHeader from '../ShowcaseHeader';
import ShowcaseSubtext from '../ShowcaseSubtext';

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

export default function ShowcaseAlbums() {
    const uiBackground = useRef<HTMLDivElement>(null);
    const uiItem = useRef([]);
    const textContainer = useRef(null);
    const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
    const lenis = useLenis();
    let resizeTimeout = null;

    useGSAP(() => {
        if (!lenis) return;
        gsap.to([`.${styles.albums}`, `.${styles.ui}`, `.${styles.header}`], {
            opacity: 0,
        })
        gsap.set(uiItem.current, {
            opacity: 0,
            y: 30
        })
    }, [lenis]);

    const setupScrollTrigger = () => {
        const trigger = ScrollTrigger.create({
            trigger: `.${styles.wrapper}`,
            start: 'top+=200 0%',
            end: 'top+=300 0%',
            // markers: true,
            onEnter: () => {
                gsap.set(`.${styles.wrapper}`, {
                    display: "block"
                })
                gsap.to([`.${styles.albums}`, `.${styles.ui}`, `.${styles.header}`], {
                    opacity: 1,
                    delay: 1.3,
                    stagger: 0.1,
                })
                gsap.to(uiItem.current, {
                    opacity: 1,
                    y: 0,
                    delay: 1.35,
                    stagger: 0.05,
                    // onComplete: () => lenis.start()
                })
            },
            onLeave: () => {
                gsap.to([`.${styles.albums}`, `.${styles.ui}`, `.${styles.header}`], {
                    opacity: 0,
                    duration: 0.15,
                })

            },
            onEnterBack: () => {
                // lenis?.stop();
                // setTimeout(() => {
                    // lenis?.start();
                // }, 1500);
                gsap.set(`.${styles.wrapper}`, {
                    display: "block"
                })

                gsap.to([`.${styles.albums}`, `.${styles.ui}`, `.${styles.header}`], {
                    opacity: 1,
                    duration: 0.15,
                })

            },
            onLeaveBack: () => {
                gsap.to([`.${styles.albums}`, `.${styles.ui}`, `.${styles.header}`], {
                    opacity: 0,
                })
                gsap.to(uiItem.current, {
                    opacity: 0,
                    y: -30,
                    stagger: 0.1,
                    // onComplete: () => {
                        // lenis?.start();
                    // }
                })
            },
        })
        return trigger;
    }

    useGSAP(() => {
        if (!lenis) return;
        if (typeof window === 'undefined') return;
        scrollTriggerInstance.current = setupScrollTrigger();

        let lastWidth = window.innerWidth;

        const handleResize = () => {
            if (lastWidth === window.innerWidth) return;
            lastWidth = window.innerWidth;
            clearTimeout(resizeTimeout!);

            resizeTimeout = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 200);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [lenis]);



    return (
        <div className={styles.wrapper}>
            <div className={styles.relative}>
                <div ref={textContainer}>
                    <ShowcaseHeader triggerClass={styles.wrapper} start="200" end="300">
                    Plays all your favorites,<br></br>and then some
                    </ShowcaseHeader>
                    <ShowcaseSubtext triggerClass={styles.wrapper} start="200" end="300">
                        Access millions of tracks instantly, or use <b>Daydream Link</b> to load your personal library onto the device.
                        No Wi-Fi? No problem. Your music stays with you, ready to play anytime, anywhere.
                    </ShowcaseSubtext>
                </div>
                <div className={styles.ui}>
                    <div ref={uiBackground}>
                        <ShowcaseShader />
                        <div className={styles.gradient}></div>
                    </div>
                    <div className={styles.toprow}>
                        <p className={styles.time} ref={el => uiItem.current[0] = el}>11:27</p>
                        <p className={styles.menuItem} ref={el => uiItem.current[1] = el}>Discover</p>
                        <p className={styles.menuItemSelected} ref={el => uiItem.current[2] = el}>Library · Albums</p>
                        <p className={styles.menuItem} ref={el => uiItem.current[3] = el}>Friends</p>
                        <p className={styles.menuItem} ref={el => uiItem.current[4] = el}>Live Sessions</p>
                        <p className={styles.menuItem} ref={el => uiItem.current[5] = el}>User</p>
                    </div>
                </div>
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
                </div>
            </div>
        </div>
    );
}
