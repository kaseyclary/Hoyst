import { useState, useEffect } from 'react';
import { useUser } from "@/userContext";
import { useRouter } from 'next/router';

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
    

    return (
        <div className="w-full">
            <div className="w-5/6 mx-auto flex items-center pb-3">
                {workout.likes.length === 1 ? (
                    <div className="flex items-center">
                        <img src ={workout.likes[0].userPhoto} className="h-[27px] w-[27px] rounded-full mr-1"/>
                        <p className="text-xs font-semibold">Knucks from {workout.likes[0].userName}</p>
                    </div>
                ) : workout.likes.length === 2 ? (
                    <div className="flex items-center">
                        <div className="flex">
                            <img src ={workout.likes[0].userPhoto} className="h-[27px] w-[27px] border-[2px] border-white rounded-full drop-shadow"/>
                            <img src={workout.likes[1].userPhoto} className="h-[27px] w-[27px] -ml-3 rounded-full mr-1"/>
                        </div>
                        <p className="text-xs font-semibold">Knucks from {workout.likes[0].userName} and {workout.likes.length - 1} other</p>
                    </div>
                ) : workout.likes.length === 2 ? (
                    <div className="flex items-center">
                        <div className="flex">
                            <img src ={workout.likes[0].userPhoto} className="h-[27px] w-[27px] border-[2px] border-white rounded-full drop-shadow"/>
                            <img src ={workout.likes[0].userPhoto} className="h-[27px] w-[27px] border-[2px] border-white rounded-full drop-shadow"/>
                            <img src={workout.likes[1].userPhoto} className="h-[27px] w-[27px] -ml-3 rounded-full mr-1"/>
                        </div>
                        <p className="text-xs font-semibold">Knucks from {workout.likes[0].userName} and {workout.likes.length - 1} others</p>
                    </div>
                ) : (
                    <p className="text-xs font-semibold">Be the first to give knucks</p>
                )}  
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
                <div className="w-full flex justify-center">
                    <img
                        src="/comment.png"
                        alt="Description of Image"
                        width={25}
                        height={25}
                    />
                </div>
            </div>
        </div>
    );
}
