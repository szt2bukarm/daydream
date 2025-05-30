import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Fullcard from "./FullCard";
import styles from "./fullcards.module.scss";
// import Logo3D from "../Logo3D/Logo3D";
// import Text3D from "../Text3D/Text3D";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: "🔒",
    image: "1",
    imageMobile: '1',
    header: "Private Mode",
    text: "Keep your listening sessions truly yours. With Private Mode, your activity stays off the grid—no tracking, no sharing, just you and your music.",
  },
  {
    icon: "✨",
    image: "2",
    imageMobile: '2',
    header: "Daydream Assistant",
    text: "A smart companion built for music lovers. Find songs, control playback, and discover new tracks with simple voice commands.",
  },
  {
    icon: "🛜",
    image: "3",
    imageMobile: '3Mobile',
    header: "eSIM Connectivity",
    text: "Always online, no Wi-Fi needed. Stream, share, and stay connected wherever you go with built-in eSIM support.",
  },
];

export default function FullCards() {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const overlayRef = useRef<HTMLDivElement[]>([]);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
  const pinTriggerInstance = useRef<ScrollTrigger | null>(null);
  const overlayTriggerInstance = useRef<ScrollTrigger | null>(null);
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;

    // Initial setup
    gsap.set(cardsRef.current, { y: "110vh", force3D: true });
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(`.${styles.text}`, { opacity: 0 });

    const setupPin = () =>
      ScrollTrigger.create({
        trigger: `.${styles.wrapper}`,
        start: "top top",
        end: "top+=3500 top",
        pin: true,
      });

    const setupOverlay = () => {
      const tl = gsap.timeline();
      tl.to(overlayRef.current[2], { opacity: 1 });

      return ScrollTrigger.create({
        trigger: `.${styles.wrapper}`,
        start: "top+=2000 top",
        end: "top+=2200 top",
        animation: tl,
        scrub: true,
      });
    };

    const setupTimeline = () => {
      const tl = gsap.timeline();

      // SCENE 1
      tl.to(`.${styles.text}`, { opacity: 1, duration: 0.1 }, 0)
        .to(cardsRef.current[0], { y: 0, duration: 0.333 }, 0)
        .to(`.${styles.text}`, { opacity: 0, duration: 0.1 })
        .to(cardsRef.current[0], {
          y: 100,
          x: 50,
          rotateX: 3,
          rotateY: 5,
          scale: 0.9,
          duration: 0.333,
          force3D: true,
        }, 0.333)
        .to(overlayRef.current[0], { opacity: 0.8, duration: 0.333 }, 0.333);

      // SCENE 2
      tl.to(cardsRef.current[1], { y: 0, duration: 0.333 }, 0.333)
        .to(cardsRef.current[1], {
          y: 100,
          x: -50,
          rotateX: 2,
          rotateY: -4,
          scale: 0.9,
          duration: 0.333,
          force3D: true,
        }, 0.666)
        .to(overlayRef.current[1], { opacity: 0.8, duration: 0.333 }, 0.666);

      // SCENE 3
      tl.to(cardsRef.current[2], { y: 0, duration: 0.333 }, 0.666)
        .to(cardsRef.current[2], { y: 0, duration: 0.333 }, 0.999);

      return ScrollTrigger.create({
        trigger: `.${styles.wrapper}`,
        start: "top-=500 top",
        end: "top+=2000 top",
        scrub: true,
        animation: tl,
      });
    };

    overlayTriggerInstance.current = setupOverlay();
    pinTriggerInstance.current = setupPin();
    scrollTriggerInstance.current = setupTimeline();

    // Resize handling
    let lastWidth = window.innerWidth;

    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;

      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);

      resizeTimeout.current = setTimeout(() => {
        overlayTriggerInstance.current?.refresh();
        pinTriggerInstance.current?.refresh();
        scrollTriggerInstance.current?.refresh();
        ScrollTrigger.refresh();
      }, 300);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      scrollTriggerInstance.current?.kill();
      pinTriggerInstance.current?.kill();
      overlayTriggerInstance.current?.kill();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>And that's not all</p>
      <div className={styles.cards}>
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el!)}
            className={styles.card}
            style={{
              willChange: "transform",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            <Fullcard {...card} />
            <div
              ref={(el) => (overlayRef.current[index] = el!)}
              className={styles.overlay}
              style={{
                background:
                  index === cards.length - 1
                    ? "linear-gradient(to bottom, #fff,#EE4137)"
                    : "#000",
                willChange: "opacity",
              }}
            />
          </div>
        ))}
      </div>
      {/* <Logo3D /> */}
    </div>
  );
}
