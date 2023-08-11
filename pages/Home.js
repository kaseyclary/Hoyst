import { getSession } from 'next-auth/react';
import clientPromise from '../lib/db';
import { formatDate } from '@/lib/utils';
import WorkoutCard from '@/components/WorkoutCard/WorkoutCard';
import BottomNav from '@/components/layout/BottomNav';

export default function Home({ workouts }) {

  const orderedWorkouts = workouts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
        <div className="min-h-screen bg-slate-100 pt-[50px]">
            <div className="max-w-[600px] mx-auto pb-20">
                {orderedWorkouts.map((workout) => (
                    <WorkoutCard key={workout._id} workout={workout} />
                ))}
            </div>
        </div>
  );
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
    const collection = db.collection('workouts');
  
    const workouts = await collection
      .find({ userId: session.user.email })
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
  
