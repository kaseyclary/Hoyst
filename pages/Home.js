import { getSession } from 'next-auth/react';
import clientPromise from '../lib/db';
import WorkoutCard from '@/components/WorkoutCard/WorkoutCard';
import Link from 'next/link';
import { liftTypes } from '@/lib/utils';
import Select from 'react-select';
import { useState } from 'react';

export default function Home({ workouts }) {

  const [selectedLift, setSelectedLift] = useState(null);

  const orderedWorkouts = workouts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const filteredWorkouts = selectedLift
  ? orderedWorkouts.filter(workout => 
      workout.lifts.some(lift => lift.name === selectedLift)
    )
  : orderedWorkouts;

  return (
    <div className="min-h-screen bg-slate-100 pt-[50px] max-w-screen overflow-x-hidden">
      <div className="flex w-full px-2 py-2 ">
        <Select 
          placeholder="Filter..." 
          className="w-full" 
          options={liftTypes}
          value={selectedLift ? {label: selectedLift, value: selectedLift} : null}
          onChange={(option) => setSelectedLift(option ? option.label : null)}
        />
        <button className={selectedLift ? " px-3 py-1 bg-red-600 ml-2 rounded text-sm text-white font-medium" : "hidden"} onClick={() => setSelectedLift(null)}>Clear</button>
      </div>
        {filteredWorkouts.length ? (
        <div className="max-w-[600px] mx-auto pb-20">
          {filteredWorkouts.map((workout) => (
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

  // create an array that only includes the user's own workouts and those of the users they follow where the workout visibility is set to public or the workout visibility field doesn't exist
  const filteredWorkouts = workouts.filter((workout) => {
    if (workout.visibility === 'public' || !workout.visibility) {
      return true;
    } else if (workout.visibility === 'private' && workout.userId === session.user.email){
      return true;
    } else {
      return false;
    }
  });


  // Convert ObjectIDs to strings
  const serializedWorkouts = filteredWorkouts.map((workout) => ({
    ...workout,
    _id: workout._id.toString(),
  }));

  return {
    props: { workouts: serializedWorkouts },
  };
}

  
