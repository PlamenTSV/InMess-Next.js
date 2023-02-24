import styles from './chat.module.css';

export default function Message({ message }: {message: string}){
    return(
        <div className={styles.message}>
            <div className={styles.pic}></div>
            <div>
                <div className={styles.messageInfo}>aaaa</div>
                {message}
            </div>
        </div>
    )
}