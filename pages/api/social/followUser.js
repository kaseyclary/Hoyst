// pages/api/users/followUser.js
import clientPromise from '@/lib/db';

export default async function handler(req, res) {
  const { userId, friendEmail } = req.body;

  if (!userId || !friendEmail) {
    return res.status(400).json({ error: 'Both userId and friendEmail are required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('LiftingApp');
    
    // Add friendEmail to the current user's following list
    const userUpdateResult = await db.collection('users').findOneAndUpdate(
      { email: userId },
      { $addToSet: { following: friendEmail } },
      { returnOriginal: false }
    );

    if (!userUpdateResult.value) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add userId to the friend's followers list
    const friendUpdateResult = await db.collection('users').findOneAndUpdate(
      { email: friendEmail },
      { $addToSet: { followers: userId } },
      { returnOriginal: false }
    );

    if (!friendUpdateResult.value) {
      return res.status(404).json({ error: 'Friend not found' });
    }

    // Return the updated user details
    res.status(200).json({ user: userUpdateResult.value });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to follow user' });
  }
}
