import Player from '@vimeo/player'
import { useEffect, useRef, useState } from 'react';
import styles from './videoplayer.module.scss'
import { useStore } from '@/useStore';
import gsap from 'gsap';
import navStyles from '../Nav/nav.module.scss'
import { useLenis } from '@studio-freight/react-lenis';

export default function VideoPlayer() {
  const iframeRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const { showPlayer, setShowPlayer } = useStore();
  const lenis = useLenis();



  useEffect(() => {
    if (!iframeRef.current || !showPlayer) return;

    // Destroy any existing player first
    if (player) {
      player.destroy().catch(() => {});
    }

    const newPlayer = new Player(iframeRef.current, {
      id: 1076540999,
      width: 640,
      controls: false,
      responsive: true,
      loop: true,
    });

    newPlayer.on('play', () => setIsPlaying(true));
    newPlayer.on('pause', () => setIsPlaying(false));
    setPlayer(newPlayer);
  }, [showPlayer]);

  useEffect(() => {
    if (!player) return;
    player.play();
  }, [player]);

  const closePlayer = () => {
    document.body.classList.remove('lock-scroll');
    lenis.start();
    const nav = document.querySelector(`.${navStyles.navWrapper}`)
    if (nav) {
        nav.style.opacity = '1';
        nav.style.pointerEvents = 'all';
      }
    gsap.to(`.${styles.wrapper}`, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setShowPlayer(false);
        setPlayer(null);
      },
    });
  };

  useEffect(() => {
    if (!showPlayer) return;
    document.body.classList.add('lock-scroll');
    lenis.stop();
    gsap.set(`.${styles.wrapper}`, { opacity: 0 });
    gsap.to(`.${styles.wrapper}`, {
      opacity: 1,
      duration: 0.3,
    });
    const nav = document.querySelector(`.${navStyles.navWrapper}`)
    console.log(nav);
    if (nav) {
        nav.style.opacity = '0';
        nav.style.pointerEvents = 'none';

    }
  }, [showPlayer]);

  if (!showPlayer) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={closePlayer} />
    <div className={styles.playerWrapper}>
        <img src="/videoclose.svg" alt="close" className={styles.close} onClick={closePlayer} />
        <div className={styles.playerOverlay}></div>
      <div ref={iframeRef} className={styles.player}></div>
    </div>
    </div>
  );
}
