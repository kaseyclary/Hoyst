import { getServerSideProps } from "@/pages";
import { useEffect } from "react";
import { LoaderComponent } from "../ui";

export const SmallUserCard = ({ user, userProfile, addFollower, removeFollower }) => {

    const isFollowed = user && user.following ? user.following.includes(userProfile.email) : false;

    return (
        user ? (
        <div className="w-full px-6">
            <div className="flex justify-between items-center border-b pb-5">
                <div>
                    <p className="font-semibold">{userProfile.firstName} {userProfile.lastName}</p>
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

