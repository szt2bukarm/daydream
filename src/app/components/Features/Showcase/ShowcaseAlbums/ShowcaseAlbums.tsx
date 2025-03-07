import AlbumCard from '../../AlbumCard/AlbumCard';
import ShowcaseShader from '../ShowcaseShader/ShowcaseShader';
import styles from './showcasealbums.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, useEffect } from 'react';
import SplitType from 'split-type';


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

]

export default function ShowcaseAlbums() {
    const uiBackground = useRef<HTMLDivElement>(null);
    const uiItem = useRef([]);

    const textRef = useRef([]);

    useEffect(() => {
        const splitText = new SplitType(textRef.current, { types: 'lines' });

        splitText.lines.forEach(line => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        gsap.fromTo(splitText.lines,
            {
                opacity: 0,
                y: 100,
                rotate: 3
            },
            {
                opacity: 1,
                y: 0,
                rotate: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: `.${styles.wrapper}`,
                    start: 'top+=2300 0%',
                    end: 'bottom+=3000 0%',
                    markers: false,
                    toggleActions: 'play reverse play reverse'
                }
            }
        );

        return () => splitText.revert();
    }, []);


    useGSAP(() => {
        gsap.set(uiBackground.current, {
            opacity: 0,
        })
        gsap.to(uiBackground.current, {
            opacity: 1,
            scrollTrigger: {
                trigger: `.${styles.wrapper}`,
                start: 'top+=2400 0%',
                end: 'bottom+=2500 0%',
                // markers: true,
                scrub: true
            }
        })

        gsap.set(`.${styles.albums}`, {
            perspective: 1000,
            rotateX: 4.5,
            y: 200,
            transform: "translateX(-50%) scale(1.5)",
            opacity: 0
        })
        gsap.to(`.${styles.albums}`, {
            rotateX: 0,
            y: 0,
            transform: "translateX(-50%) scale(1)",
            opacity: 1,
            scrollTrigger: {
                trigger: `.${styles.wrapper}`,
                start: 'top+=1800 0%',
                end: 'bottom+=2300 0%',
                // markers: true,
                scrub: true,
            }
        })

        gsap.set(uiItem.current, {
            perspective: 2000,
            rotateX: 5,
            opacity: 0,
            y: 100,
            x: -50
        })
        gsap.to(uiItem.current, {
            rotateX: 0,
            y: 0,
            x: 0,
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
                trigger: `.${styles.wrapper}`,
                start: 'top+=1700 0%',
                end: 'bottom+=2500 0%',
                // markers: true,
                scrub: true,
            }
        })
    },[])

    return (
        <div className={styles.wrapper}>
            <div className={styles.relative}>
                <p className={styles.header} ref={el => textRef.current[0] = el}>Plays all your favorites,<br></br>and then some</p>
                <p className={styles.subtext} ref={el => textRef.current[1] = el}>Access millions of tracks instantly, or use <b>Daydream Link</b> to load your personal library onto the device. No Wi-Fi? No problem. Your music stays with you, ready to play anytime, anywhere.</p>
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
