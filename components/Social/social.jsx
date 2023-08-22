import { getServerSideProps } from "@/pages";
import { useEffect, useState } from "react";
import { LoaderComponent } from "../ui";
import { useRouter } from "next/router";
import Link from "next/link";

export const SmallUserCard = ({ user, userProfile, addFollower, removeFollower }) => {

    const isFollowed = user && user.following ? user.following.includes(userProfile.email) : false;

    return (
        user ? (
        <div className="w-full px-6 mb-5">
            <div className="flex justify-between items-center border-b pb-5">
                <Link href={`/profiles/${userProfile.email}/profile`}>
                    <div className="flex items-center">
                            <img src={userProfile.photoUrl} className="h-[50px] w-[50px] rounded-full mr-3"/>
                        <div>
                            <p className="font-semibold">{userProfile.firstName} {userProfile.lastName}</p>
                            <p className="text-xs mb-1 font-medium">{userProfile.workouts ? userProfile.workouts.length : "0"} Recorded Hoyst workouts</p>
                            <FollowersDisplay user={user} userProfile={userProfile} size="small"/>
                            {/* <p className="text-xs">Following {userProfile.following.length} | Followed by {userProfile.followers.length}</p> */}
                        </div>
                    </div>
                </Link>
                {userProfile.email === user.email ? null : (
                <div>
                    {isFollowed ? (
                    <button className="btn-secondary-sm" onClick={() => removeFollower(userProfile.email)}>Unfollow</button>
                    ): (
                    <button className="btn-ghost-secondary-sm" onClick={() => addFollower(userProfile.email)}>Follow</button>
                    )}
                </div>)}
            </div>
        </div>
        ) : (
            <LoaderComponent />
        )
    )
};

export const FollowersDisplay = ({ user, userProfile, size }) => {
    const router = useRouter();

    const textSize = size === "small"
        ? "text-xs"
        : "text-sm";

    return (
        user ? (
            <div className="">
                <p className={textSize}>
                    <span>Following {userProfile.following.length}</span> | 
                    <span> Followed by {userProfile.followers.length}</span>
                </p>
            </div>
        ) : (
            <LoaderComponent />
        )
    );
}

