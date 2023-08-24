// pages/api/updateWorkouts.js

import clientPromise from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const client = await clientPromise;
    await client.connect();

    const db = client.db('LiftingApp');
    const workoutsCollection = db.collection('workouts');
    const usersCollection = db.collection('users');

    const cursor = workoutsCollection.find({});

    await cursor.forEach(async (workout) => {
      const user = await usersCollection.findOne({ email: workout.userId });
      if (user && user.gender) {
        await workoutsCollection.updateOne(
          { _id: workout._id },
          { $set: { gender: user.gender } }
        );
      }
    });

    res.status(200).json({ message: 'Workouts updated successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update workouts.' });
  }
}
