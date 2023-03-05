'use client';
import { useProvider } from '../../_context/UserContext';
import styles from './home.module.css';

export default function HomePage(){
    const { session } = useProvider();

    return (
        <div className={styles.homepage}>
            <div className={styles.header}>
                <img src='/ProfileIcon.png' alt='pfp' className={styles.pfp}/>
                <div>
                    <h1>Welcome!</h1>
                    <h1>{session?.username}</h1>
                </div>
            </div>
            <h2>Here are some quick tips to get you started!</h2>
            <div className={styles.tips}>
                <div>
                    Click the "+" icon on the left-side navbar to either join or create your own channel.
                    <img src="/tip2.svg" alt="talking icon" />
                </div>
                <div>
                    That's it! Invite your friends by copying the code of the channel and enjoy yourselves.
                    <img src="/tip1.svg" alt="talking icon" />
                </div>
            </div>
        </div>
    )
}