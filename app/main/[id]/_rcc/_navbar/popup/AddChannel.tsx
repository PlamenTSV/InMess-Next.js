'use client';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import styles from './popup.module.css'

export default function AddChannel({ setShowPopup }: { setShowPopup: Dispatch<SetStateAction<boolean>>}){
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent){
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowPopup(false)
            }
        }
        
        window.addEventListener('mousedown', handleClickOutside)

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    return(
    <div className={styles.background}>
        <div className={styles.container} ref={containerRef}>
            <h2>CREATE YOUR CHANNEL</h2>
            <h3>CHOOSE AN ICON</h3>

            <input type="file" id="icon-input"/>
            <label htmlFor="icon-input"><img src="/camera.jpg" alt="channel icon" width={200} height={200}/></label>

            <div className={styles.enterInputs}>
            <input type="text" placeholder='Name of your channel...'/>
            <input type="button" value={'Create channel'} />
            </div>

            <div className={styles.seperator}>
                <div></div>
                <h3>OR</h3>
                <div></div>
            </div>
            <h2>JOIN VIA CODE</h2>
            <div className={styles.enterInputs}>
                <input type="text" placeholder='Code for channel...'/>
                <input type="button" value={'Enter channel'}/>
            </div>
        </div>
    </div>
    )
}