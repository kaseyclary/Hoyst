import React, { createContext, useReducer, useEffect, useState, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { LoaderComponent } from './components/ui';

const UserContext = createContext(null);

export default UserContext;

export const useUser = () => {
  return useContext(UserContext);
};

const userReducer = (state, action) => {
    switch(action.type) {
        case 'SET_USER':
            return action.payload;
        case 'ADD_FOLLOWER':
            return {
                ...state,
                following: [...state.following, action.payload]
            };
        case 'REMOVE_FOLLOWER':
            return {
                ...state,
                following: state.following.filter(email => email !== action.payload)
            };
        case 'LIKE_WORKOUT':
            return {
                ...state,
                likedWorkouts: [...state.likedWorkouts, action.payload]
            };
        case 'UNLIKE_WORKOUT':
            return {
                ...state,
                likedWorkouts: state.likedWorkouts.filter(id => id !== action.payload)
            };
        case 'REMOVE_WORKOUT':
          return {
              ...state,
              workouts: state.workouts.filter(workoutId => workoutId !== action.payload)
          };

        case 'ADD_COMMENT':
          return {
              ...state,
              comments: [...state.comments, action.payload]
          };
          
        default:
            return state;
    }
};

export const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, dispatch] = useReducer(userReducer, null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (session) {
      try {
        const res = await fetch(`/api/users/getUser?email=${session.user.email}`);
        const data = await res.json();
        dispatch({ type: 'SET_USER', payload: data.user });
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
      setLoading(false);
    } else {
      dispatch({ type: 'SET_USER', payload: null });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [session]);


  const addFollower = async (friendEmail) => {

    try {
        const res = await fetch('/api/social/followUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: session.user.email,
                friendEmail,
            }),
        });

        if (!res.ok) {
            dispatch({ type: 'REMOVE_FOLLOWER', payload: friendEmail }); // revert optimistic update
            // Handle error, possibly throw an error or show a message to the user
            return;
        }

        const data = await res.json();
        dispatch({ type: 'SET_USER', payload: data.user });

    } catch (error) {
        dispatch({ type: 'REMOVE_FOLLOWER', payload: friendEmail }); // revert optimistic update
        console.error('Failed to add friend:', error);
    }
  };

  const removeFollower = async (friendEmail) => {

    try {
        const res = await fetch('/api/social/unfollowUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: session.user.email,
                friendEmail,
            }),
        });

        if (!res.ok) {
            dispatch({ type: 'ADD_FOLLOWER', payload: friendEmail }); // revert optimistic update
            return;
        }

        const data = await res.json();
        dispatch({ type: 'SET_USER', payload: data.user });

    } catch (error) {
        dispatch({ type: 'ADD_FOLLOWER', payload: friendEmail }); // revert optimistic update
        console.error('Failed to remove friend:', error);
    }
  };

  const toggleLikeWorkout = async (workoutId) => {
    try {
        const endpoint = user.likedWorkouts.includes(workoutId) ? '/api/social/unlikeWorkout' : '/api/social/likeWorkout';
        
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: session.user.email,
                userName: user.firstName + " " + user.lastName,
                userPhoto: user.photoUrl,
                workoutId,
            }),
        });

        if (!res.ok) {
            // Handle error, possibly throw an error or show a message to the user
            return;
        }

        const data = await res.json();

        // Update the context based on the action (like/unlike)
        const actionType = endpoint === '/api/social/likeWorkout' ? 'LIKE_WORKOUT' : 'UNLIKE_WORKOUT';
        dispatch({ type: actionType, payload: workoutId });
    } catch (error) {
        console.error('Failed to toggle like on workout:', error);
    }
  };

  const removeUserWorkout = (workoutId) => {
    dispatch({ type: 'REMOVE_WORKOUT', payload: workoutId });
  };

  return (
    <UserContext.Provider value={{ user, addFollower, removeFollower, toggleLikeWorkout, fetchUser, removeUserWorkout }}>
      {loading ? <LoaderComponent /> : children}
    </UserContext.Provider>
  );
};
