import { useState, useEffect } from 'react';
import { useUser } from "@/userContext";

export default function SocialSection ({workout}) {
    const { user, toggleLikeWorkout, fetchUser } = useUser();
    const [isLiked, setIsLiked] = useState(false);

    // On mount, check if the workout is already liked by the user
    useEffect(() => {
        if (user) {
            setIsLiked(user.likedWorkouts.includes(workout._id));
        }
    }, [workout, user]);

    const handleLikeToggle = async () => {
        if (!user) return; // Exit the function if user isn't loaded yet
        await toggleLikeWorkout(workout._id);  // Use the toggle function directly
        setIsLiked(prevState => !prevState);
        fetchUser();  // Refetch the user to update the likes array
    };
    

    return (
        <div className="w-full">
            <div className="w-3/4 mx-auto flex items-center pb-3">
                {workout.likes.length > 0 ? (
                    <p className="text-sm font-semibold">{workout.likes.length} Knucks</p>
                ) : (
                    <p className="text-sm font-semibold">Be the first to give knucks</p>
                )}  
            </div>
            <div className="h-full w-3/4 mx-auto flex justify-around items-center border-t py-4">
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
