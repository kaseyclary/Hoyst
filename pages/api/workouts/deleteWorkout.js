const { ObjectId } = require('mongodb');


import clientPromise from '@/lib/db';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    const { workoutId, userEmail } = req.body; // Assuming the workout ID and user email are sent in the request body

    if (!workoutId || !userEmail) {
        return res.status(400).json({ error: 'Workout ID and user email are required' });
    }

    try {
        const client = await clientPromise;
        const db = client.db('LiftingApp'); // Assuming 'LiftingApp' is your database name

        // 1. Delete the workout from the workouts collection
        const workoutResult = await db.collection('workouts').deleteOne({ _id: new ObjectId(workoutId) });

        if (workoutResult.deletedCount === 0) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        // 2. Remove the workout ID from the user's workouts array
        const userResult = await db.collection('users').updateOne(
            { email: userEmail },
            { $pull: { workouts: new ObjectId(workoutId) } }
        );

        if (userResult.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json({ message: 'Workout deleted successfully' });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Failed to delete the workout' });
    }
}
