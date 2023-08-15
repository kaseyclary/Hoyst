import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/db';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).end(); // Method Not Allowed
    }

    const workoutId = req.query.workoutId;

    if (!workoutId) {
        return res.status(400).json({ error: 'Workout ID is required' });
    }

    try {
        console.log('workoutId:', workoutId)
        const client = await clientPromise;
        const db = client.db('LiftingApp'); // Assuming 'LiftingApp' is your database name

        // Fetch the workout data using the provided _id
        const workout = await db.collection('workouts').findOne({ _id: new ObjectId(workoutId) });

        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }

        return res.status(200).json(workout);

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Failed to fetch the workout' });
    }
}
