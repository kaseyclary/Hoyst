
import { useEffect, useState } from 'react'
import { formatDate, countSets } from '@/lib/utils'
import { WorkoutSummary } from './WorkoutSummary'
import { FullWorkout } from './FullWorkout'
import { FistBumpIcon, EllipsisIcon } from '../icons'
import { useUser } from '@/userContext'
import SocialSection from './SocialSection'
import WorkoutMenu from './WorkoutMenu'
import { useRouter } from 'next/router'


export default function WorkoutCard ({workout: initialWorkout}) {

    const [isExpanded, setIsExpanded] = useState(false)

    const [ellipsisIsSelected, setEllipsisIsSelected] = useState(false)

    const [isUserWorkout, setIsUserWorkout] = useState(false)

    const [workout, setWorkout] = useState(initialWorkout);

    const [toggleConfirmDelete, setToggleConfirmDelete] = useState(false);

    const { user, removeUserWorkout } = useUser();

    const router = useRouter();

    const handleLikeUpdate = (workoutId) => {
      if (workout._id === workoutId) {
        const updatedLikes = workout.likes.includes(user.email)
          ? workout.likes.filter(email => email !== user.email)
          : [...workout.likes, user.email];
        
        setWorkout({
          ...workout,
          likes: updatedLikes
        });
      }
    };

    useEffect(() => {
        if (user) {
            if (user.email === workout.userId) {
                setIsUserWorkout(true)
            }
        }
    }, [user])

    const handleEllipsisClick = () => {
        setEllipsisIsSelected(!ellipsisIsSelected)
    }

    const handleToggleConfirmDelete = () => {
        setToggleConfirmDelete(!toggleConfirmDelete)
        setEllipsisIsSelected(false)
    }

    const deleteWorkout = async () => {
        try {
            const response = await fetch('/api/workouts/deleteWorkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    workoutId: initialWorkout._id,
                    userEmail: user.email,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Handle successful deletion. You might want to remove the workout from the UI or navigate the user elsewhere.
                console.log(data.message);
                handleToggleConfirmDelete();
                removeUserWorkout(initialWorkout._id); 
                router.push('/Home');                
            } else {
                // Handle any errors that come from the server
                console.error(data.error);
            }
        } catch (error) {
            // Handle any network errors
            console.error("Network error:", error);
        }
    };
    




    const ConfirmDeleteModal = () => {
        return toggleConfirmDelete ? (
            <div>
                <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 z-50 flex items-center justify-center">
                    <div className="bg-white shadow-lg w-[400px] h-[200px] flex flex-col items-center justify-center text-center px-6">
                        <h2 className="font-medium mb-4">Are you sure you want to delete <span className="font-semibold">{initialWorkout.name}</span> from {formatDate(initialWorkout.date)}?</h2>
                        <div className="flex">
                            <button className="bg-red-600 text-white px-4 py-2 rounded mr-2" onClick={() => deleteWorkout()}>Delete</button>
                            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={handleToggleConfirmDelete}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    }


    return (
        <div className="w-full bg-white rounded-lg shadow mb-4 text-slate-700 overflow-x-hidden">
            <ConfirmDeleteModal />
            <div className="w-full mx-auto px-6 pt-6 pb-3">
                    <div>
                        <div className="w-full flex justify-between">
                            <div className="mb-3">
                                <div className="flex items-center mb-1">
                                    <img src={workout.photoUrl} className="w-[45px] h-[45px] mr-2 rounded-full"/>
                                    <div>
                                        <div>
                                            <h3 className="font-semibold text-sm mb-[3px]">{workout.userName}</h3>
                                        </div>
                                        <div className="flex items-center h-full w-full">
                                            <img src="/barbell.png" className="w-[17px] h-[17px] mr-1"/>
                                            <p className="text-xs font-medium">{formatDate(workout.date)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {isUserWorkout ? ((
                                <div className="w-fit">
                                    <EllipsisIcon height={25} width={25} color={ellipsisIsSelected ?  "#64748b" : "#94a3b8"} handleEllipsisClick={handleEllipsisClick} isSelected={ellipsisIsSelected}/>
                                    <WorkoutMenu isOpen={ellipsisIsSelected} workout={workout} handleToggleConfirmDelete={handleToggleConfirmDelete}/>
                                </div>
                            )) : null}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold mb-1">{workout.name}</h2>
                            <div className="flex w-1/2 mb-6">
                                <p className="text-sm font-medium">{workout.lifts.length} Total Lifts, {countSets(workout.lifts)} Total Sets</p>
                            </div>
                        </div>
                    </div>
                    {isExpanded ? ( 
                        <FullWorkout workout={workout} />
                    ) : (<WorkoutSummary workout={workout} />)}
                    <button onClick={() => setIsExpanded(!isExpanded)} className="w-full text-center bg-orange-600 py-3 text-sm font-semibold text-white rounded">{isExpanded ? "Close" : "See Full Workout"}</button>
            </div>
            <SocialSection workout={workout} onLikeUpdate={handleLikeUpdate} />
        </div>
    )
}
