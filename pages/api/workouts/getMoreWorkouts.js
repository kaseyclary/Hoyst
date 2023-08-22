import { getSession } from 'next-auth/react';
import clientPromise from '@/lib/db';

export default async (req, res) => {
    const session = await getSession({ req });
    
    if (!session) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
    }

    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;

    const client = await clientPromise;
    const db = client.db('LiftingApp');
  
    // Check if the user exists in the "users" collection
    const userCollection = db.collection('users');
    const user = await userCollection.findOne({ email: session.user.email });

    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }

    // Fetch workouts of the user and those they are following
    const usersToFetchWorkoutsFor = [session.user.email, ...user.following];
    
    const workoutCollection = db.collection('workouts');
    const workouts = await workoutCollection
        .find({ userId: { $in: usersToFetchWorkoutsFor } })
        .limit(pageSize)
        .skip((page - 1) * pageSize)
        .toArray();

    // Filter workouts for visibility
    const filteredWorkouts = workouts.filter((workout) => {
        if (workout.visibility === 'public' || !workout.visibility) {
            return true;
        } else if (workout.visibility === 'private' && workout.userId === session.user.email){
            return true;
        } else {
            return false;
        }
    });

    res.json(filteredWorkouts);
};
