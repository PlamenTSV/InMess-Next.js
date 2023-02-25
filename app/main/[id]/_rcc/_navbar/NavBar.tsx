'use client';

import { useEffect, useState } from 'react';
import styles from './navigation.module.css';
import { useRouter } from 'next/navigation';

interface Channel {
    name: string
}

export default function NavBar(){
    const [channels, setChannels] = useState<Channel[]>([]);
    const router = useRouter();

    useEffect(() => {
        setChannels([
            {
                name: '1'
            },
            {
                name: '2'
            },
            {
                name: '3'
            }
        ])
    }, [])

    function changeChannel(channelID: string){
        console.log('az');
        router.push(`/main/${channelID}`);
    }

    return(
        <div className={styles.navigation}>
            <img src={'/PurpleLogo.svg'} alt="logo button" className={styles.channel}
            onClick={() => {changeChannel('home')}}
            />
            <span></span>

            {channels.map((channel, idx) => {
                return <div key={ idx } className={styles.channel} onClick={() => changeChannel(channel.name)}>  </div>
            })}

            <img src={'/plus.svg'} alt="logo button" className={styles.channel}/>
            
        </div>
    )
}