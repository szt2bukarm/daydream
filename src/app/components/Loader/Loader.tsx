"use client";
import { useEffect, useState } from 'react'; // Import useState and useEffect
import gsap from 'gsap';
import styles from './loader.module.scss';
import {useStore} from '@/useStore';
import { useGLTF } from '@react-three/drei';
import { useGSAP } from '@gsap/react';

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
    "Features/Albums/album1.webp",
    "Features/Albums/album2.webp",
    "Features/Albums/album3.webp",
    "Features/Albums/album4.webp",
    "Features/Albums/album5.webp",
    "Features/Albums/album6.webp",
    "Features/Albums/album7.webp",
    "Features/Albums/album8.webp",
    "Features/Albums/album9.webp",
    "Features/Cables/cable1.webp",
    "Features/Cables/cable2.webp",
    "Features/Cables/cable3.webp",
    "FlipInsequence/flipin1.webp",
    "FlipInsequence/flipin2.webp",
    "FlipInsequence/flipin3.webp",
    "FlipInsequence/flipin4.webp",
    "FlipInsequence/flipin5.webp",
    "FlipInsequence/flipin6.webp",
    "FlipInsequence/flipin7.webp",
    "FlipInsequence/flipin8.webp",
    "FlipInsequence/flipin9.webp",
    "FlipInsequence/flipin10.webp",
    "FlipInsequence/flipin11.webp",
    "FlipInsequence/flipin12.webp",
    "FlipInsequence/flipin13.webp",
    "FlipInsequence/flipin14.webp",
    "FlipInsequence/flipin15.webp",
    "FlipInsequence/flipin16.webp", 
    "FlipInsequence/flipin17.webp",
    "FlipInsequence/flipin18.webp", 
    "FlipInsequence/flipin19.webp",
    "FlipInsequence/flipin20.webp",
    "FlipInsequence/flipin21.webp",
    "FlipInsequence/flipin22.webp",
    "FlipInsequence/flipin23.webp",
    "FlipInsequence/flipin24.webp",
    "FlipInsequence/flipin25.webp",
    "FlipInsequence/flipin26.webp",
    "FlipInsequence/flipin27.webp",
    "FlipInsequence/flipin28.webp",
    "FlipInsequence/flipin29.webp",
    "FlipInsequence/flipin30.webp",
    "FlipInsequence/flipin31.webp",
    "FlipInsequence/flipin32.webp",
    "FlipInsequence/flipin33.webp",
    "FlipInsequence/flipin34.webp",
    "FlipInsequence/flipin35.webp",
    "FlipInsequence/flipin36.webp",
    "FlipInsequence/flipin37.webp",
    "FlipInsequence/flipin38.webp",
    "FlipInsequence/flipin39.webp",
    "FlipInsequence/flipin40.webp",
    "FlipInsequence/flipin41.webp",
    "FlipInsequence/flipin42.webp",
    "FlipInsequence/flipin43.webp",
    "FlipInsequence/flipin44.webp",
    "FlipInsequence/flipin45.webp",
    "FlipInsequence/flipin46.webp",
    "FlipInsequence/flipin47.webp",
    "FlipInsequence/flipin48.webp",
    "FlipInsequence/flipin49.webp",
    "FlipInsequence/flipin50.webp",
    "FlipInsequence/flipin51.webp",
    "FlipInsequence/flipin52.webp",
    "FlipInsequence/flipin53.webp",
    "FlipInsequence/flipin54.webp", 
    "FlipInsequence/flipin55.webp",
    "FlipInsequence/flipin56.webp",
    "FlipInsequence/flipin57.webp",
    "FlipInsequence/flipin58.webp",
    "FlipInsequence/flipin59.webp",
    "FlipInsequence/flipin60.webp",
    "FlipInsequence/flipin61.webp",
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
    "LogoSVG/logo.svg",
    "LogoSVG/logoBG.svg",
];



export default function Loader() {
    const {setLoaded,loaded} = useStore();
    const [progress, setProgress] = useState(0);
    const [hideLoader,setHideLoader] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoPath = '/hero.mp4';

    const preloadVideo = () => {
      return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.src = videoPath;
        video.muted = true;
        video.preload = 'auto';
    
        video.oncanplaythrough = () => {
          resolve();
        };
    
        video.onloadeddata = () => {
          resolve();
        };
    
        video.load();
      });
    };
    
    useEffect(() => {
        useGLTF.preload("/model.glb");
    })
    const preloadAssets = (assets) => {
        return new Promise((resolve, reject) => {
            const totalAssets = assets.length;
            let loadedAssets = 0;

            const checkAllLoaded = () => {
                if (loadedAssets === totalAssets) {
                    resolve()
                }
            };

            assets.forEach((asset) => {
                const img = new Image();
                img.onload = () => {
                    window[asset] = img;
                    loadedAssets++;
                    const progress = (loadedAssets / totalAssets) * 100;
                    setProgress(progress);
                    checkAllLoaded();
                };
                img.src = asset;
            });
        });
    };

    useEffect(() => {
        const loadAllAssets = async () => {
          try {
            // Load assets and video in parallel
            await Promise.all([
              preloadAssets(assets),
              preloadVideo()
            ]);
            
            setLoaded(true);
            setVideoLoaded(true);
          } catch (error) {
          }
        };
    
        loadAllAssets();
      }, []);
    

    const revealLetter = (index) => {
        gsap.set(`.${styles.logoLetter}[data-index="${index}"]`, {
            opacity: 1
        })
        gsap.to(`.${styles.logoLetter}[data-index="${index}"]`, {
            y: 0,
        });
    };

    useGSAP(() => {
        gsap.set(`.${styles.logoLetter}`, {
            y: 50,
        });
    
        const step = 12;
        const numLetters = 8;
    
        for (let i = 0; i < numLetters; i++) {
            if (progress > step * (i + 1)) {
                revealLetter(i);
            }
        }
    }, [progress]);

    useEffect(() => {
        console.log(loaded,videoLoaded)
        if (loaded && videoLoaded) {
            gsap.to(`.${styles.wrapper}`, {
                clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)',
                duration: 0.5,
                ease: 'power2.out',
                delay: 0.5,
                onComplete: () => {
                    setHideLoader(true)
                }
            })
        }
    }, [loaded,videoLoaded]);

    if (hideLoader) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 10 }}>
            <div className={styles.wrapper}>
            <video autoPlay muted loop style={{opacity: 0, position: "absolute",zIndex: "-1"}} onCanPlayThrough={() => setVideoLoaded(true)}>
                    <source src={`hero.webm`} type="video/webm" />
                </video>
                <div className={styles.background}></div>
                <img src="loader.png" className={styles.logos} alt="loader" />
                <div className={styles.logo}>
                    {logoPaths.map((path, index) => (
                        <img
                            data-index={index}
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
