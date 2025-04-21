import Player from '@vimeo/player'
import { useEffect, useRef, useState } from 'react';
import styles from './videoplayer.module.scss'
import { useStore } from '@/useStore';
import gsap from 'gsap';
import navStyles from '../Nav/nav.module.scss'
import { useLenis } from '@studio-freight/react-lenis';

const isMobile = () => {
  if (typeof navigator === 'undefined') return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export default function VideoPlayer() {
  const iframeRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [showUnmute, setShowUnmute] = useState(false);
  const { showPlayer, setShowPlayer } = useStore();
  const lenis = useLenis();

  useEffect(() => {
    if (!iframeRef.current || !showPlayer) return;

    if (player) {
      player.destroy().catch(() => {});
    }

    const newPlayer = new Player(iframeRef.current, {
      id: 1076540999,
      width: 640,
      controls: false,
      responsive: true,
      loop: true,
      muted: isMobile(), // Only muted on mobile/tablet
    });

    setPlayer(newPlayer);

    // Show unmute button only on mobile
    if (isMobile()) {
      setShowUnmute(true);
    } else {
      newPlayer.setVolume(1);
    }

  }, [showPlayer]);

  useEffect(() => {
    if (!player) return;
    player.play().catch(() => {
      // Do nothing — expected for autoplay on mobile
    });
  }, [player]);

  const closePlayer = () => {
    document.body.classList.remove('lock-scroll');
    lenis.start();
    const nav = document.querySelector(`.${navStyles.navWrapper}`);
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
    const nav = document.querySelector(`.${navStyles.navWrapper}`);
    if (nav) {
      nav.style.opacity = '0';
      nav.style.pointerEvents = 'none';
    }
  }, [showPlayer]);

  if (!showPlayer) return null;

  const handleUnmute = () => {
    player?.setVolume(1).then(() => {
      setShowUnmute(false);
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={closePlayer} />
      <div className={styles.playerWrapper}>
        <img
          src="/videoclose.svg"
          alt="close"
          className={styles.close}
          onClick={closePlayer}
        />
        <div className={styles.playerOverlay}></div>
        <div ref={iframeRef} className={styles.player}></div>
      </div>

      {showUnmute && (
        <button className={styles.play} onClick={handleUnmute}>
          Unmute
        </button>
      )}
    </div>
  );
}
