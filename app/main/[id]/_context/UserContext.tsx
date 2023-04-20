'use client';
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Channel, Session } from '@/utils/interfaces';
import { ActiveMember } from "@/utils/interfaces/ActiveMember";
import { IContext } from "@/utils/interfaces/Context";

const UserContext = createContext<IContext>({
    channels: [],
    setChannels: () => {},
    session: undefined,
    setSession: () => {},
    activeChannel: undefined,
    setActiveChannel: () => {},
    activeMembers: [],
    setActiveMembers: () => {}
});

export function useProvider(){
    const context = useContext(UserContext);
    return context;
}

export default function UserProvider({ children }: {children: ReactNode}){
    const [channels, setChannels] = useState<Channel[]>([]);
    const [session, setSession] = useState<Session>();

    const [activeChannel, setActiveChannel] = useState<Channel>();
    const [activeMembers, setActiveMembers] = useState<ActiveMember[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(localStorage.getItem('Active channel')){
            setActiveChannel(JSON.parse(localStorage.getItem('Active channel') || ''));
        }

        retrieveSession();
    }, [])

    useEffect(() => {
        if(session)retrieveChannels();
        setActiveMembers([{
            id: session?.id!,
            memberUsername: session?.username!,
            memberIcon: session?.icon!
        }]);
        setIsLoading(false);
    }, [session])
    

    const retrieveSession = async () => {
        const sessionReq = await fetch('/api/session');
        if(!sessionReq.ok){
            window.location.href = '/';
            return;
        }
        const sessionData = await sessionReq.json();

        console.log(sessionData);
        setSession(sessionData);
    }

    const retrieveChannels = async () => {
        const channelsReq = await fetch(`/api/channel/loadAll?user=${session?.id}`);
        const channelsData = await channelsReq.json();

        if(!channelsReq.ok){
            console.log(channelsData.message);
            return;
        }

        console.log(channelsData.channels);
        setChannels(channelsData.channels);
    }

    const values: IContext = {channels, setChannels, session, setSession, activeChannel, setActiveChannel, activeMembers, setActiveMembers};

    return isLoading? <h1>Loading...</h1> :  (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}