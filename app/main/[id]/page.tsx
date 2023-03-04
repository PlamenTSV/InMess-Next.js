import NavBar from "./_rcc/_navbar/NavBar"

import SettingsBar from "./_rcc/_settings/SettingsBar"
import DetailsBar from "./_rcc/_details/DetailsBar"

import Chat from "./_rcc/_chat/Chat"
import HomePage from "./_rcc/_home/HomePage"

import ActiveSection from "./_rcc/_activeSection/ActiveSection"


export default function MainPage({ params }: {params: {id: string}}){
    return(
        <>
            <NavBar/>
            {params.id === 'home'? <SettingsBar/> : <DetailsBar/>}
            {params.id === 'home'? <HomePage/> : <Chat/>}
            <ActiveSection/>
        </>
    )
}