'use client';
import { useProvider } from '../../_context/UserContext';
import styles from './home.module.css';

export default function HomePage(){
    const { session } = useProvider();

    return (
        <div className={styles.homepage}>
            <div className={styles.header}>
                <img src="aa" alt="pfp" />
                <h1>Welcome {session?.username}!</h1>
            </div>
        </div>
    )
}