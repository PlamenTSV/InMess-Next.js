import { useEffect, useRef } from 'react';
import { handleClickOutside } from '@/utils/outsideClick';
import styles from './credentials.module.css';

export default function CredentialPopup({ setCredentialPopup }: any){
    const containerRef = useRef<HTMLDivElement>(null); 

    useEffect(() => {
        window.addEventListener('mousedown', event => handleClickOutside(event, containerRef, setCredentialPopup));
        return () => {
            window.removeEventListener('mousedown', () => handleClickOutside);
        }
    }, [])

    return (
        <div className={styles.background}>
            <div className={styles.popup} ref={containerRef}>
                <h1>
                    a
                </h1>
            </div>
        </div>
    )
}