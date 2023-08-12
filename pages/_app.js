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
          <BottomNav>
            <Component {...pageProps} />
            <ToastContainer />
          </BottomNav>
        </WorkoutProvider>
      </UserProvider>
    </SessionProvider>
  )
}
