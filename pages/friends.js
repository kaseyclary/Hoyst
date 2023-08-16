import clientPromise from "@/lib/db"
import { getSession } from "next-auth/react"
import { SmallUserCard } from "@/components/Social/social";
import { useUser } from "@/userContext";

export default function Friends ({ userIsNotFollowing, userIsFollowedBy, userIsFollowing}) {

    const {user, addFollower, removeFollower} = useUser();

    return (
        <div className="mt-[75px] max-w-[600px] mx-auto">
            {userIsNotFollowing.map((userProfile) => (
                <SmallUserCard 
                  key={userProfile._id} 
                  user={user} 
                  userProfile={userProfile} 
                  addFollower={addFollower}
                  removeFollower={removeFollower}
                />
            ))}
        </div>
    )
}

export async function getServerSideProps(context) {

  const session = await getSession(context);

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
  const user = await db.collection('users').findOne({ email: session.user.email });
  const users = await db.collection('users').find({}).toArray();

  const userIsFollowing = user.following.map((user) => {user.email, user.firstName, user.lastName, user.photoUrl, user.following, user.followers, user.workouts});
  const userIsFollowedBy = user.followers.map((user) => {user.email, user.firstName, user.lastName, user.photoUrl, user.following, user.followers, user.workouts});
  const userIsNotFollowing = users.filter((user) => 
    !userIsFollowing.includes(user.email) && user.email !== session.user.email
  );

  return {
    //Consider returning only the vital user information to the client to reduce load times
    props: {
        userIsNotFollowing: JSON.parse(JSON.stringify(userIsNotFollowing)),
        userIsFollowedBy: JSON.parse(JSON.stringify(userIsFollowedBy)),
        userIsFollowing: JSON.parse(JSON.stringify(userIsFollowing)),
    },
  }

}