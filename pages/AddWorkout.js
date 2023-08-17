import React from 'react';
import { useWorkout } from '@/workoutContext';
import Lift from '@/components/WorkoutForm/Lift';
import { useRouter } from 'next/router';

const AddWorkout = () => {
  const { 
    workout, 
    handleWorkoutNameChange,
    handleWorkoutDateChange,
    handleAddLift,
    handleWorkoutReview,
    submitWorkout,
    clearWorkout,
  } = useWorkout();

  const router = useRouter();

  return (
    <div className="w-screen min-h-screen bg-slate-200">
      <div className="min-h-screen max-w-[600px] mx-auto pt-[100px] pb-20 px-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold text-slate-700 mb-4">Record a Workout</h3>
          <button 
                  className="mb-3 px-3 py-2 rounded text-white text-sm font-medium bg-red-600 hover:bg-red-500 transition-colors duration-200 ease-in-out full-height-button"
                  onClick={clearWorkout}
              >
                  Clear Workout
          </button>
        </div>
        <form className="">
          <div className="flex items-center mb-3">
              <input 
                  type="text" 
                  placeholder="Workout Name" 
                  value={workout.name} 
                  onChange={(e) => handleWorkoutNameChange(e.target.value)} 
                  className="w-full p-2 border border-gray-300 rounded flex-grow" 
              />
          </div>
          <input type="datetime-local" value={workout.date} onChange={(e) => handleWorkoutDateChange(e.target.value)} className="p-2 border border-gray-300 w-full rounded mb-3" required />
          {workout.lifts.map((lift, index) => (
            <Lift key={`${index}-${workout.date}`} liftIndex={index} />
          ))}
        </form>
        <div className="w-full flex justify-between px-4">
          <button className="px-3 py-2 bg-slate-600 text-white font-medium rounded w-full mr-3 hover:bg-slate-500 transition-colors duration-200 ease-in-out" onClick={handleAddLift}>Add Lift</button>
          <button className="px-3 py-2 bg-orange-600 text-white font-medium rounded w-full hover:bg-orange-500 transition-colors duration-200 ease-in-out" onClick={handleWorkoutReview}>Submit Workout</button>
        </div>
      </div>
    </div>
  );
};

export default AddWorkout;
