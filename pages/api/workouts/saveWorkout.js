import clientPromise from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, lifts, userId, date, } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("LiftingApp");
    const collection = db.collection('workouts');

    const user = await db.collection('users').findOne({ email: userId });
    const userName = user.firstName + ' ' + user.lastName;    

    const result = await collection.insertOne({
      name,
      date,
      lifts,
      userName,
      userId
    });

    // Optionally, update the user's "workouts" array with the new workout ID
    const usersCollection = db.collection('users');
    await usersCollection.updateOne({ email: userId }, { $push: { workouts: result.insertedId } });

    return res.status(200).json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while saving the workout' });
  }
}
