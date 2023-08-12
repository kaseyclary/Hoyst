import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { userId, userName, workoutId } = req.body;

  // Check if necessary data is provided
  if (!userId || !userName || !workoutId) {
    return res.status(400).json({ error: 'Required fields missing' });
  }

  try {
    console.log('userId', userId, 'userName', userName, 'workoutId', workoutId)
    const client = await clientPromise;
    const db = client.db("LiftingApp");

    // Update the workout's likes array by adding the user's email
    const workoutCollection = db.collection('workouts');
    const result = await workoutCollection.findOneAndUpdate(
      { _id: new ObjectId(workoutId) },
      { $addToSet: { likes: userId } }, 
      { returnOriginal: false }
    );

    if (!result.value) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    // Update the user's likedWorkouts array by adding the workoutId
    const usersCollection = db.collection('users');
    await usersCollection.findOneAndUpdate(
      { email: userId }, 
      { $addToSet: { likedWorkouts: workoutId } },
      { returnOriginal: false }
    );

    // Return the updated workout
    return res.status(200).json({ workout: result.value });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to like workout' });
  }
}
