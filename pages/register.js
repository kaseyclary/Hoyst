import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import clientPromise from '@/lib/db';

const Register = () => {

  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    photoUrl: '',
    experience: '',
    phoneNumber: '',
    weight: '',
    following: [],
    followers: [],
    likedWorkouts: [],
    commentedWorkouts: [],
    wilksScore: 0,
    oneRepMaxes: {
      squat: 0,
      bench: 0,
      deadlift: 0,
      overheadPress: 0,
    },
  });

  const experienceOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'novice', label: 'Novice' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'pro', label: 'Pro' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleExperienceChange = (option) => {
    setForm({ ...form, experience: option.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const finalForm = { 
      ...form, 
      email: session.user.email, 
      photoUrl: session.user.image 
    };
    
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalForm),
      });
  
      const data = await response.json();
    
      if (data.success) {
        router.push('/AddWorkout');
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };  
  
  return (
    <div className="max-w-[600px] mt-[75px] mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">We just need a little info before you get started.</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="lg:grid grid-cols-2 gap-x-4">
            <div className="flex flex-col">
              <label className="text-lg">First Name:</label>
              <input type="text" name="firstName" onChange={handleChange} required className="p-2 border rounded" />
            </div>
            <div className="flex flex-col">
              <label className="text-lg">Last Name:</label>
              <input type="text" name="lastName" onChange={handleChange} required className="p-2 border rounded" />
            </div>
        </div>
        <div className="lg:grid grid-cols-2 gap-x-4">
            <div className="flex flex-col">
              <label className="text-lg">Phone Number:</label>
              <input type="tel" name="phoneNumber" inputMode="numeric" pattern="[0-9]*" onChange={handleChange} required className="p-2 border rounded" />
            </div>
            <div className="flex flex-col">
              <label className="text-lg">Weight (lbs):</label>
              <input type="number" inputMode="numeric" pattern="[0-9]*" name="weight" onChange={handleChange} required className="p-2 border rounded" />
              <p className="red-400 text-xs">*Your weight will not be shared with anyone. It is only used for relative strength calculations.</p>
            </div>
        </div>
        <div className="flex flex-col">
          <label className="text-lg">Lifting Experience:</label>
          <Select
            options={experienceOptions}
            onChange={handleExperienceChange}
            isSearchable
            placeholder="Select your experience"
            className="p-2 border rounded"
          />
        </div>
        <button type="submit" className="px-3 py-2 bg-orange-600 text-white font-medium rounded w-full hover:bg-orange-500 transition-colors duration-200 ease-in-out">
          Submit
        </button>
      </form>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  // If there's no session, the user isn't authenticated.
  if (!session) {
    return { 
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // Connect to the database
  const client = await clientPromise;
  const db = client.db('LiftingApp'); // Update this to your DB name

  // Check if the user exists in the "users" collection
  const user = await db.collection('users').findOne({ email: session.user.email });

  // If the user exists, redirect to /Home
  if (user) {
    return {
      redirect: {
        destination: '/Home',
        permanent: false,
      },
    };
  }

  // Otherwise, allow them to access the Register page
  return { props: {} };
}

export default Register;
