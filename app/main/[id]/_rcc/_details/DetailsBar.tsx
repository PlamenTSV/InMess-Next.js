'use client';
import styles from './details.module.css';

export default function DetailsBar(){
    return(
        <div className={styles.details}>
            <h1>Channel name</h1>
            <img src="aa" alt="channel banner"/>

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