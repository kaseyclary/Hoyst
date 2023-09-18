import { useState } from 'react';
import { getSession } from 'next-auth/react';
import clientPromise from '@/lib/db';
import { liftTypes } from '@/lib/utils';
import Select from 'react-select';

export default function AddGoal({ user }) {

  const goalTypes = [
    { value: 'weight', label: 'Lbs' },
    { value: 'percentage', label: '%' },
  ];

  const [selectedLift, setSelectedLift] = useState(null);
  const [goalType, setGoalType] = useState(goalTypes[0]);
  const [goalDate, setGoalDate] = useState(null);
  const [liftIsSelected, setLiftIsSelected] = useState(false);

  const handleLiftChange = (selectedOption) => {
    setSelectedLift(selectedOption);
    setLiftIsSelected(true);
  }

  const handleGoalTypeChange = (selectedOption) => {
    setGoalType(selectedOption);
  }

  const handleGoalDateChange = (date) => {
    setGoalDate(date);
  }

  return (
      <div className="pt-[75px] px-4">
          <form className="max-w-[600px] mx-auto">
              <Select 
                  placeholder="Select a lift for your goal..."
                  className="w-full"
                  options={liftTypes}
                  onChange={handleLiftChange}
                  value={selectedLift} 
                  required
              />
              {liftIsSelected && (
                <div>
                  <p className="text-slate-600 my-4 px-2 font-medium">Increase my {selectedLift.label.toLowerCase()} by ...</p>
                  <div className="flex">
                      <input className="p-2 border rounded mr-2 w-full" placeholder={goalType.value === "weight" ? "..." : "..."} required/>
                      <Select 
                          placeholder="% or lbs?"
                          className="w-full py-1 w-2/5"
                          options={goalTypes}
                          onChange={handleGoalTypeChange}
                          value={goalType} 
                          default={goalTypes[0]}
                          required
                      />
                  </div>
                  <p className="text-slate-600 my-4 px-2 font-medium">Between now and ...</p>
                  <input type="date" value={goalDate} onChange={(e) => handleGoalDateChange(e.target.value)} className="p-2 border border-gray-300 w-full rounded mb-3" required />
                </div>
              )}
          </form>
      </div>
  )
}

// ... (Your getServerSideProps remains unchanged)


export async function getServerSideProps(context) {
    const { req, res } = context;
    const session = await getSession({ req });
  
    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  
    const client = await clientPromise;
    const db = client.db('LiftingApp');
    
    const userCollection = db.collection('users');
    const user = await userCollection.findOne({ email: session.user.email });
  
    if (!user) {
      return {
        redirect: {
          destination: '/register',
          permanent: false,
        },
      };
    }
  
    return {
      props: { 
        user: JSON.parse(JSON.stringify(user)), 
      },
    };
  }