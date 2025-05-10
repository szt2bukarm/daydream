import { useEffect } from 'react';
import gsap from 'gsap';
import styles from './specs.module.scss';

export default function Specs() {
    const handleMouseEnter = (e) => {
        gsap.to(e.target.querySelector(`.${styles.background}`), {
            top: '0', // Reset to original position when entering
            duration: 0.25,
        });
    };

    const handleMouseLeave = (e) => {
        const rect = e.target.getBoundingClientRect();
        const middle = rect.top + rect.height / 2;

        if (e.clientY < middle) {
            // Mouse leaves upwards
            gsap.to(e.target.querySelector(`.${styles.background}`), {
                top: '-100%', // Move to the top
                duration: 0.25,
            });
        } else {
            // Mouse leaves downwards
            gsap.to(e.target.querySelector(`.${styles.background}`), {
                top: '100%', // Move back down
                duration: 0.25,
            });
        }
    };

    useEffect(() => {
        const lines = document.querySelectorAll(`.${styles.line}`);
        lines.forEach((line) => {
            line.addEventListener('mouseenter', handleMouseEnter);
            line.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            lines.forEach((line) => {
                line.removeEventListener('mouseenter', handleMouseEnter);
                line.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <p className={styles.header}>Let's get technical</p>
            <div className={styles.specWrapper}>
                <div className={styles.line}>
                    <div className={styles.background}></div>
                    <p className={styles.spec}>Height</p>
                    <p className={styles.value}>66mm</p>
                </div>
                <div className={styles.line}>
                    <div className={styles.background}></div>
                    <p className={styles.spec}>Width</p>
                    <p className={styles.value}>130mm</p>
                </div>
                <div className={styles.line}>
                    <div className={styles.background}></div>
                    <p className={styles.spec}>Depth</p>
                    <p className={styles.value}>18mm</p>
                </div>
                <div className={styles.line}>
                    <div className={styles.background}></div>
                    <p className={styles.spec}>Weight</p>
                    <p className={styles.value}>213g</p>
                </div>
                <div className={styles.line}>
                    <div className={styles.background}></div>
                    <p className={styles.spec}>Display</p>
                    <p className={styles.value}>4.58" LCD<br></br>4.9" OLED (On future OLED model)</p>
                </div>
                <div className={styles.line}>
                    <div className={styles.background}></div>
                    <p className={styles.spec}>Firmware</p>
                    <p className={styles.value}>DaydreamOS</p>
                </div>
                <div className={styles.line}>
                    <div className={styles.background}></div>
                    <p className={styles.spec}>Battery</p>
                    <p className={styles.value}>2800mAh</p>
                </div>
                <div className={styles.line}>
                    <div className={styles.background}></div>
                    <p className={styles.spec}>Connectivity</p>
                    <p className={styles.value}>Bluetooth® 5.0<br></br>Wi-Fi 5<br></br>eSIM<br></br>1× USB-C<br></br>1× 3.5mm Audio Jack<br></br>1× 6.5mm Audio Jack (Select Models)</p>
                </div>
                <div className={styles.line}>
                    <div className={styles.background}></div>
                    <p className={styles.spec}>Box Contents</p>
                    <p className={styles.value}>Daydream Model 1 Player<br></br>Plastic Carry Case</p>
                </div>
            </div>
            <div className={styles.backgroundWrapper}>
                <img src="outline.webp" alt='DAYDREAM player outline' className={styles.backgroundImage} />
                <div className={styles.backgroundOutline}>
                    <div className={styles.backgroundInner}>
                        <div className={styles.blob}>   </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
