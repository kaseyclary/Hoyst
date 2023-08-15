import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { userId, workoutId } = req.body;

    if (!userId || !workoutId) {
        return res.status(400).json({ error: 'Required fields missing' });
    }

    try {
        const client = await clientPromise;
        const db = client.db("LiftingApp");

        // Remove the user's userId from the workout's likes
        const workoutCollection = db.collection('workouts');
        const result = await workoutCollection.findOneAndUpdate(
            { _id: new ObjectId(workoutId) },
            { $pull: { likes: { userId: userId } } }, // Pulling by matching the userId in the nested objects
            { returnOriginal: false }
        );

        if (!result.value) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        // Remove the workoutId from the user's likedWorkouts array
        const usersCollection = db.collection('users');
        await usersCollection.findOneAndUpdate(
            { email: userId },
            { $pull: { likedWorkouts: workoutId } },
            { returnOriginal: false }
        );

        // Return the updated workout
        return res.status(200).json({ workout: result.value });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to unlike workout' });
    }
}
