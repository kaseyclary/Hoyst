import { getSession } from 'next-auth/react';
import clientPromise from '../lib/db'; // Assuming you have a db client setup
import { findBestEffort } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function Profile({ user, workouts }) {

    const [bestSquat, setBestSquat] = useState(0);
    const [bestBench, setBestBench] = useState(0);
    const [bestDeadlift, setBestDeadlift] = useState(0);

    useEffect(() => {
        if (!workouts) return;
        setBestSquat(findBestEffort(workouts, "Squat"));
        setBestBench(findBestEffort(workouts, "Bench Press"));
        setBestDeadlift(findBestEffort(workouts, "Deadlift"));
    }, [workouts])

    return (
        <div className="mt-[100px] max-w-[600px] mx-auto px-4 w-screen">
            <div className="flex items-center mb-6">
                <div className="flex items-center mr-3">
                    <img className="w-[60px] h-[60px] rounded-full" src={user.photoUrl} alt="Profile Picture" />
                </div>
                <div className="flex flex-col justify-center">
                    <h2 className="text-[2rem] font-bold">{user.firstName} {user.lastName}</h2>
                    <h3>{user.email}</h3>
                </div>
            </div>
            <div className="flex w-full mb-3 text-sm font-medium">
                <p>Following: {user.following ? user.following.length : "0"}</p>
                <p className="mx-2">|</p>
                <p> Followers: {user.followers ? user.followers.length : "0"}</p>
            </div>
            <div className="flex text-sm font-medium">
                <img src="/barbell.png" alt="Barbell" className="w-[17px] h-[17px] mr-2" />
                <p className="text-sm">{user.workouts ? user.workouts.length : "0"} recorded workouts</p>
            </div>
            <div>
                <h3 className="text-lg font-bold mt-6 mb-3">Big 3: {bestSquat + bestBench + bestDeadlift} Total.</h3>
                <p>Squat Max: {bestSquat}</p>
                <p>Bench Max: {bestBench}</p>
                <p>Deadlift Max: {bestDeadlift}</p>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });

    // If the user isn't logged in, redirect them to the login page or any other page
    if (!session) {
        return {
            redirect: {
                destination: '/auth/signin', // Change to your login page path
                permanent: false,
            },
        };
    }

    const client = await clientPromise;
    const db = client.db('LiftingApp'); // Assuming 'LiftingApp' is your database name

    // Fetch the user's details from your database
    const userCollection = db.collection('users');
    const user = await userCollection.findOne({ email: session.user.email });

    if (!user) {
        // If user isn't found in the database, handle appropriately (e.g., redirect to a different page)
        return {
            notFound: true,
        };
    }

    // Fetch the user's workouts based on the IDs in the user.workouts array
    const workoutCollection = db.collection('workouts');
    let workouts = [];
    if(user.workouts && user.workouts.length > 0) {
        const workouts = await workoutCollection.find({ _id: { $in: user.workouts } }).toArray();
    }

    return {
        props: {
            user: JSON.parse(JSON.stringify(user)), // This ensures the data is serializable
            workouts: JSON.parse(JSON.stringify(workouts)), // This ensures the data is serializable
        },
    };
}



