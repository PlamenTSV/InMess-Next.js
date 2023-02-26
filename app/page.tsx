'use client';

import Link from 'next/link';
import styles from './Login.module.css';
import Image from 'next/image';

import React, { useState, useRef } from 'react';

export default function LoginPage() {
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState();

  return (
    <main className={styles.background}>
      <div className={styles.container}>
        <Image src={'/NewLogo.png'} alt='logo' width={110} height={110} className={styles.logo}></Image>
        <h1>Login</h1>
        
        <input type="text" placeholder='Username' ref={username}/>
        <input type="password" placeholder='Password' ref={password}/>

        <input type="button" value={"Login"}
        onClick={async (event) => {
          event.preventDefault();

          const loginReq = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              username: username.current?.value,
              password: password.current?.value
            })
          })

          const loginRes = await loginReq.json();
          if(!loginReq.ok)setErrorMessage(loginRes.message);
          else {
            console.log(loginRes.message);
            window.location.href = '/main/home';
          }
          
        }}
        />

        {(errorMessage) ? 
                  <p className={styles.error}>{errorMessage}</p>
                : <p className={styles.error}></p>}
        <p>Don't have an account? <Link href={'/register'} className={styles.link}>Sign up</Link></p>
      </div>
    </main>
  )
}


