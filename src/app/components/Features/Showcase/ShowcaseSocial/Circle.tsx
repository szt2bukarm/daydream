import styles from './showcasesocial.module.scss'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react';

export default function Circle({width,height,index,mobile}:{width:number,height:number,index:number,mobile?:boolean}) {
    const ref = useRef(null);
    
    useGSAP(() => {
        gsap.to(ref.current, {
            opacity: 0.1,
            duration: 1,
            repeat: -1,
            yoyo: true,
            delay: index * 0.5,
        })
    },[])


    return <div ref={ref} className={styles.circle} style={{ width: `${width}px`, height: `${mobile ? height : height+40}px`}}></div>
}