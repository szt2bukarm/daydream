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

const albums = [
    {
        image: 'album1',
        title: 'Astroworld'
    },
    {
        image: 'album2',
        title: 'Hardstone Psycho'
    },
    {
        image: 'album3',
        title: 'Testing'
    },
];

export default function ShowcaseAlbums() {
    const uiBackground = useRef<HTMLDivElement>(null);
    const uiItem = useRef([]);
    const textContainer = useRef(null);
    const textRef = useRef([]);
    const lenis = useLenis();

    useEffect(() => {
        if (!lenis) return;
        const splitText = new SplitType(textRef.current, { types: 'lines' });

        splitText.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        gsap.set(splitText.lines, {
            y: 100,
            rotate: 3
        })
        gsap.to([`.${styles.albums}`, `.${styles.ui}`, `.${styles.header}`], {
            opacity: 0,
        })
        gsap.set(uiItem.current, {
            opacity: 0,
            y: 30
        })

        ScrollTrigger.create({
            trigger: `.${styles.wrapper}`,
            start: 'top+=200 0%',
            end: 'top+=300 0%',
            // markers: true,
            onEnter: () => {
                gsap.set(`.${styles.wrapper}`, {
                    display: "block"
                })
                gsap.to(splitText.lines, {
                    y: 0,
                    rotate: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    delay: 1,
                    ease: 'power4.out',
                });
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
                    onComplete: () => lenis.start()
                })
            },
            onLeave: () => {
                gsap.to(splitText.lines, {
                    y: -100,
                    rotate: 3,
                    duration: 1.2,
                    stagger: 0.1,
                })
                gsap.to([`.${styles.albums}`, `.${styles.ui}`, `.${styles.header}`], {
                    opacity: 0,
                    duration: 0.15,
                    onStart: () => {
                        lenis.stop()
                        window.scrollBy(0, 5)
                    },
                    onComplete: () => {
                        gsap.set(`.${styles.wrapper}`, {
                            display: "none"
                        })
                    }
                })
                // gsap.to(uiItem.current, {
                //     opacity: 0,
                //     y: -50,
                //     stagger: 0.1
                // })
            },
            onEnterBack: () => {
                gsap.set(`.${styles.wrapper}`, {
                    display: "block"
                })
                gsap.to(splitText.lines, {
                    y: 0,
                    rotate: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'power4.out',
                })
                gsap.to([`.${styles.albums}`, `.${styles.ui}`, `.${styles.header}`], {
                    opacity: 1,
                    duration: 0.15,
                    onComplete: () => lenis.start()
                    // delay: 0.3,
                })
                // gsap.to(uiItem.current, {
                //     opacity: 1,
                //     y: 0,
                //     delay: 0.3,
                //     stagger: 0.05,
                //     onComplete: () => lenis.start()
                // })
            },
            onLeaveBack: () => {
                gsap.to(splitText.lines, {
                    y: -100,
                    rotate: 3,
                    duration: 1.2,
                    stagger: 0.1,
                    onComplete: () => {
                        gsap.set(`.${styles.wrapper}`, {
                            display: "none"
                        })
                    }
                })
                gsap.to([`.${styles.albums}`, `.${styles.ui}`, `.${styles.header}`], {
                    opacity: 0,
                })
                gsap.to(uiItem.current, {
                    opacity: 0,
                    y: -30,
                    stagger: 0.1
                })
            },
        })

        return () => splitText.revert();
    }, [lenis]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.relative}>
                <div ref={textContainer}>
                    <p className={styles.header}>Plays all your favorites,<br></br>and then some</p>
                    <p className={styles.subtext} ref={el => textRef.current[1] = el}>
                        Access millions of tracks instantly, or use <b>Daydream Link</b> to load your personal library onto the device.
                        No Wi-Fi? No problem. Your music stays with you, ready to play anytime, anywhere.
                    </p>
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
                        <AlbumCard key={index} image={album.image} title={album.title} />
                    ))}
                    {albums.map((album, index) => (
                        <AlbumCard key={index} image={album.image} title={album.title} />
                    ))}
                    {albums.map((album, index) => (
                        <AlbumCard key={index} image={album.image} title={album.title} />
                    ))}
                    {albums.map((album, index) => (
                        <AlbumCard key={index} image={album.image} title={album.title} />
                    ))}
                    {albums.map((album, index) => (
                        <AlbumCard key={index} image={album.image} title={album.title} />
                    ))}
                    {albums.map((album, index) => (
                        <AlbumCard key={index} image={album.image} title={album.title} />
                    ))}
                </div>
            </div>
        </div>
    );
}
