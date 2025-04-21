import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import SplitType from "split-type";
import gsap from "gsap";
import styles from './text3d.module.scss'
import fullcardStyles from '../Cards/fullcards.module.scss'
import renderStyles from '../Logo3D/logo3d.module.scss'

export default function Text3D() {
    const splitRef = useRef<SplitType | null>(null);
    const textInstance = useRef<ScrollTrigger | null>(null);
    const textRef = useRef(null);
    const [mounted,setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    const split = new SplitType(textRef.current, { types: 'words' });
  
    split.lines?.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });
  
    splitRef.current = split;
  
    gsap.set(split.words, { opacity: 0 });
  },[])

  const textTrigger = () => {
    const tl = gsap.timeline();
    tl.to(splitRef.current.words, {
      opacity: 1,
      duration: 0.15,
      stagger: 0.08
    }, 3.2)
    .to(splitRef.current.words, {
      opacity: 0,
      duration: 0,
    }, 10)


    const trigger = ScrollTrigger.create({
      trigger: `.${fullcardStyles.wrapper}`,
      start: "top top",
      end: "top+=6000 top",
      scrub: true,
    //   pin: true,
    //   markers: true,
      animation: tl,
    });
    return trigger;
  }

  useEffect(() => {
    if (!mounted) return;
    textTrigger();
  },[mounted])

//   useEffect(() => {
//     if (typeof window === 'undefined') return;
//     textTrigger();

//     let lastWidth = window.innerWidth;
//     const handleResize = () => {
//       if (lastWidth === window.innerWidth) return;
//       lastWidth = window.innerWidth;
//       // clearTimeout(resizeTimeout!);
//       // resizeTimeout = setTimeout(() => {
//         // scrollTriggerInstance.current?.refresh();  
//         textInstance.current?.refresh();
//       // }, 200);
//     };

//     // window.addEventListener('resize', handleResize);
//     return () => {
//     //   window.removeEventListener('resize', handleResize);
//     }
//   },[]);
    return (
        <div className={styles.wrapper} ref={textRef}>
            {/* <div className={styles.textWrapper} > */}
                <p className={styles.text} >DAYDREAM IS BUILT TO BE AS BOLD, VIBRANT, AND DYNAMIC AS THE PEOPLE WHO USE IT.</p>
                <p className={styles.text}>IT’S A DEVICE THAT FEELS PERSONAL FROM THE MOMENT YOU PICK IT UP.</p>
            {/* </div> */}
        </div>
    )
}