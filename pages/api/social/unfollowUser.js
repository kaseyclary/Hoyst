// pages/api/users/unfollowUser.js
import clientPromise from '@/lib/db';

export default async function handler(req, res) {
  const { userId, friendEmail } = req.body;

  if (!userId || !friendEmail) {
    return res.status(400).json({ error: 'Both userId and friendEmail are required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('LiftingApp');
    
    // Remove friendEmail from the current user's following list
    const result = await db.collection('users').findOneAndUpdate(
      { email: userId },
      { $pull: { following: friendEmail } },
      { returnOriginal: false }
    );

    if (!result.value) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove the userId from the friend's followers list
    await db.collection('users').findOneAndUpdate(
      { email: friendEmail },
      { $pull: { followers: userId } }
    );

    res.status(200).json({ user: result.value });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to unfollow user' });
  }
}
