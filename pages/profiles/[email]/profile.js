import { getSession } from "next-auth/react";
import clientPromise from "@/lib/db";
import { findBestEffort } from "@/lib/utils";
import { useState, useEffect } from "react";
import { liftTypes } from "@/lib/utils";
import Select from "react-select";
import WorkoutCard from "@/components/WorkoutCard/WorkoutCard";
import Link from "next/link";


export default function Profile({ user, workouts }) {

    const options = ["Activity", "Featured", "Progress"]

    const [selectedLift, setSelectedLift] = useState(null);
    const [selectedOption, setSelectedOption] = useState(options[0]);

    useEffect(() => {
        if (!workouts) return;
    }, [workouts])

    const orderedWorkouts = workouts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    const filteredWorkouts = selectedLift
    ? orderedWorkouts.filter(workout => 
        workout.lifts.some(lift => lift.name === selectedLift)
      )
    : orderedWorkouts;

    function ActivityView() {
        return (
            <div>
                <div className="relative">
                    <div className="flex w-full px-2 py-2 sticky top-0">
                    <Select 
                        placeholder="Filter..." 
                        className="w-full" 
                        options={liftTypes}
                        value={selectedLift ? {label: selectedLift, value: selectedLift} : null}
                        onChange={(option) => setSelectedLift(option ? option.label : null)}
                    />
                    <button className={selectedLift ? "px-3 py-1 bg-red-600 ml-2 rounded text-sm text-white font-medium" : "hidden"} onClick={() => setSelectedLift(null)}>Clear</button>
                    </div>
                    <div className="">
                        {selectedLift && filteredWorkouts.length === 1 && (
                            <div className="p-4">
                                <p className="text-sm font-medium">{user.firstName} has {filteredWorkouts.length} {selectedLift} Workout recorded</p>
                                <p className="text-sm font-semibold">His best effort is {findBestEffort(filteredWorkouts, selectedLift)} lbs</p>
                            </div>
                        )}
                        {selectedLift && filteredWorkouts.length > 1 && (
                            <div className="p-4">
                                <p className="text-sm font-medium">{user.firstName} has {filteredWorkouts.length} {selectedLift} Workouts recorded</p>
                                <p className="text-sm font-semibold">His best effort is {findBestEffort(filteredWorkouts, selectedLift)} lbs</p>
                            </div>
                        )}
                        
                    </div>
                </div>
                {filteredWorkouts.length ? (
                    <div className="max-w-[600px] mx-auto pb-20">
                    {filteredWorkouts.map((workout) => (
                        <WorkoutCard key={workout._id} workout={workout} />
                    ))}
                    </div>
                ) : (
                    <div className="max-w-[600px] mx-auto pb-20 px-4 pt-12 flex flex-col justify-center text-slate-800">
                    <h3 className="text-[1.5rem] font-semibold mb-4">No workouts to display yet.</h3>
                    </div>
                )}
            </div>
        )
    }
    return (
        <div className="mt-[80px] max-w-[600px] mx-auto w-screen text-slate-700">
            <div className="flex items-center mb-6 px-4">
                <div className="flex items-center mr-3">
                    <img className="w-[60px] h-[60px] rounded-full" src={user.photoUrl} alt="Profile Picture" />
                </div>
                <div className="flex flex-col justify-center">
                    <h2 className="text-[1.25rem] font-bold">{user.firstName} {user.lastName}</h2>
                    <div className="flex text-sm font-medium">
                        <img src="/barbell.png" alt="Barbell" className="w-[17px] h-[17px] mr-1" />
                        <p className="text-sm">{user.workouts ? user.workouts.length : "0"} recorded workouts</p>
                    </div>
                    <div className="flex w-full mb-3 text-sm font-medium">
                        <p>Following: {user.following ? user.following.length : "0"}</p>
                        <p className="mx-2">|</p>
                        <p> Followers: {user.followers ? user.followers.length : "0"}</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 font-semibold text-sm [&>*]:border-r [&>*]:py-[10px] [&>*:last-child]:border-0">
                <div className={selectedOption === options[0] ? "selected-profile-option" : "profile-option"} onClick={() => setSelectedOption(options[0])}>
                    <p className="">{options[0]}</p>
                </div>
                <div className={selectedOption === options[1] ? "selected-profile-option" : "profile-option"} onClick={() => setSelectedOption(options[1])}>
                    <p className="">{options[1]}</p>
                </div>
                <div className={selectedOption === options[2] ? "selected-profile-option" : "profile-option"} onClick={() => setSelectedOption(options[2])}>
                    <p className="">{options[2]}</p>
                </div>
            </div>
            <div>
                {selectedOption === options[0] && (
                    <ActivityView />
                )}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const userEmail = context.params.email;  // Extract the email from context.params
    const { req, res } = context;
    const session = await getSession({ req });

    const client = await clientPromise;  // Connect to the database
    const db = client.db("LiftingApp");
    const usersCollection = db.collection("users");

    // Find the user with the extracted email
    const user = await usersCollection.findOne({ email: userEmail });

    const authenticatedUser = await usersCollection.findOne({ email: session.user.email });
    
    if (!user) {
        return {
            notFound: true
        };
    }

    // Get workouts that the user has created
    const workoutCollection = db.collection("workouts");
    const workouts = await workoutCollection.find({ userId: userEmail }).toArray();

    return {
        props: {
            user: JSON.parse(JSON.stringify(user)),
            workouts: JSON.parse(JSON.stringify(workouts)),
        },
    };
}