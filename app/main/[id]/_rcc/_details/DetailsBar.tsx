'use client';
import { useEffect, useState } from 'react';
import { useProvider } from '../../_context/UserContext';
import { useRouter, usePathname } from 'next/navigation';
import styles from './details.module.css';

import { Channel } from '../../_context/UserContext';

interface ChannelData {
    name: string,
    icon: string,
}

export default function DetailsBar(){
    const { session, activeChannel, setChannels } = useProvider();
    const [data, setData] = useState<ChannelData>();

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setData({
            name: activeChannel?.name,
            icon: activeChannel?.icon,
        })
    }, [pathname])

    async function deleteChannel(id: string){
        const deleteReq = await fetch(`/api/channel/delete?channelID=${id}`, {
            method: 'DELETE'
        })

        if(!deleteReq.ok){
            const error = await deleteReq.json();
            console.log(error.message);
            return;
        }

        setChannels((channels: Channel[]) => channels.filter(ch => ch.id !== id));
        router.push('main/home');
    }

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

                {activeChannel?.owner === session?.id ?
                    <>
                        <img src="/trash-delete.svg" alt="leave-icon" className={styles.delete}
                            onClick={() => deleteChannel(activeChannel?.id)}
                        />
                        <div className={styles.deleteToolTip}>
                            Delete channel
                        </div>
                    </> 
                    : ''
                }
            </div>
        </div>
    )
}