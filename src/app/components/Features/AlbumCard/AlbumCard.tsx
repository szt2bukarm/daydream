import { useState, useEffect, useRef } from 'react';
import styles from './albumcard.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function AlbumCard({image,title,index}:{image:string,title:string,index:number}) {
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
            backgroundImage: `linear-gradient(185deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.70) 100%), url(Features/Albums/${image}.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center"            
        }}
        onMouseMove={tiltHandler} onMouseLeave={onLeave}>
            <div className={styles.inner}>
                {index == 0 && 
                    <div className={styles.users} ref={usersRef}>
                      <div className={styles.user}>
                          <img src="Features/user1.webp" className={styles.userImage}/>
                      </div>
                      <div className={styles.user}>
                          <img src="Features/user4.webp" className={styles.userImage}/>
                      </div>
                      <div className={`${styles.user} ${styles.orange}`}>
                          <img src="Features/user2.svg" className={styles.userSVG}/>
                      </div>
                  </div>}
                {index == 1 && 
                    <div className={styles.users} ref={usersRef}>
                      <div className={styles.user}>
                          <img src="Features/user4.webp" className={styles.userImage}/>
                      </div>
                      <div className={`${styles.user} ${styles.purple}`}>
                          <img src="Features/user3.svg" className={styles.userSVG}/>
                      </div>
                      <div className={styles.user}>
                          <img src="Features/user1.webp" className={styles.userImage}/>
                      </div>
                      <div className={`${styles.user} ${styles.orange}`}>
                          <img src="Features/user2.svg" className={styles.userSVG}/>
                      </div>
                      <div className={`${styles.user} ${styles.orange}`}>
                          <p className={styles.userInitials}>LA</p>
                      </div>
                  </div>}
                {index == 2 && 
                    <div className={styles.users} ref={usersRef}>
                      <div className={`${styles.user} ${styles.dark}`}>
                      <img src="Features/user5.webp" className={styles.userImage}/>
                      </div>
                      <div className={`${styles.user} ${styles.pink}`}>
                          <p className={styles.userInitials}>SM</p>
                      </div>
                      <div className={`${styles.user} ${styles.purple}`}>
                          <img src="Features/user3.svg" className={styles.userSVG}/>
                      </div>
                      <div className={`${styles.user} ${styles.blue}`}>
                          <p className={styles.userInitials}>SP</p>
                      </div>
                    </div>}
                {index == 3 && 
                    <div className={styles.users} ref={usersRef}>
                      <div className={`${styles.user} ${styles.dark}`}>
                        <img src="Features/user6.webp" className={styles.userImage}/>
                      </div>
                      <div className={`${styles.user} ${styles.pink}`}>
                          <p className={styles.userInitials}>BA</p>
                      </div>             
                    </div>}
                {index == 4 && 
                    <div className={styles.users} ref={usersRef}>
                  <div className={`${styles.user} ${styles.dark}`}>
                        <img src="Features/user6.webp" className={styles.userImage}/>
                      </div>
                      <div className={`${styles.user} ${styles.blue}`}>
                          <p className={styles.userInitials}>PT</p>
                      </div>  
                      <div className={`${styles.user} ${styles.dark}`}>
                          <p className={styles.userInitials}>GR</p>
                      </div>  
                      <div className={`${styles.user} ${styles.orange}`}>
                          <p className={styles.userInitials}>SJ</p>
                      </div>
                      <div className={`${styles.user} ${styles.dark}`}>
                        <img src="Features/user1.webp" className={styles.userImage}/>
                      </div>
                      <div className={`${styles.user} ${styles.orange}`}>
                        <img src="Features/user3.svg" className={styles.userSVG}/>
                      </div>
                      <div className={`${styles.user} ${styles.white}`}>
                          <p className={styles.userInitials}>+4</p>
                      </div>
                  </div>}
                  {index == 5 && 
                    <div className={styles.users} ref={usersRef}>
                      <div className={`${styles.user} ${styles.orange}`}>
                          <img src="Features/user2.svg" className={styles.userSVG}/>
                      </div>
                      <div className={`${styles.user} ${styles.white}`}>
                          <p className={styles.userInitials}>AM</p>
                      </div>
                      <div className={`${styles.user} ${styles.pink}`}>
                          <img src="Features/user6.webp" className={styles.userImage}/>
                      </div>
                      <div className={`${styles.user} ${styles.purple}`}>
                          <p className={styles.userInitials}>KT</p>
                      </div>
                    </div>}

                {index == 6 && 
                    <div className={styles.users} ref={usersRef}>
                      <div className={`${styles.user} ${styles.blue}`}>
                          <p className={styles.userInitials}>DZ</p>
                      </div>
                      <div className={`${styles.user} ${styles.dark}`}>
                          <img src="Features/user5.webp" className={styles.userImage}/>
                      </div>
                      <div className={`${styles.user} ${styles.orange}`}>
                          <img src="Features/user1.webp" className={styles.userImage}/>
                      </div>
                      <div className={`${styles.user} ${styles.orange}`}>
                          <img src="Features/user3.svg" className={styles.userSVG}/>
                      </div>
                    </div>}

                {index == 7 && 
                    <div className={styles.users} ref={usersRef}>
                      <div className={`${styles.user} ${styles.dark}`}>
                          <p className={styles.userInitials}>MC</p>
                      </div>
                      <div className={`${styles.user} ${styles.orange}`}>
                          <img src="Features/user6.webp" className={styles.userImage}/>
                      </div>
                    </div>}

                {index == 8 && 
                    <div className={styles.users} ref={usersRef}>
                      <div className={`${styles.user} ${styles.pink}`}>
                          <p className={styles.userInitials}>XA</p>
                      </div>
                      <div className={`${styles.user} ${styles.orange}`}>
                          <img src="Features/user2.svg" className={styles.userSVG}/>
                      </div>
                      <div className={`${styles.user} ${styles.dark}`}>
                          <img src="Features/user5.webp" className={styles.userImage}/>
                      </div>
                    </div>}
                <p className={styles.title} ref={titleRef}>{title}</p>
            </div>
        </div>
    );
}
