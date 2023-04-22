import { useEffect, useRef, useState } from 'react';
import { handleClickOutside } from '@/utils/outsideClick';
import styles from './credentials.module.css';
import { capitalizeString } from '@/utils/capitalizeString';
import { useProvider } from '../../../_context/UserContext';

export default function CredentialPopup({ setCredentialPopup, userID, credential }: any){
    const { session, setSession } = useProvider();
    const containerRef = useRef<HTMLDivElement>(null);
    
    const newCredential = useRef<HTMLInputElement>(null);
    const currentPassword = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState(['', '']);
    const [isRequesting, setIsRequesting] = useState<Boolean>(false);

    useEffect(() => {
        window.addEventListener('mousedown', event => handleClickOutside(event, containerRef, setCredentialPopup));
        return () => {
            window.removeEventListener('mousedown', () => handleClickOutside);
        }
    }, [])

    async function updateCredential(){
        setErrors(['', ''])

        if(!newCredential.current?.value || newCredential.current.value.length === 0){
            setErrors(errors.map((e, index) => index === 0 ? `- New ${credential} cannot be empty` : ''));
            return;
        }

        setIsRequesting(true);

        const updateReq = await fetch(`/api/account/update${capitalizeString(credential)}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                userID: userID,
                newCredential: newCredential.current?.value,
                password: currentPassword.current?.value
            })
        });

        setIsRequesting(false);

        if(!updateReq.ok){
            setErrors(errors.map((e, index) => index === 1 ? `- Wrong password` : ''));
            return;
        }

        const updateRes = await updateReq.json();
        console.log(updateRes);
        setCredentialPopup(false);

        credential === 'username' ? 
            setSession({
                ...session!,
                username: newCredential.current.value
            })
            :
            setSession({
                ...session!,
                email: newCredential.current.value
            })
    }

    return (
        <div className={styles.background}>
            <div className={styles.popup} ref={containerRef}>
                <h2>Update your {credential}</h2>
                <p>Enter your new {credential} and your current password</p>

                <div>
                    <p>New {credential}</p>
                    <input type="text" name="cred" id="cred" ref={newCredential}/>
                </div>

                <div>
                    <p>Current password</p>
                    <input type="password" name="pass" id="pass" ref={currentPassword}/>
                </div>

                <button
                    onClick={() => updateCredential()}
                >C H A N G E {isRequesting? <img src='/loader-white.svg' alt='loader' className={styles.loading}/> : ''}</button>

                
            </div>
        </div>
    )
}