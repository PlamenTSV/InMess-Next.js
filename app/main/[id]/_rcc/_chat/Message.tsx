import styles from './chat.module.css';

import Image from 'next/image';
import { useProvider } from '../../_context/UserContext';

export default function Message({ message }: {message: string}){
    const {session} = useProvider();

    return(
        <div className={styles.message}>
            <div className={styles.pic}></div>

            <div className={styles.content}>
                <div className={styles.messageInfo}>
                   {session.username}
                </div>
                <p>{message}</p>
            </div>

            <Image src={'/trash-x-filled.svg'} alt='trash icon' width={20} height={20} className={styles.trash}/>
        </div>
    )
}