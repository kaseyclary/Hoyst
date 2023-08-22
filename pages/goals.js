import { getSession } from 'next-auth/react';
import clientPromise from '@/lib/db';
import Link from 'next/link';

export default function Goals({ user, workouts}) {
    return user.goals && user.goals.length > 0 ? (
        <div />
    ) 
    : (
        <div className="h-screen flex justify-center items-center text-slate-700 px-4">
            <h3 className="font-medium text-[1.1rem]">You don't have any goals active. <Link href="/addGoal" className="text-orange-500 underline">Add one to start tracking progress.</Link></h3>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { req, res } = context;
    const session = await getSession({ req });
  
    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  
    const client = await clientPromise;
    const db = client.db('LiftingApp');
    
    // Check if the user exists in the "users" collection
    const userCollection = db.collection('users');
    const user = await userCollection.findOne({ email: session.user.email });
  
    // If the user doesn't exist, redirect to /register
    if (!user) {
      return {
        redirect: {
          destination: '/register',
          permanent: false,
        },
      };
    }
  
    const workoutCollection = db.collection('workouts');
    const workouts = await workoutCollection.find({ userId: session.user.email }).toArray();
  
    return {
      props: { 
        user: JSON.parse(JSON.stringify(user)), 
        workouts: JSON.parse(JSON.stringify(workouts)) 
      },
    };
  }