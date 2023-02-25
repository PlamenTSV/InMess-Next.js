import UserProvider from "./_context/UserContext"

import NavBar from "./_rcc/_navbar/NavBar"
import DetailsBar from "./_rcc/_details/DetailsBar"
import Chat from "./_rcc/_chat/Chat"
import HomePage from "./_rcc/_home/HomePage"
import ActiveSection from "./_rcc/_activeSection/ActiveSection"


export default function MainPage({ params }: {params: {id: string}}){
    return(
        <UserProvider>
            <NavBar/>
            <DetailsBar/>
            {params.id === 'home'? <HomePage/> : <Chat/>}
            <ActiveSection/>
        </UserProvider>
    )
}