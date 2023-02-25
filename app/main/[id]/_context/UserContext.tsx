'use client';
import { ReactNode, createContext, useContext, useState } from "react";

const UserContext = createContext<any>(null);

export function useProvider(){
    const context = useContext(UserContext);
    if(context) return context;
}

export default function UserProvider({ children }: {children: ReactNode}){
    const [username, setUsername] = useState('John');
    const [email, setEmail] = useState('sampleemail@abv.bg');

    const values = {username, setUsername, email, setEmail};

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}