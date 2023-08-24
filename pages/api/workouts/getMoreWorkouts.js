import { getSession } from 'next-auth/react';
import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  // Check for the HTTP method. We only want to accept GET.
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const client = await clientPromise;
  const db = client.db('LiftingApp');
  
  // Check if the user exists in the "users" collection
  const userCollection = db.collection('users');
  const user = await userCollection.findOne({ email: session.user.email });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Fetch workouts of the user and those they are following
  const usersToFetchWorkoutsFor = [session.user.email, ...user.following];
  
  const workoutCollection = db.collection('workouts');

  // Pagination: Use the "page" query parameter. If it's not provided, default to page 2.
  const page = parseInt(req.query.page, 10) || 2;
  const limit = 10;  // Number of workouts per page.
  const skip = (page - 1) * limit;

  const existingIds = req.query.existingIds ? JSON.parse(req.query.existingIds) : [];
  console.log(existingIds);

  const workouts = await workoutCollection
    .find({ 
        userId: { $in: usersToFetchWorkoutsFor },
    })
    .skip(skip)
    .limit(limit)
    .sort({ date: -1 })
    .toArray();

  // Filter workouts based on visibility
  const filteredWorkouts = workouts.filter((workout) => {
    if (workout.visibility === 'public' || !workout.visibility) {
      return true;
    } else if (workout.visibility === 'private' && workout.userId === session.user.email) {
      return true;
    } else {
      return false;
    }
  });

  // Convert ObjectIDs to strings
  const serializedWorkouts = filteredWorkouts.map((workout) => ({
    ...workout,
    _id: workout._id.toString(),
  }));

  return res.status(200).json(serializedWorkouts);
}
