'use client';
import { useState } from 'react';
import { useProvider } from '../../_context/UserContext';
import styles from './settings.module.css';
import PasswordPopup from './changePassword/PasswordPopup';

export default function SettingsBar() {
    const { session } = useProvider();
    const [passwordPopup, setPasswordPopup] = useState(false);

    return(
        <>  
            {passwordPopup? <PasswordPopup setPasswordPopup={setPasswordPopup}/> : ''}
            <div className={styles.settings}>
            <h2>Profile</h2>

            <div className={styles.credentials}>
                    <h3>Profile picture:</h3>
                    <div className={styles.pfp}>
                        <img src="/ProfileIcon.png" alt="pfp"/>
                        <div>
                            <img src="/edit.svg" alt="edit button" className={styles.editIcon}/>
                        </div>
                    </div>

                    <div className={styles.cred}>
                        <div>
                            <p>Username:</p>
                            <p  className={styles.credName}> { session?.username } </p>
                        </div>
                        <img src="/edit-white.svg" alt="edit button" />
                    </div>
                    <div className={styles.cred}>
                        <div>
                            <p>Email:</p>
                            <p  className={styles.credName}> { session?.email } </p>
                        </div>
                        <img src="/edit-white.svg" alt="edit button" />
                    </div>
            </div>

                <h3>Password and authentication</h3>
                <button className={styles.changePassword}
                onClick={() => {
                    setPasswordPopup(true);
                }}
                >Change password</button>

                <div className={styles.logout}
                onClick={async () => {
                    const logoutReq = await fetch('/api/logout');
                    if(logoutReq.ok) window.location.href = '/';
                }}>
                    <img src="/logout.svg" alt="logout-icon"/>
                    Log out
                </div>
            </div>
        </>
    )
}