import { useRef } from 'react';
import styles from './showcasesocial.module.scss';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const orbits = [
  { size: 890, duration: 30, img: 'Features/user5.webp' },
  { size: 1100, duration: 20, img: 'Features/user6.webp' },
  { size: 1100, duration: 50, img: 'Features/user4.webp' },
  { size: 890, duration: 45, img: 'Features/user7.webp' },
  { size: 1100, duration: 45, img: 'Features/user8.webp' },
  { size: 890, duration: 60, img: 'Features/user9.webp' },
  { size: 890, duration: 70, img: 'Features/user10.webp' }
];

export default function Faces() {
  const orbitRefs = useRef([]);
  const itemRefs = useRef([]);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
  let resizeTimeout = null;

  useGSAP(() => {
    orbits.forEach((orbit, index) => {
      const initialRotation = Math.random() * 360;

      gsap.set(orbitRefs.current[index], {
        rotate: initialRotation
      });

      gsap.set(itemRefs.current[index], {
        rotate: -initialRotation
      });

      gsap.to(orbitRefs.current[index], {
        rotate: '+=360',
        duration: orbit.duration,
        repeat: -1,
        ease: 'linear'
      });

      gsap.to(itemRefs.current[index], {
        rotate: '-=360',
        duration: orbit.duration,
        repeat: -1,
        ease: 'linear'
      });
    });

    gsap.set(`.${styles.facesWrapper}`, {
      opacity: 0,
      display: 'none'
    });
  }, []);

  const setupScrollTrigger = () => {
    const trigger = ScrollTrigger.create({
      trigger: `.${styles.facesWrapper}`,
      start: 'top+=300 0%',
      end: 'top+=400 0%',
      onEnter: animateIn,
      onEnterBack: animateIn,
      onLeave: animateOut,
      onLeaveBack: animateOut
    });

    return trigger;
  };

  const animateIn = () => {
    gsap.to(itemRefs.current, {
      opacity: 1,
    })
    gsap.set(`.${styles.facesWrapper}`, { display: 'block' });
    gsap.set(`.${styles.expandedDetails}`, { opacity: 0 });
    gsap.set(`.${styles.expandedImage}`, { scale: 1.85 });
    gsap.set(`.${styles.expanded}`, { scale: 0, width: 145 });

    gsap.to(`.${styles.expanded}`, {
      scale: 1,
      delay: 0.5,
      duration: 0.4,
      ease: 'back.out(1.1)'
    });
    gsap.to(`.${styles.expandedImage}`, { scale: 1, delay: 0.9 });
    gsap.to(`.${styles.expanded}`, { width: 460, duration: 0.2, delay: 0.9 });
    gsap.to(`.${styles.expandedDetails}`, {
      opacity: 1,
      duration: 0.2,
      delay: 1.2
    });
    gsap.to(`.${styles.facesWrapper}`, { opacity: 1, delay: 0.4 });
  };

  const animateOut = () => {
    gsap.to(itemRefs.current, {
      opacity: 0,
    })
    gsap.to(`.${styles.expanded}`, {
      scale: 0,
      delay: 0.4,
      duration: 0.2,
      ease: 'back.out(1.1)'
    });
    gsap.to(`.${styles.expandedImage}`, { scale: 2, delay: 0.2 });
    gsap.to(`.${styles.expanded}`, { width: 145, duration: 0.2, delay: 0.1 });
    gsap.to(`.${styles.expandedDetails}`, { opacity: 0, duration: 0.05 });
    gsap.to(`.${styles.facesWrapper}`, {
      opacity: 0,
      duration: 0.2,
      delay: 0.6,
      onComplete: () => {
        gsap.set(`.${styles.facesWrapper}`, { display: 'none' });
      }
    });
  };

  useGSAP(() => {
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
  }, []);

  return (
    <div className={styles.facesWrapper}>
      {orbits.map((orbit, index) => (
        <div
          key={index}
          className={styles.orbit}
          ref={(el) => (orbitRefs.current[index] = el)}
          style={{ width: `${orbit.size}px`, height: `${orbit.size}px` }}
        >
          <div
            className={styles.orbitItem}
            ref={(el) => (itemRefs.current[index] = el)}
          >
            <img
              src={orbit.img}
              className={styles.userImage}
              alt={`User ${index + 1}`}
            />
          </div>
        </div>
      ))}

      <div className={styles.orbit} style={{ width: '670px', height: '670px' }}>
        <div className={styles.expandedItemWrapper}>
          <div className={styles.expandedItem}>
            <div className={styles.expanded}>
              <div
                className={styles.borderGradientBottom}
                style={{
                  background: `radial-gradient(circle, #ffffff, transparent 10%)`,
                  animationDuration: '10s'
                }}
              ></div>
              <div
                className={styles.borderGradientTop}
                style={{
                  background: `radial-gradient(circle, #ffffff, transparent 10%)`,
                  animationDuration: '10s'
                }}
              ></div>
              <div className={styles.innerContent}>
                <img
                  className={styles.expandedImage}
                  src="Features/user1.webp"
                  alt="User face icon"
                />
                <div className={styles.expandedDetails}>
                  <p className={styles.expandedName}>Feliza Lemoine</p>
                  <p className={styles.expandedText}>Currently Listening</p>
                  <div className={styles.expandedPlayingWrapper}>
                    <div className={styles.expandedPlaying}></div>
                    <p className={styles.expandedPlayingTrack}>
                      BROTHER STONE
                    </p>
                    <p className={styles.expandedPlayingFeat}>Feat. Kodak Black</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
