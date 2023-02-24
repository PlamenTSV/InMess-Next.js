'use client';

import Link from 'next/link';
import styles from './Register.module.css';
import Image from 'next/image';

import React, {useRef, useState} from 'react';

export default function Register(){
    const username = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const confimedPassword = useRef<HTMLInputElement>(null);

    const [errorMessage, setErrorMessage] = useState(false);

    function validateEmail(emailToValidate: string){
        return /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(emailToValidate);
    }

    return (
        <main className={styles.background}>
            <div className={styles.container}>
                <Image src={'/NewLogo.png'} alt='logo' width={110} height={110} className={styles.logo}></Image>
                <h1>Sign up</h1>
            
                <input type="text" placeholder='Username' ref={username}/>
                <input type="text" placeholder='Email' ref={email}/>
                <input type="password" placeholder='Password' ref={password}/>
                <input type="password" placeholder='Confirm Password' ref={confimedPassword}/>

                <input type="button" value={"Sign up"}
                onClick={async () => {
                    if(password.current?.value !== confimedPassword.current?.value){
                        setErrorMessage(true);
                        return;
                    }
                    if(!validateEmail(email.current?.value as string)){
                        setErrorMessage(true);
                        return;
                    }
                    setErrorMessage(false);

                    const registerReq = await fetch('/api/register', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: username.current?.value,
                            email: email.current?.value,
                            password: password.current?.value,
                        })
                    });
                    const registerRes = await registerReq.json();

                    console.log(registerRes.message);
                }}
                />
                {(errorMessage) ? 
                    <p className={styles.error}>Error</p>
                : <p className={styles.error}></p>}
                <p>Already have an account? <Link href={'/'} className={styles.link}>Sign in</Link></p>
            </div>
        </main>
    )
}