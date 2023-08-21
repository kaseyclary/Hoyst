import { useRouter } from "next/router";

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