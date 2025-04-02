import { useState, useEffect, useRef } from 'react';
import styles from './albumcard.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function AlbumCard({image,title}:{image:string,title:string}) {
    const usersRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    const tiltHandler = (e: any) => {
        const wrapper = e.currentTarget.getBoundingClientRect();
  
        const x = (e.clientX - (wrapper.left + wrapper.width / 2)) / 8;
        const y = (e.clientY - (wrapper.top + wrapper.height / 2)) / 8;
  
        gsap.to(e.target, {
          rotateX: -y/1.2,
          rotateY: x/1.2,
          transformPerspective: 1000,
          scale: 1.02,
          zIndex: 10,
          duration: 0.2
        });
        gsap.to(e.target, {
          css: {
            filter: `drop-shadow(${-x / 1}px ${-y / 1}px 2rem rgba(0,0,0,0.7))`,
          },
        });
        gsap.to([usersRef.current, titleRef.current], {
          rotateX: -y,
          rotateY: x,
          scale: 1.05,
          duration: 0.2,
          filter: `drop-shadow(${-x / 2}px ${-y / 2}px 10px rgba(0,0,0,0.9)`,
        });
      };
  
      const onLeave = (e: any) => {
        gsap.to(e.target, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          zIndex: 1
        });
        gsap.to(e.target, {
          css: {
            filter: `drop-shadow(0px 0px 2rem rgba(0,0,0,0.05))`,
          },
        });
        gsap.to([usersRef.current, titleRef.current], {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            filter: `drop-shadow(0px 0px 2rem rgba(0,0,0,0.05))`,
        });
      };
  
    return (
        <div className={styles.wrapper} style={{
            backgroundImage: `linear-gradient(185deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.70) 100%), url(Features/Albums/${image}.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center"            
        }}
        onMouseMove={tiltHandler} onMouseLeave={onLeave}>
            <div className={styles.inner}>
                <div className={styles.users} ref={usersRef}>
                    <div className={styles.user}>
                        <img src="Features/user1.png" className={styles.userImage}/>
                    </div>
                    <div className={styles.user}>
                        <img src="Features/user4.png" className={styles.userImage}/>
                    </div>
                    <div className={`${styles.user} ${styles.orange}`}>
                        <img src="Features/user2.svg" className={styles.userSVG}/>
                    </div>
                </div>
                <p className={styles.title} ref={titleRef}>{title}</p>
            </div>
        </div>
    );
}
