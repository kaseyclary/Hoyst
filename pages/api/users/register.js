import clientPromise from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email, firstName, lastName, experience, phoneNumber, weight } = req.body;

  // Validate the data
  if (!firstName || !lastName || !experience || !phoneNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db("LiftingApp");

    // You can create a "users" collection if it doesn't exist
    const collection = db.collection('users');

    const result = await collection.insertOne({
      email,
      firstName,
      lastName,
      experience,
      phoneNumber,
      weight,
    });

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while registering the user' });
  }
}
