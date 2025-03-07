import { useState, useEffect } from 'react';
import styles from './albumcard.module.scss';

const userImages = [
    { src: 'Features/Albums/user1.png', className: styles.userImage },
    { src: 'Features/Albums/user2.svg', className: styles.userSVG, extraClass: styles.orange },
    { src: 'Features/Albums/user3.svg', className: styles.userSVG, extraClass: styles.pink },
    { src: 'Features/Albums/user4.png', className: styles.userImage }
];

const generateRandomInitials = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return `${letters[Math.floor(Math.random() * letters.length)]}${letters[Math.floor(Math.random() * letters.length)]}`;
};

export default function AlbumCard({image,title}:{image:string,title:string}) {
    const [shuffledUsers, setShuffledUsers] = useState([]);

    useEffect(() => {
        let numberOfUsers = Math.floor(Math.random() * 5) + 2;
        let users = [...userImages];

        while (users.length < numberOfUsers) {
            users.push({ type: 'initials', text: generateRandomInitials(), extraClass: styles.blue });
        }

        const shuffled = users.sort(() => 0.5 - Math.random()).slice(0, numberOfUsers);

        if (shuffled.length === 7) {
            shuffled[6] = { type: 'initials', text: '+1', extraClass: styles.white };
        }

        setShuffledUsers(shuffled);
    }, []);

    return (
        <div className={styles.wrapper} style={{
            backgroundImage: `linear-gradient(185deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.70) 100%), url(Features/Albums/${image}.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center"            
        }}>
            <div className={styles.users}>
                {shuffledUsers.map((user, index) => (
                    <div key={index} className={`${styles.user} ${user.extraClass || ''}`}>
                        {user.src && <img src={user.src} className={user.className} />}
                        {user.text && <p className={styles.userInitials}>{user.text}</p>}
                    </div>
                ))}
            </div>
            <p className={styles.title}>{title}</p>
        </div>
    );
}
