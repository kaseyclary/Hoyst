import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useWorkout } from '@/workoutContext';
import { WorkoutLikes } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { WorkoutSummary } from '@/components/WorkoutCard/WorkoutSummary';
import { useUser } from '@/userContext';
import { useSession } from 'next-auth/react';
import { LeftArrowIcon } from '@/components/icons';
import { SmallUserCard } from '@/components/Social/social';
import clientPromise from '@/lib/db';


export default function Knucks({ workoutData, userProfiles }) {

    const likes = workoutData.likes;
    const { user, addFollower, removeFollower } = useUser();

    const router = useRouter();
    const { _id } = router.query;

    const [isLoading, setLoading] = useState(false);

    return (
        <div className="w-screen min-h-screen text-slate-700 pb-20 pt-[75px]">
            <div className="max-w-[600px] mx-auto px-4 bg-white">
                <div onClick={() => router.back()} className="flex items-center mb-4 hover:cursor-pointer">
                    <img src="/left-arrow.png" className="h-[15px] w-[15px] mr-1"/>
                    <p className="font-medium text-slate-400">Home</p>
                </div>
                <div className="flex items-center">
                    <div>
                        <img src={workoutData.photoUrl} className="h-[75px] w-[75px] rounded-full mr-3"/>
                    </div>
                    <div>
                        <h1 className="text-[1.5rem] font-bold">{workoutData.name}</h1>
                        <h2 className="text-[1.25rem] font-semibold mb-1">{workoutData.userName}</h2>
                        <h3 className="font-medium text-sm">{formatDate(workoutData.date)}</h3>
                    </div>
                </div>
                <h3 className="mt-4 font-semibold">Knucks from: </h3>
            </div>
            <div className="mt-4 max-w-[600px] mx-auto">
                {userProfiles.map((userProfile) => (
                    <SmallUserCard
                        key={userProfile._id}
                        user={user}
                        userProfile={userProfile}
                        addFollower={addFollower}
                        removeFollower={removeFollower}
                    />
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const _id = context.params._id;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/workouts/getWorkout?workoutId=${_id}`);
    const workoutData = await res.json();

    try {
        if (!res.ok) {
            throw new Error(`API error with status ${res.status}: ${await res.text()}`);
        }

        if (!workoutData) {
            return {
                notFound: true
            };
        }

        const client = await clientPromise;
        const db = client.db("LiftingApp");

        const userIds = workoutData.likes.map(like => like.userId);
        const userProfiles = await db.collection('users').find({ email: { $in: userIds } }).toArray();

        const serializedUserProfiles = JSON.parse(JSON.stringify(userProfiles));

        return {
            props: {
                workoutData,
                userProfiles: serializedUserProfiles,
            }
        };
        
    } catch (error) {
        throw error;
    }

}
