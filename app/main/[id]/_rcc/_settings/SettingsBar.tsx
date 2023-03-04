import styles from './settings.module.css';

export default function SettingsBar() {
    return(
        <div className={styles.settings}>
           <h2>Profile settings</h2>

           <div className={styles.credentials}>
                <div className={styles.pfp}></div>

                <div>
                    <div>
                        <p>Username</p>
                        <p>aaaaaaaa</p>
                    </div>
                    <img src="/edit.svg" alt="edit button" />
                </div>
                <div>
                    <div>
                        <p>Email</p>
                        <p>aaaaaaaa</p>
                    </div>
                    <img src="/edit.svg" alt="edit button" />
                </div>
           </div>
        </div>
    )
}