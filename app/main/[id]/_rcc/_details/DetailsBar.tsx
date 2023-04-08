'use client';
import { useEffect, useState } from 'react';
import { useProvider } from '../../_context/UserContext';
import { useRouter, usePathname } from 'next/navigation';
import styles from './details.module.css';

import { Channel, ActiveChannel } from '@/utils/interfaces';

export default function DetailsBar(){
    const { session, activeChannel, setChannels } = useProvider();
    const [data, setData] = useState<ActiveChannel>();

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        console.log(activeChannel);
        setData({
            name: activeChannel?.name,
            icon: activeChannel?.icon,
        })
    }, [pathname])

    async function removeChannel(id: string, deleting: boolean){
        const deleteReq = deleting ? 
            await fetch(`/api/channel/delete?channelID=${id}&userID=${session.id}`, {
                method: 'DELETE'
            })
        :
            await fetch(`/api/channel/leave?channelID=${id}&userID=${session.id}`, {
                method: 'PATCH'
            });


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
                {activeChannel?.owner === session?.id ?
                    <>
                        <img src="/trash-delete.svg" alt="leave-icon" className={styles.delete}
                            onClick={() => removeChannel(activeChannel?.id, true)}
                        />
                        <div className={styles.deleteToolTip}>
                            Delete channel
                        </div>
                    </> 
                    :
                    <>
                        <img src="/leave.svg" alt="leave-icon" className={styles.leave} 
                            onClick={() => removeChannel(activeChannel?.id, false)}
                        />
                        <div className={styles.leaveTooltip}>
                            Leave
                        </div>
                    </>
                }

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