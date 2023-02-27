'use client';
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export interface Channel {
    name: string,
    icon: string
}

const UserContext = createContext<any>(null);

export function useProvider(){
    const context = useContext(UserContext);
    if(context) return context;
}

export default function UserProvider({ children }: {children: ReactNode}){
    const [channels, setChannels] = useState<Channel[]>([]);
    const [session, setSession] = useState();

    useEffect(() => {
        retrieveSession();
        console.log('reloaded context');
    }, [])

    const retrieveSession = async () => {
        const sessionReq = await fetch('/api/session');
        const sessionData = await sessionReq.json();

        console.log(sessionData);
        setSession(sessionData);
    }

    const values = {channels, setChannels, session, setSession};

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}