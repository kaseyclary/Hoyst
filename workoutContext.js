import React, { createContext, useState, useContext, useEffect } from 'react';
import { calculateOneRepMax } from './lib/utils';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { liftsWithCalculations } from './lib/utils';
import { toast } from 'react-toastify';

const WorkoutContext = createContext();

export const useWorkout = () => {
  return useContext(WorkoutContext);
};

  export const WorkoutProvider = ({ children }) => {
    const [workout, setWorkout] = useState({
      name: '',
      date: new Date().toISOString().slice(0, 16),
      lifts: [{ sets: [{}] }],
      description: '',
      visibility: 'public',
  });

  useEffect(() => {
    // Load the stored workout only on the client side
    const storedWorkout = JSON.parse(localStorage.getItem('workout'));
    if (storedWorkout) {
        setWorkout(storedWorkout);
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever the workout state changes
    localStorage.setItem('workout', JSON.stringify(workout));
  }, [workout]);

    const { data: session } = useSession();
    const router = useRouter();

  //Workout Details

  const submitWorkout = async () => {
    try {
      // Save the workout
      const workoutResponse = await fetch('/api/workouts/saveWorkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: workout.name,
          date: workout.date,
          description: workout.description,
          lifts: liftsWithCalculations(workout.lifts),
          userId: session.user.email,
          visibility: workout.visibility,
        }),
      });
  
      if (!workoutResponse.ok) {
        // Handle error, possibly throw an error or update state
        return;
      }
  
      const workoutData = await workoutResponse.json();
      console.log('Workout Response:', workoutData);
        clearWorkout();
        router.push('/Home');
  
      // Success handling here, possibly update state or navigate to a success page
    } catch (error) {
      // Handle any unexpected errors, possibly update state with an error message
    }
  };

  const handleWorkoutReview = () => {
    if (workout.name === '') {
      workout.name = 'Lifting Session'
      router.push('/SubmitWorkout');
    } else {
      router.push('/SubmitWorkout');
    }
  }

  const editWorkout = async () => {
    try {
      const response = await fetch('/api/workouts/editWorkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workoutId: workout._id,
          name: workout.name,
          description: workout.description,
          date: workout.date,
          lifts: liftsWithCalculations(workout.lifts),
          visibility: workout.visibility,
        }),
      });
  
      if (!response.ok) {
        // Handle error, possibly throw an error or update state
        throw new Error('Failed to edit workout');
      }
  
      const data = await response.json();
  
      // Optionally, navigate to another page or display a success message
      toast.success("Workout edited successfully!", {
        position: 'top-center',
        autoClose: 1250,
      });
      clearWorkout();
      router.push('/Home');
  
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
        autoClose: 1250,
      });
    }
  };
  

  const clearWorkout = () => {
    setWorkout({
      name: '',
      date: new Date().toISOString().slice(0, 16),
      lifts: [{ sets: [{}] }],
      description: '',
      userId: session.user.email,
      visibility: 'public',
    });
  };


  const handleWorkoutNameChange = (name) => {
    setWorkout({ ...workout, name: name });
  };

  const handleWorkoutDateChange = (date) => {
    setWorkout({ ...workout, date: date });
  };

  const handleWorkoutDescriptionChange = (description) => {
    setWorkout({ ...workout, description: description });
  };

  const handleVisibilityChange = (visibility) => {
    setWorkout(prevWorkout => ({
      ...prevWorkout,
      visibility: visibility,
    }));
  };

  //Lift Details

  const handleAddLift = () => {
    const newLifts = [...workout.lifts];
    newLifts.push({ sets: [{}] });;
    setWorkout({ ...workout, lifts: newLifts });
  };


  const handleLiftNameChange = (name, index) => {
    const newLifts = [...workout.lifts];
    newLifts[index].name = name;
    setWorkout({ ...workout, lifts: newLifts });
  };

  const handleDeleteLift = (index) => {
    if (workout.lifts.length === 1) {
      toast.error("Can't delete the only lift!", {
        position: 'top-center',
        autoClose: 1250,
      });
    } else {
        const newLifts = [...workout.lifts];
        newLifts.splice(index, 1);
        setWorkout({ ...workout, lifts: newLifts });
    }
  };

  //Set Details

  const handleAddSet = (liftIndex) => {
    const newLifts = [...workout.lifts];
    const newSets = [...newLifts[liftIndex].sets];
    newSets.push({});
    newLifts[liftIndex].sets = newSets; // Assign the new sets to the specific lift
    setWorkout({ ...workout, lifts: newLifts });
};

const handleDeleteSet = (liftIndex, setIndex) => {
    const newLifts = [...workout.lifts];
    const newSets = [...newLifts[liftIndex].sets];
    if (newSets.length === 1) {
        toast.error("Can't delete the lift's only set!", {
            position: 'top-center',
            autoClose: 1250,
        });
    } else {
        newSets.splice(setIndex, 1);
        newLifts[liftIndex].sets = newSets;
        setWorkout({ ...workout, lifts: newLifts });
    }
};

const handleWeightChange = (liftIndex, setIndex, weight) => {
    const newLifts = [...workout.lifts];
    const newSets = [...newLifts[liftIndex].sets];
    newSets[setIndex].weight = weight;
    newLifts[liftIndex].sets = newSets;
    setWorkout({ ...workout, lifts: newLifts });
};

const handleRepsChange = (liftIndex, setIndex, reps) => {
    const newLifts = [...workout.lifts];
    const newSets = [...newLifts[liftIndex].sets];
    newSets[setIndex].reps = reps;
    newLifts[liftIndex].sets = newSets;
    setWorkout({ ...workout, lifts: newLifts });
};

  return (
    <WorkoutContext.Provider value={{ 
        workout,
        setWorkout,
        handleWorkoutNameChange, 
        handleWorkoutDateChange,
        handleVisibilityChange,
        handleWorkoutDescriptionChange,
        handleAddLift,
        handleLiftNameChange,
        handleDeleteLift,
        handleAddSet,
        handleDeleteSet,
        handleWeightChange,
        handleRepsChange,
        handleWorkoutReview,
        submitWorkout,
        clearWorkout,
        editWorkout,
    }}>
      {children}
    </WorkoutContext.Provider>
  );
};