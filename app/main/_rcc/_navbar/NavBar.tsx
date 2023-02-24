'use client';

import { useEffect, useState } from 'react';
import styles from './navigation.module.css';

interface Channel {
    name: string
}

export default function NavBar(){
    const [channels, setChannels] = useState<Channel[]>([]);

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

    return(
        <div className={styles.navigation}>
            {channels.map((channel, idx) => {
                return <div key={ idx } className={styles.channelTest}> { channel.name } </div>
            })}
        </div>
    )
}