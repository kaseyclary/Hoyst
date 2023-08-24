import { useRouter } from "next/router";
import { calculateOneRepMax } from "../lib/utils";
import { standardizedLifts } from "../lib/utils";

export const LoaderComponent = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
};

export const WorkoutLikes = ({ workout }) => {
    
  const router = useRouter();

  return (workout.likes.length === 1 ? (
    <div className="flex items-center" onClick={() => router.push(`/workouts/${workout._id}/knucks`)}>
        <img src ={workout.likes[0].userPhoto} className="h-[27px] w-[27px] border-[2px] border-white rounded-full mr-1"/>
        <p className="text-xs font-semibold">Knucks from {workout.likes[0].userName}</p>
    </div>
    ) : workout.likes.length === 2 ? (
        <div className="flex items-center" onClick={() => router.push(`/workouts/${workout._id}/knucks`)}>
            <div className="flex">
                <img src ={workout.likes[0].userPhoto} className="h-[27px] w-[27px] border-[2px] border-white rounded-full drop-shadow"/>
                <img src={workout.likes[1].userPhoto} className="h-[27px] w-[27px] border-[2px] border-white -ml-3 rounded-full mr-1"/>
            </div>
            <p className="text-xs font-semibold">Knucks from {workout.likes[0].userName} and {workout.likes.length - 1} other</p>
        </div>
    ) : workout.likes.length > 2 ? (
        <div className="flex items-center" onClick={() => router.push(`/workouts/${workout._id}/knucks`)}>
            <div className="flex">
                <img src ={workout.likes[0].userPhoto} className="h-[27px] w-[27px] border-[2px] border-white rounded-full drop-shadow z-20"/>
                <img src ={workout.likes[1].userPhoto} className="h-[27px] w-[27px] border-[2px] border-white -ml-3 rounded-full drop-shadow"/>
                <img src={workout.likes[2].userPhoto} className="h-[27px] w-[27px] border-[2px] border-white -ml-3 rounded-full mr-1"/>
            </div>
            <p className="text-xs font-semibold">Knucks from {workout.likes[0].userName} and {workout.likes.length - 1} others</p>
        </div>
    ) : (
        <p className="text-xs font-semibold">Be the first to give knucks</p>
    ) )
}

export const StrengthSpectrum = ({ liftName, sets, bodyweight, gender }) => {
    const bestORM = Math.max(...sets.map(set => calculateOneRepMax(set.weight, set.reps)));
    const lift = standardizedLifts.find(l => l.name === liftName);
    const standards = gender === "male" ? lift.maleStandards : lift.femaleStandards;
    const userMultiplier = bestORM / bodyweight;

    const standardValues = Object.values(standards);
    let userPercentage = 0;
    let userCategory;

    for (let i = 0; i < standardValues.length - 1; i++) {
        if (userMultiplier >= standardValues[i] && userMultiplier <= standardValues[i + 1]) {
            const rangePercentage = (userMultiplier - standardValues[i]) / (standardValues[i + 1] - standardValues[i]);
            userPercentage = i * 25 + rangePercentage * 25;

            // Define the userCategory
            userCategory = Object.keys(standards)[i];
            if (rangePercentage > 0.5) {
                userCategory = Object.keys(standards)[i];
            }
            break;
        }
    }

    return (
        <>
        <div className="spectrum">
            {["beginner", "novice", "intermediate", "advanced", "elite"].map((level, index) => (
                <div 
                    key={level}
                    style={{left: `${index * 25}%`}}
                    className={`point ${level === userCategory ? 'active' : ''}`}
                    title={level}
                />
            ))}
            <div className="user-marker" style={{left: `${userPercentage}%`}} title="You"></div>
        </div>
        <div className="grid grid-cols-4 my-2 text-center w-full text-[0.65rem] mb-4">
            <p>Beginner</p>
            <p>Novice</p>
            <p>Intermediate</p>
            <p>Advanced</p>
        </div>
        </>
    );
}


  