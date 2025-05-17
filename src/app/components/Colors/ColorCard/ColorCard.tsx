import { useState } from 'react'
import styles from './colorcard.module.scss'

export default function ColorCard({text,colors,name,image}: {text:string[],colors:string[],name:string,image:string}) {
    const [width,setWidth] = useState(window.innerWidth);

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                {width <= 724 && (
                <>
                <div className={styles.colorWrapper}>
                        {colors.map((color,index) => (
                            <div key={index} className={styles.colorCircle} style={{backgroundColor: color,marginRight: index == colors.length - 1 ? 0 : -40}}></div>
                        ))}
                        <p className={styles.colorText}>{name}</p>
                </div>
                <div className={styles.text}>
                    {text.map((item,index) => (
                        <p className={styles.text} key={index}>{item}</p>
                    ))}
                </div>
                </>
                )}
                {width > 724 && (
                <>
                <div className={styles.text}>
                    {text.map((item,index) => (
                        <p className={styles.text} key={index}>{item}</p>
                    ))}
                </div>
                <div className={styles.colorWrapper}>
                    <p className={styles.colorText}>{name}</p>
                        {colors.map((color,index) => (
                            <div key={index} className={styles.colorCircle} style={{backgroundColor: color,marginRight: index == colors.length - 1 ? 0 : -40}}></div>
                        ))}
                </div>
                </>
                )}
            </div>
            <img src={`Colors/${image}.webp`} alt={name} className={styles.image} />
        </div>
    )
}