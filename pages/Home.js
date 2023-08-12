import { getSession } from 'next-auth/react';
import clientPromise from '../lib/db';
import { formatDate } from '@/lib/utils';
import WorkoutCard from '@/components/WorkoutCard/WorkoutCard';
import BottomNav from '@/components/layout/BottomNav';
import Link from 'next/link';

export default function Home({ workouts }) {

  const orderedWorkouts = workouts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className="min-h-screen bg-slate-100 pt-[50px]">
      {orderedWorkouts.length ? (
        <div className="max-w-[600px] mx-auto pb-20">
          {orderedWorkouts.map((workout) => (
              <WorkoutCard key={workout._id} workout={workout} />
          ))}
        </div>
      ) : (
        <div className="max-w-[600px] mx-auto pb-20 px-4 pt-12 h-screen flex flex-col justify-center text-slate-800">
          <h3 className="text-[1.5rem] font-semibold mb-4">No workouts to display yet.</h3>
          <p className="text-[1.2rem] font-medium">Either <Link className="underline text-orange-600" href="/AddWorkout">add a workout</Link> or <Link className="underline text-orange-600" href="/friends">follow some friends</Link> to start growing your feed!</p>
        </div>
      )}
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

  // Fetch workouts of the user and those they are following
  const usersToFetchWorkoutsFor = [session.user.email, ...user.following];
  
  const workoutCollection = db.collection('workouts');
  const workouts = await workoutCollection
    .find({ userId: { $in: usersToFetchWorkoutsFor } })
    .toArray();

  // Convert ObjectIDs to strings
  const serializedWorkouts = workouts.map((workout) => ({
    ...workout,
    _id: workout._id.toString(),
  }));

  return {
    props: { workouts: serializedWorkouts },
  };
}

  
