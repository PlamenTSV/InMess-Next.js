'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from './navigation.module.css';

import AddChannel from './popup/AddChannel';
import { Channel, useProvider } from '../../_context/UserContext';



export default function NavBar(){
    const {channels, setChannels} = useProvider();
    const [showPopup, setShowPopup] = useState(false);
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

            {channels.map((channel: Channel, idx: number) => {
                return <div key={ idx } className={styles.channel} onClick={() => changeChannel(channel.name)}>  </div>
            })}

            <img src={'/plus.svg'} alt="logo button" className={styles.channel}
            onClick={() => setShowPopup(true)}
            />
            {showPopup? <AddChannel setShowPopup={setShowPopup}/> : ''}
        </div>
    )
}