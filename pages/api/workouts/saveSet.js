import clientPromise from '../../../lib/db';
import { calculateOneRepMax } from '../../../lib/utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { reps, weight, userId, workoutId, date } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("LiftingApp");
    const collection = db.collection('sets');

    const result = await collection.insertOne({
      userId,
      workoutId,
      date,
      reps,
      weight,
      volume: reps * weight,
      oneRepMax: calculateOneRepMax(reps, weight),
    });

    return res.status(200).json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while saving the set' });
  }
}
