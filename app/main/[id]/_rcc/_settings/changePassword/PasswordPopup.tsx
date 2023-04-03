import { useEffect, useRef, useState } from 'react';
import { handleClickOutside } from '@/utils/outsideClick';
import styles from './password.module.css';

export default function PasswordPopup( { setPasswordPopup, userID }: any){
    const containerRef = useRef<HTMLDivElement>(null);

    const oldPassword = useRef<HTMLInputElement>(null);
    const newPassword = useRef<HTMLInputElement>(null);
    const confirmNewPassword = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<string[]>(['', '', '']);
    const [isRequesting, setIsRequesting] = useState<Boolean>(false);

    useEffect(() => {
        window.addEventListener('mousedown', event => handleClickOutside(event, containerRef, setPasswordPopup))

        return () => {
            window.removeEventListener('mousedown', () => handleClickOutside);
        }
    }, [])

    async function updatePassword(){
        setErrors(['', '', '']);

        if(!newPassword.current?.value || newPassword.current.value.length === 0){
            setErrors(errors.map((err, index) => (index === 1)? '- Field cannot be empty' : ''));
            return;
        }
        if(newPassword.current?.value !== confirmNewPassword.current?.value){
            setErrors(errors.map((err, index) => (index === 2)? '- Passwords don\'t match' : ''));
            return;
        }

        setIsRequesting(true);

        const updateReq = await fetch('/api/account/updatePassword', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                userID: userID,
                newPassword: newPassword.current?.value,
                oldPassword: oldPassword.current?.value
            })
        });

        setIsRequesting(false);

        if(!updateReq.ok){
            setErrors(errors.map((err, index) => (index === 0)? '- Wrong password' : ''));
            return;
        }
        
        setPasswordPopup(false);
    }

    return (
        <div className={styles.background}>
            <div className={styles.popup} ref={containerRef}>
                <h2>Update your password</h2>
                <p>Enter your new and old passwords</p>

                <div>
                    <p>Current password <span style={{color: 'red'}}>{errors[0]}</span></p>
                    <input type="password" ref={oldPassword}/>
                </div>
                <div>
                    <p>New password <span style={{color: 'red'}}>{errors[1]}</span></p>
                    <input type="password" ref={newPassword}/>
                </div>
                <div>
                    <p>Confirm new password <span style={{color: 'red'}}>{errors[2]}</span></p>
                    <input type="password" ref={confirmNewPassword}/>
                </div>

                <button
                onClick={() => updatePassword()}
                >C H A N G E {isRequesting? <img src='/loader-white.svg' alt='loader' className={styles.loading}/> : ''}</button>
            </div>
        </div>
    )
}