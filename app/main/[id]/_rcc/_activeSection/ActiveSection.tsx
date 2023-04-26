'use client';
import { ActiveMember } from '@/utils/interfaces/ActiveMember';
import { useEffect } from 'react';
import { useProvider } from '../../_context/UserContext';
import styles from './active.module.css';

export default function ActiveSection(){
    const { activeMembers, setActiveMembers } = useProvider();

    useEffect(() => {
        setActiveMembers(activeMembers.filter((member, index) => {
            return activeMembers.findIndex(o => member.id === o.id) === index;
        }))
    }, [activeMembers])

    return (
        <div className={styles.activeSection}>
            <h2>Currently active</h2>
            {activeMembers?.filter((member: ActiveMember) => member.id !== undefined)
                .map((member: ActiveMember, idx: number) => 
                <div className={styles.member} key={idx}>
                    <img src={member.memberIcon} alt="profile icon of current member" />
                    <p>{member.memberUsername}</p>
                </div> 
            )}
        </div>
    )
}