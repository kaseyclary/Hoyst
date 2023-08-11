import clientPromise from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { title, sets, userId, date, workoutId } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("LiftingApp");
    const collection = db.collection('lifts');

    const result = await collection.insertOne({
      workoutId,
      date,
      title,
      sets,
      userId,
    });

    return res.status(200).json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while saving the lift' });
  }
}
