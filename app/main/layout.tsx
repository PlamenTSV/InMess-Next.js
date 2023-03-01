import '../global.css';
import UserProvider from './[id]/_context/UserContext';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <UserProvider>
          {children}
        </UserProvider>
    </>
  )
}