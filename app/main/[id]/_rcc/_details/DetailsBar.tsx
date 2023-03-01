'use client';
import { useProvider } from '../../_context/UserContext';
import styles from './details.module.css';

export default function DetailsBar(){
    const { activeChannel } = useProvider();

    return(
        <div className={styles.details}>
            <h1>{ activeChannel?.name }</h1>
            <img src={ activeChannel?.icon } alt="channel banner"/>

            <div className={styles.controls}>
                <img src="/leave.svg" alt="leave-icon" className={styles.leave}/>
                <div className={styles.leaveTooltip}>
                    Leave
                </div>

                <img src="/copy.svg" alt="leave-icon" className={styles.copy}
                onClick={() => navigator.clipboard.writeText('az')}
                />
                <div className={styles.copyTooltip}>
                    Copy code
                </div>
            </div>
        </div>
    )
}