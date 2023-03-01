'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from './navigation.module.css';

import AddChannel from './popup/AddChannel';
import { Channel, useProvider } from '../../_context/UserContext';



export default function NavBar(){
    const {channels} = useProvider();
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();

    function changeChannel(channelID: string){
        router.push(`/main/${channelID}`);
    }

    return(
        <div className={styles.navigation}>
            <img src={'/PurpleLogo.svg'} alt="logo button" className={styles.channel}
            onClick={() => {changeChannel('home')}}
            />
            <span></span>

            {channels.map((channel: Channel, idx: number) => {
                return <img src={channel.icon} alt='Channel' key={ idx } className={styles.channel} onClick={() => changeChannel(channel.id)}/> 
            })}

            <img src={'/plus.svg'} alt="logo button" className={styles.channel}
            onClick={() => setShowPopup(true)}
            />
            {showPopup? <AddChannel setShowPopup={setShowPopup}/> : ''}
        </div>
    )
}