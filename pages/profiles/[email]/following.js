import { SmallUserCard } from "@/components/Social/social"
import clientPromise from "@/lib/db";
import { useUser } from "@/userContext";
import { useEffect } from "react";
import { getSession } from "next-auth/react";

export default function Following({ followingDetails, authenticatedUser }) {

    const { addFollower, removeFollower } = useUser();

    return (
        <div className="mt-[100px] text-slate-700">
            <div className="flex items-center mb-6 px-4">
                <img className="w-[60px] h-[60px] rounded-full mr-2" src={authenticatedUser.photoUrl} alt="Profile Picture" />
                <div>
                    <h1 className="text-[1.5rem] font-semibold mb-1">{authenticatedUser.firstName + ' ' + authenticatedUser.lastName}</h1>
                    <p className="text-sm font-medium">{authenticatedUser.workouts.length} Workouts Recorded on Hoyst</p>
                </div>
            </div>
            <div className="px-4">
            <h2 className="font-semibold px-4 text-[1.25rem]">Following</h2>
            {followingDetails.length > 0 ? followingDetails.map((followingUser) => (
                <SmallUserCard
                    key={followingUser.email}
                    user={authenticatedUser}
                    userProfile={followingUser}
                    addFollower={addFollower}
                    removeFollower={removeFollower}
                />
            )) : <p className="text-sm font-medium">You aren't following anyone yet.</p>}
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

    // Fetch details for each user in the user's following list
    const followingDetails = await Promise.all(user.following.map(async (followingEmail) => {
        const followingUser = await usersCollection.findOne({ email: followingEmail });

        return {
            firstName: followingUser.firstName,
            lastName: followingUser.lastName,
            photoUrl: followingUser.photoUrl,
            workouts: followingUser.workouts.map((workoutId) => workoutId.toString()),
            following: followingUser.following,
            followers: followingUser.followers
        };
    }));

    return {
        props: {
            followingDetails,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                photoUrl: user.photoUrl,
                workouts: user.workouts.map((workoutId) => workoutId.toString())
            },
            authenticatedUser: {
                firstName: authenticatedUser.firstName,
                lastName: authenticatedUser.lastName,
                photoUrl: authenticatedUser.photoUrl,
                workouts: authenticatedUser.workouts.map((workoutId) => workoutId.toString())
            }
        }
    };
}
