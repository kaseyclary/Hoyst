import React, { useState } from 'react';
import Select from 'react-select';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Register = () => {

  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    experience: '',
    phoneNumber: '',
    weight: '',
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
    setForm({ ...form, email: session.user.email })
  
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
  
      const data = await response.json();
  
      if (data.success) {
        router.push('/AddWorkout');
      } else {
        // Handle error
        console.error(data.error);
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
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
              <input type="tel" name="phoneNumber" onChange={handleChange} required className="p-2 border rounded" />
            </div>
            <div className="flex flex-col">
              <label className="text-lg">Weight (lbs):</label>
              <input type="number" name="weight" onChange={handleChange} required className="p-2 border rounded" />
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
