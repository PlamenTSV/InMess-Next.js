'use client';
import { useState } from 'react';
import styles from './chat.module.css';

export default function Chat(){
    const [inputVal, setInputVal] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    return(
        <div className={styles.chat}>
            <div className={styles.chatBox}>
                {messages.map((message, idx) => {
                    return <div key={idx} className={styles.message}>{message}</div>
                })}
            </div>
            <div className={styles.inputs}>
                <div style={{width: '50px', height: '50px'}}>

                </div>
                <input type="text" placeholder='Type a message.....'
                value={inputVal}
                onChange={(event) => setInputVal(event.target.value)}
                onKeyDown={(event) => {
                    if(event.key === 'Enter' && inputVal.trim() !== ''){
                        setMessages(curr => [...curr, inputVal]);
                        setInputVal('');
                    }
                    if(event.key === 'Delete')setMessages([]);
                }}
                />
            </div>
        </div>
    )
}