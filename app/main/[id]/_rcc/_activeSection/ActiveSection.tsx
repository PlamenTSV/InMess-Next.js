'use client';
import { ActiveMember } from '@/utils/interfaces/ActiveMember';
import { useEffect } from 'react';
import { useProvider } from '../../_context/UserContext';
import styles from './active.module.css';

export default function ActiveSection(){
    const { activeMembers, setActiveMembers } = useProvider();

    useEffect(() => {
        setActiveMembers([{
            id: '123',
            memberUsername: 'ADADADADADAaaaaa',
            memberIcon: 'az'
        },
        {
            id: '123',
            memberUsername: 'bbbbbbbbbbbbbb',
            memberIcon: 'az'
        }])
    }, [])

    return (
        <div className={styles.activeSection}>
            {activeMembers.map((member: ActiveMember) => 
                <div className={styles.member}>
                    <div>{member.memberIcon}</div>
                    <p>{member.memberUsername}</p>
                </div> 
            )}
        </div>
    )
}