import clientPromise from '../../../lib/db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    const { workoutId, name, lifts, date, description } = req.body;

    if (!workoutId) {
        return res.status(400).json({ error: 'Workout ID is required' });
    }

    try {
        const client = await clientPromise;
        const db = client.db("LiftingApp");
        const collection = db.collection('workouts');

        // Update the workout with the new details
        const result = await collection.updateOne(
            { _id: new ObjectId(workoutId) }, // Filter
            {
                $set: {
                    name: name,
                    description: description,
                    date: date,
                    lifts: lifts
                }
            }
        );

        // Check if the update was successful
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'Workout not found or no modifications were made' });
        }

        return res.status(200).json({ success: true, message: 'Workout updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while editing the workout' });
    }
}
