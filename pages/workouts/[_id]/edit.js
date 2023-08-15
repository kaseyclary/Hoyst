import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useWorkout } from '@/workoutContext';
import Lift from '@/components/WorkoutForm/Lift';
import { toast } from 'react-toastify';
import Set from '@/components/WorkoutForm/Set';

export default function EditWorkout({ workoutData }) {
    const router = useRouter();
    const { _id } = router.query; // This captures the workout ID from the URL
    
    // Fetch the workout data using _id if needed
    // You can use useEffect to fetch data when _id is available
    let prevWorkout = null;

    const { 
        workout, 
        setWorkout,
        handleWorkoutNameChange,
        handleWorkoutDateChange,
        handleWorkoutDescriptionChange,
        handleAddLift,
        handleWorkoutReview,
        submitWorkout,
        clearWorkout,
        editWorkout,
      } = useWorkout();

    const handleSubmitEdit = () => {
        editWorkout();
    }

    useEffect(() => {
        prevWorkout = workout;
        setWorkout(workoutData);
    }, [workoutData]);

    useEffect(() => {
        const handleRouteChange = () => {
            setWorkout(prevWorkout); // Reset the workout to its previous state so it doesn't delete an in-progress workout
        };
    
        router.events.on('routeChangeStart', handleRouteChange);
    
        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, []);

    return (
        <div className="w-screen min-h-screen bg-slate-200">
            <div className="min-h-screen max-w-[600px] mx-auto pt-[100px] pb-20 px-4">
            <h3 className="text-2xl font-semibold text-slate-700 mb-4">Edit Workout</h3>
            <textarea className="w-full p-2 border border-gray-300 rounded mb-3 h-[100px]" placeholder="How did it feel? Share some takeaways from today's session." value={workout.description} onChange={(e) => handleWorkoutDescriptionChange(e.target.value)} />
            <form className="">
                <input type="text" placeholder="Workout Name" value={workout.name} onChange={(e) => handleWorkoutNameChange(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-3" />
                <input type="datetime-local" value={workout.date} onChange={(e) => handleWorkoutDateChange(e.target.value)} className="p-2 border border-gray-300 w-full rounded mb-3" required />
                {workout.lifts.map((lift, index) => (
                <Lift key={index} liftIndex={index} />
                ))}
            </form>
            <div className="w-full flex justify-between px-4">
                <button className="px-3 py-2 bg-slate-600 text-white font-medium rounded w-full mr-3 hover:bg-slate-500 transition-colors duration-200 ease-in-out" onClick={handleAddLift}>Add Lift</button>
                <button className="px-3 py-2 bg-orange-600 text-white font-medium rounded w-full hover:bg-orange-500 transition-colors duration-200 ease-in-out" onClick={handleSubmitEdit}>Submit Edit</button>
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
