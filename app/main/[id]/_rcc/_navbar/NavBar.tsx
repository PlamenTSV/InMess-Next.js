'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from './navigation.module.css';

import AddChannel from './popup/AddChannel';
import { useProvider } from '../../_context/UserContext';
import { Channel } from '@/utils/interfaces';

export default function NavBar(){
    const {channels, setActiveChannel} = useProvider();
    const [showPopup, setShowPopup] = useState(false);
    
    const router = useRouter();
    
    function changeChannel(channel: Channel | undefined){
        if(channel){
            localStorage.setItem('Active channel', JSON.stringify(channel));
            setActiveChannel(channel);
            router.push(`/main/${channel.id}`);
        }
        else {
            router.push('main/home');
        }
    }

    return(
        <div className={styles.navigation}>
            <img src={'/PurpleLogo.svg'} alt="logo button" className={styles.channel}
            onClick={() => {changeChannel(undefined)}}
            />
            <span></span>

            {channels.map((channel: Channel, idx: number) => {
                return <img src={channel.icon} alt='Channel' key={ idx } className={styles.channel} onClick={() => changeChannel(channel)}/>
            })}

            <img src={'/plus.svg'} alt="logo button" className={styles.channel}
            onClick={() => setShowPopup(true)}
            />
            {showPopup? <AddChannel setShowPopup={setShowPopup}/> : ''}
        </div>
    )
}