// File: pages/api/social/addComment.js

import clientPromise from '@/lib/db';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { workoutId, userId, userName, userPhoto, comment, createdAt } = req.body;

  // Check if necessary data is provided
  if (!workoutId || !userId || !userName || !comment) {
    return res.status(400).json({ error: 'Required fields missing' });
  }

  try {
    const client = await clientPromise;
    const db = client.db("LiftingApp");

    // Update the workout's comments array by adding the new comment
    const workoutCollection = db.collection('workouts');
    const userCollection = db.collection('users');

    // Create a common comment object for both updates
    const commentForWorkout = {
      userId,
      userName,
      userPhoto,
      comment,
      createdAt
    };

    const commentForUser = {
      workoutId,
      comment,
      createdAt
    };

    // Update the workout with the comment
    const workoutUpdateResult = await workoutCollection.findOneAndUpdate(
      { _id: new ObjectId(workoutId) },
      { 
        $push: {
          comments: commentForWorkout
        }
      },
      { returnOriginal: false }
    );

    if (!workoutUpdateResult.value) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    // Update the user with the comment
    const userUpdateResult = await userCollection.findOneAndUpdate(
      { email: userId },
      {
        $push: {
          comments: commentForUser
        }
      }
    );

    if (!userUpdateResult.value) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the updated workout
    return res.status(200).json({ workout: workoutUpdateResult.value });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to add comment' });
  }
}
