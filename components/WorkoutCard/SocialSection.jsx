import { useState, useEffect } from 'react';
import { useUser } from "@/userContext";
import { useRouter } from 'next/router';
import { WorkoutLikes } from '@/components/ui';
import { DotIcon } from '../icons';

export default function SocialSection ({workout, onLikeUpdate}) {
    const { user, toggleLikeWorkout, fetchUser } = useUser();
    const [isLiked, setIsLiked] = useState(false);

    const router = useRouter();

    // On mount, check if the workout is already liked by the user
    useEffect(() => {
        if (user) {
            setIsLiked(user.likedWorkouts.includes(workout._id));
        }
    }, [workout, user]);

    const handleLikeToggle = async () => {
        if (!user) return; // Exit the function if user isn't loaded yet
        await toggleLikeWorkout(workout._id);  // Use the toggle function directly
        onLikeUpdate(workout._id); // Notify the parent component about the like update
        setIsLiked(prevState => !prevState);
        fetchUser();  // Refetch the user to update the likes array
    };


    const handleAddComment = () => {
        router.push(`/workouts/${workout._id}/comments`)
    }

    return (
        <div className="w-full">
            <div className="w-5/6 mx-auto flex items-center pb-3">
                <WorkoutLikes workout={workout} />
            </div>
            <div className="h-full w-3/4 mx-auto flex justify-around items-center border-t py-2">
                <div className="w-full flex justify-center border-r" onClick={handleLikeToggle}>
                    <img
                        src={isLiked ? "/fist-bump-filled.png" : "/fist-bump.png"}  // Change image based on like status
                        alt="Description of Image"
                        width={30}
                        height={30}
                    />
                </div>
                <div className="w-full flex justify-center" onClick={handleAddComment}>
                    <img
                        src="/comment.png"
                        alt="Description of Image"
                        width={25}
                        height={25}
                    />
                </div>
            </div>
            { workout.comments.length > 0 ?(
                <div className="flex w-5/6 mx-auto py-4 border-t items-center">
                    <img src={user.photoUrl} className="h-[25px] w-[25px] rounded-full mr-2"/>
                    <div className="flex items-center" onClick={handleAddComment}>
                        <p className="text-sm font-medium mr-1">{workout.comments[workout.comments.length - 1].userName}</p>
                        <DotIcon color={"#334155"}/>
                        <p className="text-sm ml-1 font-light">{workout.comments[workout.comments.length - 1].comment}</p>
                    </div>
                </div>
                ) : null
            }
        </div>
    );
}
