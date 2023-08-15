import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { WorkoutProvider } from '@/workoutContext';
import { UserProvider } from '@/userContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import BottomNav from '@/components/layout/BottomNav';


export default function App({ Component, pageProps }) {
  
  return (
    <SessionProvider session={pageProps.session}>
      <UserProvider>
        <WorkoutProvider>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
          <BottomNav>
            <Component {...pageProps}/>
            <ToastContainer />
          </BottomNav>
        </WorkoutProvider>
      </UserProvider>
    </SessionProvider>
  )
}
