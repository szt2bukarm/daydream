import styles from './floatingcards.module.scss';
import Card from './Card/Card';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import GradientWave from '../GradientWave/GradientWave';
import ScrollVelocity from '../ScrollText/ScrollText';
import { useStore } from '@/useStore';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { icon: "🔗", header: "Connect Instantly", text: "Music should bring people together. With Daydream, your music connects with others.", image: "link" },
  { icon: "🎭", header: "Build Your Music Identity", text: "Your taste defines you. Create a personal profile that evolves with every song you play, shaping a unique musical fingerprint.", image: "fingerprint" },
  { icon: "📡", header: "Listen Together, Anywhere", text: "Stay in sync. Play a track, and your friends hear it with you—live, wherever they are.", image: "note" },
  { icon: "💡", header: "Discover Through Your Circle", text: "New music finds you. Get fresh daily recommendations based on what your friends are loving.", image: "spiral" }
];

export default function FloatingCards() {
  const cardsRef = useRef([]);
  const scrollTriggerInstance = useRef(null);
  const timelineInstance = useRef(null);
  const overlayTriggerInstance = useRef(null);
  const resizeTimeout = useRef(null);
  const smallerScreenRef = useRef(window.innerWidth <= 1024);
  const { isMobile } = useStore();

  const createTimeline = () => {
    const calculateX = () => {
      if (window.innerWidth > 1324) return ["3vw", "25vw", "47vw", "63vw"];
      if (window.innerWidth > 1024) return ["2.5vw", "20vw", "42vw", "58vw"];
      return ["10%", "10%", "10%", "10%"];
    };

    const xValues = calculateX();
    const timeline = gsap.timeline();

    const trigger = ScrollTrigger.create({
      trigger: `.${styles.wrapper}`,
      start: "top top",
      end: "bottom-=1000 top",
      scrub: true,
      animation: timeline,
    });

    cardsRef.current.forEach((card, index) => {
      timeline.to(card, {
        x: xValues[index],
        rotate: index % 2 === 0 ? -3 : 3,
        duration: smallerScreenRef.current ? 0.05 : 0.15,
        ease: 'power1.out',
      }, index * 0.05);
    });

    if (smallerScreenRef.current) {
      cardsRef.current.forEach((card, index) => {
        timeline.to(card, {
          // x: xValues[index],
          y: 100,
          rotate: index % 2 === 0 ? -3 : 3,
          duration: smallerScreenRef.current ? 0.05 : 0.1,
          ease: 'power1.out',
        }, index * 0.05);
      });
    }

    return trigger;
  };

  const setupCardPositions = () => {
    const cardPositions = smallerScreenRef.current
      ? [
          { y: '150vh',x:"10%", rotate: 20 },
          { y: '150vh',x:"10%", rotate: -20 },
          { y: '150vh',x:"10%", rotate: 10 },
          { y: '150vh',x:"10%", rotate: -10 }
        ]
      : [
          { x: "150vw", y: 110, rotate: 15 },
          { x: "150vw", y: 40, rotate: -15 },
          { x: "150vw", y: 35, rotate: 20 },
          { x: "150vw", y: 120, rotate: -15 }
        ];

    cardsRef.current.forEach((card, index) => {
      gsap.set(card, cardPositions[index]);
    });
  };

  const setupOverlay = () => {
    const tl = gsap.timeline();
    tl.to(`.${styles.overlay}`, {
      opacity: 0.5,
      ease: "none"
    });

    return ScrollTrigger.create({
      trigger: `.${styles.wrapper}`,
      start: 'bottom-=1000 0%',
      end: 'bottom 0%',
      animation: tl,
      scrub: true,
    });
  };

  const setupWrapperTrigger = () => {
    return ScrollTrigger.create({
      trigger: `.${styles.wrapper}`,
      start: 'top 0%',
      end: 'bottom 0%',
      onEnter: () => {
        gsap.to([`.${styles.fixed}`, cardsRef.current], {
          position: 'fixed',
          top: 0,
          force3D: true
        });
      },
      onLeave: () => {
        gsap.to([`.${styles.fixed}`, cardsRef.current], {
          position: 'absolute',
          top: 0,
          force3D: true
        });
      },
      onEnterBack: () => {
        gsap.to([`.${styles.fixed}`, cardsRef.current], {
          position: 'fixed',
          top: 0,
          force3D: true
        });
      },
      onLeaveBack: () => {
        gsap.to([`.${styles.fixed}`, cardsRef.current], {
          position: 'absolute',
          top: 0,
          force3D: true
        });
      },
    });
  };

  useGSAP(() => {
    if (typeof window === 'undefined') return;

    const setup = () => {
      setupCardPositions();
      timelineInstance.current = createTimeline();
      scrollTriggerInstance.current = setupWrapperTrigger();
      overlayTriggerInstance.current = setupOverlay();
    };

    setup();

    let lastWidth = window.innerWidth;

    const handleResize = () => {
      if (lastWidth === window.innerWidth) return;

      lastWidth = window.innerWidth;
      smallerScreenRef.current = window.innerWidth <= 1024;

      clearTimeout(resizeTimeout.current);

      resizeTimeout.current = setTimeout(() => {
        if (timelineInstance.current) timelineInstance.current.kill();
        if (scrollTriggerInstance.current) scrollTriggerInstance.current.kill();
        if (overlayTriggerInstance.current) overlayTriggerInstance.current.kill();

        setup();

        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timelineInstance.current) timelineInstance.current.kill();
      if (scrollTriggerInstance.current) scrollTriggerInstance.current.kill();
      if (overlayTriggerInstance.current) overlayTriggerInstance.current.kill();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.fixed}>
        <GradientWave />
        {!isMobile && 
          <ScrollVelocity texts={["SHARE CONNECT DISCOVER"]} className='scrollText' velocity={300} />
        }
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            style={{
              position: "absolute",
              top: 0,
              zIndex: 2,
              willChange: 'transform',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            <Card
              icon={card.icon}
              header={card.header}
              text={card.text}
              image={card.image}
              style={index % 2 === 0 ? "dark" : "light"}
            />
          </div>
        ))}
      </div>
      <div className={styles.overlay}></div>
    </div>
  );
}
