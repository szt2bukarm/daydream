import { useEffect, useRef, useState } from 'react';
import styles from './videoplayer.module.scss';
import navStyles from '../Nav/nav.module.scss';
import { useStore } from '@/useStore';
import gsap from 'gsap';
import { useLenis } from '@studio-freight/react-lenis';
import Player from '@vimeo/player';

export default function VideoPlayer() {
  const iframeRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [showUnmute, setShowUnmute] = useState(false);
  const { showPlayer, setShowPlayer, isMobile } = useStore();
  const lenis = useLenis();

  useEffect(() => {
    if (!iframeRef.current || !showPlayer || isMobile) return;

    if (player) {
      player.destroy().catch(() => {});
    }

    const newPlayer = new Player(iframeRef.current, {
      id: 1076540999,
      width: 640,
      controls: false,
      responsive: true,
      loop: true,
      muted: false,
    });

    setPlayer(newPlayer);
    newPlayer.setVolume(1);
  }, [showPlayer, isMobile]);

  useEffect(() => {
    if (!showPlayer || !isMobile) return;
  
    const video = videoRef.current;
    if (!video) return;
  
    const tryFullscreen = async () => {
      try {
        if (video.requestFullscreen) {
          await video.requestFullscreen();
        } else if ((video as any).webkitEnterFullscreen) {
          await (video as any).webkitEnterFullscreen(); // iOS Safari
        }
      } catch (e) {
        console.warn("Fullscreen request failed:", e);
      }
    };
  
    const handleFullscreenExit = () => {
      if (!document.fullscreenElement) {
        setShowPlayer(false);
        lenis.start();
        document.body.classList.remove('lock-scroll');
        const nav = document.querySelector(`.${navStyles.navWrapper}`);
        if (nav) {
          nav.style.opacity = '1';
          nav.style.pointerEvents = 'all';
        }
      }
    };
  
    video.addEventListener('fullscreenchange', handleFullscreenExit);
    video.addEventListener('webkitendfullscreen', handleFullscreenExit);
  
    video.play().catch(() => {});
    tryFullscreen();
  
    return () => {
      video.removeEventListener('fullscreenchange', handleFullscreenExit);
      video.removeEventListener('webkitendfullscreen', handleFullscreenExit);
    };
  }, [showPlayer, isMobile]);
  

  useEffect(() => {
    if (!showPlayer) return;
    document.body.classList.add('lock-scroll');
    lenis.stop();
    gsap.set(`.${styles.wrapper}`, { opacity: 0 });
    gsap.to(`.${styles.wrapper}`, { opacity: 1, duration: 0.3 });
    const nav = document.querySelector(`.${navStyles.navWrapper}`);
    if (nav) {
      nav.style.opacity = '0';
      nav.style.pointerEvents = 'none';
    }
  }, [showPlayer]);

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
    if (!player) return;
    player.play()
  }, [player]);

  if (!showPlayer) return null;

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

        {/* Desktop: Vimeo iframe */}
        {!isMobile && <div ref={iframeRef} className={styles.player}></div>}

        {/* Mobile: Native full-screen video */}
        {isMobile && (
          <video
            ref={videoRef}
            src="/trailer.mp4"
            className={styles.player}
            autoPlay
            controls
          />
        )}
      </div>

      {showUnmute && !isMobile && (
        <button className={styles.play} onClick={() => {
          player?.setVolume(1).then(() => setShowUnmute(false));
        }}>
          Unmute
        </button>
      )}
    </div>
  );
}
