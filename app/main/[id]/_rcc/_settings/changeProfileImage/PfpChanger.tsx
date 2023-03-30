import { useEffect, useState } from 'react';
import { useProvider } from '../../../_context/UserContext';
import styles from '../settings.module.css';

export default function PfpChanger(){
    const { session, setSession } = useProvider();

    const [isRequesting, setIsRequesting] = useState<boolean>(false);

    const fileReader = new FileReader();

    useEffect(() => {
        console.log('Requesting: ' + isRequesting);
    }, [isRequesting])

    async function submitIcon(file: string | ArrayBuffer){
        setIsRequesting(true);

        const iconReq = await fetch('/api/account/updatePfp', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                userID: session.id,
                newImage: file
            })
        })

        setIsRequesting(false);

        if(!iconReq.ok){
            console.log('Error');
        }
        const iconRes = await iconReq.json();
        setSession({...session, icon: iconRes.image})
        console.log(iconRes);
    }

    return (
        <>
            <input type="file" id="change-icon" accept="image/*"
                onChange={event => {
                    if(event.target.files && event.target.files[0]){
                        fileReader.readAsDataURL(event.target.files[0]);
                        fileReader.onload = () => {
                            submitIcon(fileReader.result!);
                        }
                    }
                }}
            />
            <label htmlFor="change-icon">
                <div className={styles.pfp}>
                    <img src={session?.icon ? session.icon : "/ProfileIcon.png"} alt="pfp"/>
                    <div className={styles.edit}>
                        <img src="/edit.svg" alt="edit button" className={styles.editIcon}/>
                    </div>

                    {isRequesting? 
                        <div className={styles.loading}>
                            <img src="/loader.svg" alt="loader" />
                        </div> 
                    : ''}
                </div>
            </label>
        </>
    )
}