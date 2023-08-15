// api/users/getUserProfiles.js

import clientPromise from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { emails } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("LiftingApp");
    
    // Fetch users based on the provided emails
    const users = await db.collection('users').find({ email: { $in: emails } }).toArray();

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching user profiles' });
  }
}
