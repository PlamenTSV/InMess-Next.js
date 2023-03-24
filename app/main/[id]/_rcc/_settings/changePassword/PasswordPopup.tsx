import { useEffect, useRef, useState } from 'react';
import styles from './password.module.css';

export default function PasswordPopup( { setPasswordPopup }: any){
    const containerRef = useRef<HTMLDivElement>(null);

    const oldPassword = useRef<HTMLInputElement>(null);
    const newPassword = useRef<HTMLInputElement>(null);
    const confirmNewPassword = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState([
        '',
        '',
        ''
    ]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent){
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setPasswordPopup(false);
            }
        }
        
        window.addEventListener('mousedown', handleClickOutside)

        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    async function updatePassword(){
        setErrors(['', '', '']);
    
        if(!newPassword.current?.value || newPassword.current.value.length === 0){
            setErrors(errors.map((err, index) => (index === 1)? '- New password cannot be empty' : err));
        }
        if(newPassword.current?.value !== confirmNewPassword.current?.value){
            setErrors(errors.map((err, index) => (index === 2)? '- Passwords don\'t match' : err));
        } else {
            const updateReq = await fetch('/api/account/updatePassword', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    newPassword: newPassword.current?.value,
                    oldPassword: oldPassword.current?.value
                })
            });
            if(!updateReq.ok){
                return;
            }
            const updateRes = await updateReq.json();
            console.log(updateRes);
        }
    }

    return (
        <div className={styles.background}>
            <div className={styles.popup} ref={containerRef}>
                <h2>Update your password</h2>
                <p>Enter your new and old passwords</p>

                <div>
                    <p>Current password</p>
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
                >Change</button>
            </div>
        </div>
    )
}