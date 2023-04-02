'use client';
import { useEffect, useState } from 'react';
import { useProvider } from '../../_context/UserContext';
import { usePathname } from 'next/navigation';
import styles from './details.module.css';

interface ChannelData {
    name: string,
    icon: string
}

export default function DetailsBar(){
    const { activeChannel } = useProvider();
    const [data, setData] = useState<ChannelData>();
    const pathname = usePathname();

    useEffect(() => {
        setData({
            name: activeChannel?.name,
            icon: activeChannel?.icon
        })
    }, [pathname])

    return(
        <div className={styles.details}>
            <h1>{ data?.name }</h1>
            <img src={ data?.icon } alt="channel banner"/>

            <div className={styles.controls}>
                <img src="/leave.svg" alt="leave-icon" className={styles.leave}/>
                <div className={styles.leaveTooltip}>
                    Leave
                </div>

                <img src="/copy.svg" alt="leave-icon" className={styles.copy}
                onClick={() => navigator.clipboard.writeText(activeChannel?.id)}
                />
                <div className={styles.copyTooltip}>
                    Copy code
                </div>
            </div>
        </div>
    )
}