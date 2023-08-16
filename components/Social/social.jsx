import { getServerSideProps } from "@/pages";
import { useEffect } from "react";
import { LoaderComponent } from "../ui";

export const SmallUserCard = ({ user, userProfile, addFollower, removeFollower }) => {

    const isFollowed = user && user.following ? user.following.includes(userProfile.email) : false;

    return (
        user ? (
        <div className="w-full px-6 mb-5">
            <div className="flex justify-between items-center border-b pb-5">
                <div className="flex items-center">
                    <img src={userProfile.photoUrl} className="h-[50px] w-[50px] rounded-full mr-3"/>
                    <div>
                        <p className="font-semibold">{userProfile.firstName} {userProfile.lastName}</p>
                        <p className="text-xs mb-1 font-medium">{userProfile.workouts ? userProfile.workouts.length : "0"} Recorded Hoyst workouts</p>
                        <p className="text-xs">Following {userProfile.following.length} | Followed by {userProfile.followers.length}</p>
                    </div>
                </div>
                {isFollowed ? (
                  <button className="btn-secondary-sm" onClick={() => removeFollower(userProfile.email)}>Unfollow</button>
                ): (
                  <button className="btn-ghost-secondary-sm" onClick={() => addFollower(userProfile.email)}>Follow</button>
                )}
            </div>
        </div>
        ) : (
            <LoaderComponent />
        )
    )
};

