import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useWorkout } from '@/workoutContext';
import { WorkoutLikes } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { WorkoutSummary } from '@/components/WorkoutCard/WorkoutSummary';
import { useUser } from '@/userContext';
import { useSession } from 'next-auth/react';
import { LeftArrowIcon } from '@/components/icons';


export default function EditWorkout({ workoutData }) {

    const { user, fetchUser } = useUser();
    const { data: session } = useSession();

    const router = useRouter();
    const { _id } = router.query; // This captures the workout ID from the URL

    const [comment, setComment] = useState('');

    const [isLoading, setLoading] = useState(false);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    }

    const handlePostComment = async () => {
        const response = await fetch('/api/social/addComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                workoutId: _id,
                userId: session.user.email,
                userName: user.firstName + ' ' + user.lastName,
                userPhoto: user.photoUrl,
                comment: comment,
                createdAt: new Date().toISOString()
            })
        });

        if (response.ok) {
            const { workout } = await response.json();
            setWorkout(workout);
            fetchUser();
            setComment('');
            router.push(`/workouts/${_id}/comments`);
        }
    }

    
    // Fetch the workout data using _id if needed
    // You can use useEffect to fetch data when _id is available

    const { 
        setWorkout,
        workout,
      } = useWorkout();

    return (
        <div className="w-screen min-h-screen text-slate-700">
            <div className="min-h-screen max-w-[600px] mx-auto pt-[75px] pb-20 px-4 bg-white">
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
                <p className="mt-2 mb-6">{workoutData.description}</p>
                <WorkoutSummary workout={workoutData} />
                <WorkoutLikes workout={workoutData} />
                <div className="max-h-[300px] overflow-y-scroll mt-4">
                    {workoutData.comments.map((comment, index) => (
                        <div key={index} className="flex items-center mt-4">
                            <img src={comment.userPhoto} className="h-[30px] w-[30px] rounded-full mr-2"/>
                            <div>
                                <p className="text-xs"><span className="font-semibold text-sm">{comment.userName}</span> | {formatDate(comment.createdAt)}</p>
                                <p className="text-sm">{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex">
                    <input value={comment} onChange={handleCommentChange} placeholder="Add a comment..." className="border rounded w-full px-2 py-2 text-sm"/>
                    <button className="bg-orange-600 text-white px-3 py-1 rounded ml-2 text-sm" onClick={handlePostComment}>Post</button>
                </div>
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
    
        return {
            props: {
                workoutData
            }
        };
        
    } catch (error) {
        throw error;
    }

}
