import NavBar from "./_rcc/_navbar/NavBar"
import DetailsBar from "./_rcc/_details/DetailsBar"
import Chat from "./_rcc/_chat/Chat"
import ActiveSection from "./_rcc/_activeSection/ActiveSection"

export default function MainPage(){
    return(
        <>
            <NavBar/>
            <DetailsBar/>
            <Chat/>
            <ActiveSection/>
        </>
    )
}