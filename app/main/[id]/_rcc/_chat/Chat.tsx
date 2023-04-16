'use client';
import { useEffect, useState } from 'react';

import styles from './chat.module.css';

import { useProvider } from '../../_context/UserContext';
import MessageContainer from './MessageContainer';
import { Message } from '@/utils/interfaces';
import pusherClient from '@/utils/pusherClient';
import pushNewMember from '@/utils/pushNewMember';

export default function Chat(){
    const { session, activeChannel } = useProvider();

    const [inputVal, setInputVal] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const [loadingMessages, setLoadingMessages] = useState(false);

    useEffect(() => {
        const channel = pusherClient.subscribe('channel-' + activeChannel.id);
        
        channel.bind('pusher:subscription_succeeded', () => {
            console.log('joined');
            pushNewMember('channel-' + activeChannel.id, 'client-member-joined', {data: 'test'});
        });
        
        channel.bind('client-member-joined', (data: any) => {
            console.log(data);
        })

        channel.bind('message', (data: Message) => {
            setMessages(curr => [...curr, data]);
        })

        loadMessages();

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            channel.disconnect();
        }
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
                senderUsername: session.username,
                senderIcon: session.icon,
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