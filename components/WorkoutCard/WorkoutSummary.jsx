import { formatDate, countSets, countTotalReps } from '@/lib/utils';

export const WorkoutSummary = ({ workout }) => {
    return (
        <div className="text-slate-700">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2 w-full mb-4">
                {workout.lifts.map((lift, index) => (
                    <div key={index} className="border-r-[1px] border-r-slate-400 border-b-[1px] border-b-slate-200">
                        <p className="font-semibold text-sm mb-1">{lift.name}</p>
                        <p className="text-xs font-medium mb-1">{countSets(lift)} sets, {countTotalReps(lift)} reps</p>
                        <p className="text-xs font-medium mb-2">{lift.highestOneRepMax} lbs Best Effort</p>
                    </div>
                ))}
            </div>
        </div>
    )
}