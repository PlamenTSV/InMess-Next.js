import styles from './chat.module.css';

import Image from 'next/image';

import { Dispatch, SetStateAction } from 'react';
import formatDate from '@/utils/formatDate';
import { Message } from '@/utils/interfaces';

export default function MessageContainer({ message, setMessages }: {message: Message, setMessages: Dispatch<SetStateAction<Message[]>>}){
    
    async function deleteMessage(id: string){
        const deleteReq = await fetch(`/api/messages/delete?messageID=${id}`, {
            method: 'DELETE'
        })
        const deleteRes = await deleteReq.json();

        if(!deleteReq.ok){
            console.log(deleteRes.message);
            return;
        }

        setMessages(curr => curr.filter(mess => mess.id !== id));
    }

    return(
        <div className={styles.message}>
            <img className={styles.pic} src={message.senderIcon} alt='pfp'/>

            <div className={styles.content}>
                <div className={styles.messageInfo}>
                    <span>{ message.senderUsername } </span>
                    <span className={styles.date}>{ formatDate(new Date(message.sentAt)) }</span>
                </div>
                <p>{message.content}</p>
            </div>

            <Image src={'/trash-x-filled.svg'} alt='trash icon' width={20} height={20} className={styles.trash}
                onClick={() => deleteMessage(message.id)}
            />
        </div>
    )
}