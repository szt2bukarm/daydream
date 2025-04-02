"use client";
import { useEffect, useState } from 'react'; // Import useState and useEffect
import gsap from 'gsap';
import styles from './loader.module.scss';
import {useStore} from '@/useStore';

const letters = ['D', 'A', 'Y', 'D', 'R', 'E', 'A', 'M'];
const logoPaths = letters.map(letter => `LogoSVG/${letter}.svg`);

const assets = [
    "About/logostroke.png",
    "About/poster1.png",
    "About/poster2.png",
    "Colors/1.png",
    "Colors/2.png",
    "Colors/3.png",
    "Colors/4.png",
    "Colors/5.png",
    "Colors/6.png",
    "Colors/7.png", 
    "Colors/8.png",
    "Colors/colors.webp",
    "Features/Albums/album1.png",
    "Features/Albums/album2.png",
    "Features/Albums/album3.png",
    "Features/Cables/cable1.png",
    "Features/Cables/cable2.png",
    "Features/Cables/cable3.png",
    "Features/FlipInsequence/flipin1.webp",
    "Features/FlipInsequence/flipin2.webp",
    "Features/FlipInsequence/flipin3.webp",
    "Features/FlipInsequence/flipin4.webp",
    "Features/FlipInsequence/flipin5.webp",
    "Features/FlipInsequence/flipin6.webp",
    "Features/FlipInsequence/flipin7.webp",
    "Features/FlipInsequence/flipin8.webp",
    "Features/FlipInsequence/flipin9.webp",
    "Features/FlipInsequence/flipin10.webp",
    "Features/FlipInsequence/flipin11.webp",
    "Features/FlipInsequence/flipin12.webp",
    "Features/FlipInsequence/flipin13.webp",
    "Features/FlipInsequence/flipin14.webp",
    "Features/FlipInsequence/flipin15.webp",
    "Features/FlipInsequence/flipin16.webp", 
    "Features/FlipInsequence/flipin17.webp",
    "Features/FlipInsequence/flipin18.webp", 
    "Features/FlipInsequence/flipin19.webp",
    "Features/FlipInsequence/flipin20.webp",
    "Features/FlipInsequence/flipin21.webp",
    "Features/FlipInsequence/flipin22.webp",
    "Features/FlipInsequence/flipin23.webp",
    "Features/FlipInsequence/flipin24.webp",
    "Features/FlipInsequence/flipin25.webp",
    "Features/FlipInsequence/flipin26.webp",
    "Features/FlipInsequence/flipin27.webp",
    "Features/FlipInsequence/flipin28.webp",
    "Features/FlipInsequence/flipin29.webp",
    "Features/FlipInsequence/flipin30.webp",
    "Features/FlipInsequence/flipin31.webp",
    "Features/FlipInsequence/flipin32.webp",
    "Features/FlipInsequence/flipin33.webp",
    "Features/FlipInsequence/flipin34.webp",
    "Features/FlipInsequence/flipin35.webp",
    "Features/FlipInsequence/flipin36.webp",
    "Features/FlipInsequence/flipin37.webp",
    "Features/FlipInsequence/flipin38.webp",
    "Features/FlipInsequence/flipin39.webp",
    "Features/FlipInsequence/flipin40.webp",
    "Features/FlipInsequence/flipin41.webp",
    "Features/FlipInsequence/flipin42.webp",
    "Features/FlipInsequence/flipin43.webp",
    "Features/FlipInsequence/flipin44.webp",
    "Features/FlipInsequence/flipin45.webp",
    "Features/FlipInsequence/flipin46.webp",
    "Features/FlipInsequence/flipin47.webp",
    "Features/FlipInsequence/flipin48.webp",
    "Features/FlipInsequence/flipin49.webp",
    "Features/FlipInsequence/flipin50.webp",
    "Features/FlipInsequence/flipin51.webp",
    "Features/FlipInsequence/flipin52.webp",
    "Features/FlipInsequence/flipin53.webp",
    "Features/FlipInsequence/flipin54.webp", 
    "Features/FlipInsequence/flipin55.webp",
    "Features/FlipInsequence/flipin56.webp",
    "Features/FlipInsequence/flipin57.webp",
    "Features/FlipInsequence/flipin58.webp",
    "Features/FlipInsequence/flipin59.webp",
    "Features/FlipInsequence/flipin60.webp",
    "Features/FlipInsequence/flipin61.webp",
    "Features/frame.png",
    "Features/user1.png",
    "Features/user2.svg",
    "Features/user3.svg",
    "Features/user4.png",
    "Features/user5.png",
    "Features/user6.png",
    "FloatingCard/fingerprint.png",
    "FloatingCard/link.png",
    "FloatingCard/note.png",
    "FloatingCard/spiral.png",
    "Fullcards/card1.png",
    "Fullcards/card2.png",
    "Hero/hero1.webp",
    "Hero/hero2.webp",
    "Hero/hero3.webp",
    "Hero/hero4.webp",
    "Hero/hero5.webp",
    "Hero/hero6.webp",
    "Hero/hero7.webp",
    "Hero/hero8.webp",
    "Hero/hero9.webp",
    "Hero/hero10.webp",
    "Hero/hero11.webp",
    "Hero/hero12.webp",
    "Hero/hero13.webp",
    "Hero/hero14.webp",
    "Hero/hero15.webp",
    "Hero/hero16.webp",
    "Hero/hero17.webp",
    "Hero/hero18.webp",
    "Hero/hero19.webp",
    "Hero/hero20.webp",
    "Hero/hero21.webp",
    "Hero/hero22.webp",
    "Hero/hero23.webp",
    "Hero/hero24.webp",
    "Hero/hero25.webp",
    "Hero/hero26.webp",
    "Hero/hero27.webp",
    "LogoSVG/logo.svg",
    "LogoSVG/logoBG.svg"
];

export default function Loader() {
    const {setLoaded,loaded} = useStore();
    const [progress, setProgress] = useState(0);
    const [hideLoader,setHideLoader] = useState(false);

    const preloadAssets = (assets) => {
        return new Promise((resolve, reject) => {
            const totalAssets = assets.length;
            let loadedAssets = 0;

            const checkAllLoaded = () => {
                if (loadedAssets === totalAssets) {
                    resolve(); // All assets are loaded
                }
            };

            assets.forEach((asset) => {
                const img = new Image();
                img.onload = () => {
                    // Cache the image in the window object to prevent it from being reloaded
                    window[asset] = img;
                    loadedAssets++;
                    const progress = (loadedAssets / totalAssets) * 100;
                    setProgress(progress);
                    console.log(`Loaded asset: ${asset} (${progress.toFixed(2)}%)`);
                    checkAllLoaded();
                };
                img.onerror = () => reject(`Failed to load asset: ${asset}`);
                img.src = asset;
            });
        });
    };

    useEffect(() => {
        // Preload assets when the component mounts
        preloadAssets(assets)
            .then(() => {
                setLoaded(true); // Set assetsLoaded to true after all assets are loaded
            })
            .catch((error) => {
                console.error(error);
            });
    }, []); // Run once on mount

    useEffect(() => {
        if (loaded) {
            gsap.to(`.${styles.wrapper}`, {
                clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
                duration: 0.5,
                ease: 'power2.out',
                delay: 0.5,
                onComplete: () => {
                    setHideLoader(true)
                }
            })
            // gsap.to()
            // gsap.to(`.${styles.logos}`, {
            //     opacity: 0,
            //     duration: 0.3
            // })
            // gsap.to(`.${styles.fog}`, {
            //     opacity: 0,
            //     duration: 0.3,
            //     delay: 0.6
            // })
            // gsap.to(`.${styles.background}`, {
            //     y: '100%',
            //     duration: 0.4,
            //     delay: 0.5,
            //     ease: 'power4.out'
            // });
            // // gsap.to(`.${styles.logo}`, {
            // //     opacity: 0,
            // //     delay: 0.5
            // // })
        }
    }, [loaded]); // Trigger animation when assets are loaded

    if (hideLoader) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 10 }}>
            <div className={styles.wrapper}>
                <div className={styles.background}></div>
                <img src="loader.png" className={styles.logos} alt="loader" />
                <div className={styles.logo}>
                    {logoPaths.map((path, index) => (
                        <img
                            key={index}
                            src={path}
                            alt={letters[index]}
                            className={styles.logoLetter}
                        />
                    ))}
                </div>
                <div className={styles.fog}></div>
            </div>
        </div>
    );
}
