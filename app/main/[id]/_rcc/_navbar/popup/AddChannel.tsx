'use client';
import { useEffect, useRef, useState } from 'react'
import { Channel, useProvider } from '../../../_context/UserContext';
import { handleClickOutside } from '@/utils/outsideClick';
import styles from './popup.module.css'

export default function AddChannel(props: any){
    const { setChannels } = useProvider();

    const containerRef = useRef<HTMLDivElement>(null);
    const channelName = useRef<HTMLInputElement>(null);

    const [channelImage, setChannelImage] = useState('');
    const [base64Image, setBase64Image] = useState<string | ArrayBuffer>('');
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
        const addChannel = await fetch('/api/channel/addChannel', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                image: base64Image,
                name: channelName.current?.value
            })
        })

        const { id } = await addChannel.json();

        setChannels((old: Channel[]) => [...old, {
            id: id,
            name: channelName.current?.value,
            icon: channelImage
        }])
        props.setShowPopup(false);
    }

    return(
    <div className={styles.background}>
        <div className={styles.container} ref={containerRef}>
            <h2>CREATE YOUR CHANNEL</h2>
            <h3>CHOOSE AN ICON</h3>

            <input type="file" id="icon-input" accept="image/*"
            onChange={(event) => changeImage(event.target)}
            />
            <label htmlFor="icon-input"><img src={(channelImage !== '')? channelImage : '/camera.jpg'} alt="channel icon" width={200} height={200}/></label>

            <div className={styles.enterInputs}>
                <input type="text" placeholder='Name of your channel...' ref={channelName}/>
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
                <input type="text" placeholder='Code for channel...'/>
                <input type="button" value={'Enter channel'}/>
            </div>
        </div>
    </div>
    )
}