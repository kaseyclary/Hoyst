import Head from 'next/head'
import { Inter } from 'next/font/google'
import { SignUpWithGoogleButton } from '@/components/Auth'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import clientPromise from '@/lib/db'
import { redirect } from 'next/dist/server/api-utils'
import { KettleBellIcon } from '@/components/icons'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Hoyst</title>
        <meta name="description" content="Hoyst is a social weight lifting and strength training app built for serious lifters. Log your workouts, post them for others to see, share programs, track goals and progress, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="notranslate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-slate-800">
          <div className="h-screen flex items-center max-w-[600px] mx-auto">
            <div className="px-4 mx-auto flex flex-col h-1/2 justify-around">
              <h2 className="text-orange-500 font-bold text-[4rem] mb-4">Hoyst</h2>
              <h1 className="text-white font-medium text-[2rem]">The social lifting app built by serious lifters, for <span className="text-orange-500 font-bold">serious lifters.</span></h1>
              <SignUpWithGoogleButton />
            </div>
          </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const client = await clientPromise;
  const db = client.db('LiftingApp'); // Update this to your DB name

  //if there is a user logged in, direct them to /Home
  if (session) {
    
    return {
      redirect: {
        destination: '/Home',
        permanent: false,
      },
    };
  }

  // Otherwise, allow them to access the Register page
  return { props: {} };
}
