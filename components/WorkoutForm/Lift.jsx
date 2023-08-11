import React, { useState } from 'react';
import { useWorkout } from '@/workoutContext';
import { liftTypes } from '../../lib/utils'
import Select from 'react-select';
import Set from '@/components/WorkoutForm/Set';

const Lift = ({ liftIndex }) => {

  const { 
    workout, 
    handleLiftNameChange,
    handleDeleteLift,
    handleAddSet,
   } = useWorkout();

   const selectedLift = liftTypes.find(lift => lift.label === workout.lifts[liftIndex].name);

  return (
    <div className="border p-4 rounded mb-4 bg-white">
      <div className="flex items-center mb-4">
        <Select 
          type="text" 
          name="name" 
          placeholder="Lift Name"
          options={liftTypes}
          value={selectedLift}
          onChange={(selectedOption) => handleLiftNameChange(selectedOption.label, liftIndex)}
          className="rounded w-full" 
          required 
        />
      </div>
      <div>
        {workout.lifts[liftIndex].sets.map((set, setIndex) => (
          <Set key={setIndex} liftIndex={liftIndex} setIndex={setIndex} />
        ))}
      </div>
      <div className="flex justify-between mt-5">
        <button onClick={() => {handleDeleteLift(liftIndex)}} className="px-3 py-2 rounded text-white text-sm font-medium bg-red-600 w-full mr-3 hover:bg-red-500 transition-colors duration-200 ease-in-out">Delete Lift</button>
        <button onClick={() => handleAddSet(liftIndex)} className="px-3 py-2 rounded text-white text-sm font-medium bg-slate-600 w-full hover:bg-slate-00 transition-colors duration-200 ease-in-out">Add Set</button>
      </div>
    </div>
  );
};

export default Lift;
