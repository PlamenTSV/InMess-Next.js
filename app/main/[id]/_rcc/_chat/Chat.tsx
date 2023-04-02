'use client';
import { useEffect, useState } from 'react';
import { useProvider } from '../../_context/UserContext';
import styles from './chat.module.css';

import MessageContainer from './MessageContainer';

export interface Messages {
    id: string,
    senderUsername: string,
    senderIcon: string,
    sentAt: Date,
    content: string
}

export default function Chat(){
    const { session, activeChannel } = useProvider();

    const [inputVal, setInputVal] = useState('');
    const [messages, setMessages] = useState<Messages[]>([]);

    const [loadingMessages, setLoadingMessages] = useState(false);

    useEffect(() => {
        loadMessages();
    }, [])

    async function loadMessages(){
        setLoadingMessages(true);
        const messagesReq = await fetch(`/api/messages/load?channel=${activeChannel.id}`);
        const messagesRes = await messagesReq.json();

        if(!messagesReq.ok){
            console.log(messagesRes.message);
            return;
        }

        setMessages(messagesRes);
        setLoadingMessages(false);
    }

    async function sendMessage(message: string){
        const messageReq = await fetch('/api/messages/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                senderID: session.id,
                channelID: activeChannel.id,
                sentAt: new Date(),
                content: message
            })
        })
        const messageRes = await messageReq.json();

        if(!messageReq.ok){
            console.log(messageRes.message);
            return;
        }

        setMessages(curr => [...curr, {
            id: messageRes.id,
            senderUsername: messageRes.senderUsername,
            senderIcon: messageRes.senderIcon,
            sentAt: messageRes.sentAt,
            content: message
        }]);
    }

    return(
        <div className={styles.chat}>
            <div className={styles.chatBox}>
                {loadingMessages? <div className={styles.loading}><img src="/loader.svg" alt="loader" /></div>  
                    : messages.map((message, idx) => {
                    return <MessageContainer key={idx} message={message} setMessages={setMessages}/>
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
                        sendMessage(inputVal);
                        setInputVal('');
                    }
                    if(event.key === 'Delete')setMessages([]);
                }}
                />
            </div>
        </div>
    )
}