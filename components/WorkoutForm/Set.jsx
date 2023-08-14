import React, { useState } from 'react';
import { useWorkout } from '@/workoutContext';
import { XIcon } from '@/components/icons';
import { calculateOneRepMax } from '@/lib/utils';

const Set = ({ liftIndex, setIndex }) => {
  const {
    workout,  
    handleDeleteSet,
    handleWeightChange,
    handleRepsChange, 
  } = useWorkout();

  let oneRepMax = 0;

  return (
    <div>
      <div className="flex justify-center items-center space-x-2 mb-2 w-full">
        <input type="number" inputMode="numeric" pattern="[0-9]*" name="weight" placeholder="Weight" className="p-2 border rounded w-full" value={workout.lifts[liftIndex].sets[setIndex].weight} onChange={(e) => handleWeightChange(liftIndex, setIndex, e.target.value)} required />
        <div className="">
          <XIcon height={20} width={20} color={'gray'} />
        </div>
        <input type="number" inputMode="numeric" pattern="[0-9]*" name="reps" placeholder="Reps" className="p-2 border rounded w-full" value={workout.lifts[liftIndex].sets[setIndex].reps} onChange={(e) => handleRepsChange(liftIndex, setIndex, e.target.value)} required />
        <p className="w-full text-sm">1RM: {isNaN(calculateOneRepMax(workout.lifts[liftIndex].sets[setIndex].weight, workout.lifts[liftIndex].sets[setIndex].reps)) ? 0 : calculateOneRepMax(workout.lifts[liftIndex].sets[setIndex].weight, workout.lifts[liftIndex].sets[setIndex].reps)}</p>
        <button onClick={() => handleDeleteSet(liftIndex, setIndex)} className="rounded text-xl text-white font-bold bg-red-600 p-[5px] flex justify-center items-center">
          <XIcon height={18} width={18} color={'white'} />
        </button>
      </div>
    </div>
  );
};

export default Set;
