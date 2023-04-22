'use client';
import { useEffect, useRef, useState } from 'react'
import { useProvider } from '../../../_context/UserContext';
import { handleClickOutside } from '@/utils/outsideClick';
import styles from './popup.module.css'

export default function AddChannel(props: any){
    const { session, channels, setChannels } = useProvider();

    const containerRef = useRef<HTMLDivElement>(null);
    const channelName = useRef<HTMLInputElement>(null);
    const channelCode = useRef<HTMLInputElement>(null);

    const [channelImage, setChannelImage] = useState('');
    const [base64Image, setBase64Image] = useState<string | ArrayBuffer>('');
    const [isRequesting, setIsRequesting] = useState<boolean>(false);

    const reader = new FileReader();

    useEffect(() => {
        window.addEventListener('mousedown', event => handleClickOutside(event, containerRef, props.setShowPopup))

        return () => {
            window.removeEventListener('mousedown', () => handleClickOutside);
        }
    }, [])

    function changeImage(target: EventTarget & HTMLInputElement){
        if(target.files && target.files[0]){
            setChannelImage(URL.createObjectURL(target.files[0]));

            reader.readAsDataURL(target.files[0]);
            reader.onloadend = () => {
                setBase64Image(reader.result!);
            }
        }
    }

    async function addChannel(){
        setIsRequesting(true);

        const addChannel = await fetch('/api/channel/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                image: base64Image,
                name: channelName.current?.value,
                creator: session?.id
            })
        })

        const newChannel = await addChannel.json();

        if(!addChannel.ok){
            console.log(newChannel.message);
            return; 
        }

        setChannels([...channels, {
            id: newChannel.id,
            name: newChannel.name,
            icon: newChannel.icon,
            owner: newChannel.owner
        }])

        setIsRequesting(false);
        props.setShowPopup(false);
    }

    async function joinChannnel() {
        setIsRequesting(true);

        const joinReq = await fetch('/api/channel/join', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                channelID: channelCode.current?.value,
                userID: session?.id
            })
        })

        const joinRes = await joinReq.json();

        if(!joinReq.ok){
            console.log(joinRes.message);
            return;
        }

        setChannels([...channels, {
            id: joinRes.id,
            name: joinRes.name,
            icon: joinRes.icon,
            owner: joinRes.owner
        }])

        setIsRequesting(false);
        props.setShowPopup(false);
    }

    return(
        <div className={styles.background}>
        {isRequesting? 
            <img src='/loader-white.svg' alt='loader' className={styles.loading}/> 
        : 
            <div className={styles.container} ref={containerRef}>
                <h2>CREATE YOUR CHANNEL</h2>
                <h3>CHOOSE AN ICON</h3>

                <input type="file" id="icon-input" accept="image/*"
                onChange={(event) => changeImage(event.target)}
                />
                <label htmlFor="icon-input">
                    <img src={(channelImage !== '')? channelImage : '/camera.jpg'} alt="channel icon" 
                        width={200} height={200}
                    />
                </label>

                <div className={styles.enterInputs}>
                    <input type="text" placeholder='Name of your channel...' 
                        ref={channelName}
                    />
                    <input type="button" value={'Create channel'} 
                    onClick={() => addChannel()}
                    />
                </div>

                <div className={styles.seperator}>
                    <div></div>
                    <h3>OR</h3>
                    <div></div>
                </div>
                <h2>JOIN VIA CODE</h2>
                <div className={styles.enterInputs}>
                    <input type="text" placeholder='Code for channel...' 
                        ref={channelCode}
                    />
                    <input type="button" value={'Enter channel'} 
                        onClick={() => joinChannnel()}
                    />
                </div>
            </div>
        }
        </div>
    )
}