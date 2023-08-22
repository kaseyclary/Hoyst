import { getSession } from 'next-auth/react';
import clientPromise from '@/lib/db';
import { liftTypes } from '@/lib/utils';
import Select from 'react-select';

export default function AddGoal({ user }) {
    return (
        <div className="pt-[75px] px-4">
            <form>
                <Select 
                    placeholder="Select a lift..."
                    className="w-full"
                    options={liftTypes}
                />

            </form>
        </div>
    )
}

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
    
    // Check if the user exists in the "users" collection
    const userCollection = db.collection('users');
    const user = await userCollection.findOne({ email: session.user.email });
  
    // If the user doesn't exist, redirect to /register
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