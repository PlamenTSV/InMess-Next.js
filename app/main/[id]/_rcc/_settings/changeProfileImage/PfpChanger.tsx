import { useProvider } from '../../../_context/UserContext';
import styles from '../settings.module.css';

export default function PfpChanger(){
    const { session, setSession } = useProvider();

    const fileReader = new FileReader();

    async function submitIcon(file: string | ArrayBuffer){
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
                    <div>
                        <img src="/edit.svg" alt="edit button" className={styles.editIcon}/>
                    </div>
                </div>
            </label>
        </>
    )
}