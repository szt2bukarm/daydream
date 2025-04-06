import { useEffect, useRef } from "react";
import SplitType from "split-type";
import styles from './features.module.scss'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Showcase from "./Showcase/Showcase";
import FlipInSequence from "./Showcase/FlipInSequence/FlipInSequence";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useLenis } from "@studio-freight/react-lenis";
import ShowcaseAlbums from "./Showcase/ShowcaseAlbums/ShowcaseAlbums";
import ShowcaseSocial from "./Showcase/ShowcaseSocial/ShowcaseSocial";
import ShowcaseText from "./Showcase/ShowcaseText";
import Faces from "./Showcase/ShowcaseSocial/Faces";
import ShowcasePorts from "./Showcase/ShowcasePorts/ShowcasePorts";
gsap.registerPlugin(ScrollTrigger);

export default function Features() {
    const wrapperRef = useRef(null);


    useGSAP(() => {
        gsap.to(`.${styles.wrapper}`, {
            scrollTrigger: {
                trigger: `.${styles.wrapper}`,
                start: 'top 0%',
                end: 'top+=500 0%',
                markers: true,
                pin: true
            }
        })
    },[])


    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <ShowcaseText />
            <FlipInSequence />
            <ShowcaseAlbums />
            <Faces />
            <ShowcaseSocial />
            <ShowcasePorts />
        </div>
    )
}