import clientPromise from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, lifts, userId, date, description, visibility } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("LiftingApp");
    const collection = db.collection('workouts');

    const user = await db.collection('users').findOne({ email: userId });
    const userName = user.firstName + ' ' + user.lastName;    

    const liftTypes = lifts.map((lift) => lift.liftType);

    // Create an array of all liftTypes that are not in the user's liftTypes array
    const newLiftTypes = liftTypes.filter((liftType) => !user.liftTypes.includes(liftType));

    const result = await collection.insertOne({
      name,
      date,
      description,
      lifts,
      userName,
      userId,
      likes: [],
      comments: [],
      photoUrl: user.photoUrl,
      visibility
    });

    // Optionally, update the user's "workouts" array with the new workout ID
    const usersCollection = db.collection('users');
    await usersCollection.updateOne({ email: userId }, { $push: { workouts: result.insertedId } });

    if (newLiftTypes.length > 0) {
      await usersCollection.updateOne(
        { email: userId },
        { $push: { liftTypes: { $each: newLiftTypes } } }
      );
    }

    return res.status(200).json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while saving the workout' });
  }
}
