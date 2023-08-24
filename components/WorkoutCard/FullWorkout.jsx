import { calculateOneRepMax, standardizedLifts } from "@/lib/utils"
import { StrengthSpectrum } from "@/components/ui"


export const FullWorkout = ({ workout }) => {

    return (
        <div className="mt-6">
            {workout.lifts.map((lift, index) => (
                <div key={index} className="border-b-[1px] border-b-slate-200 mb-5 pb-2">
                    <div className="flex items-center py-2 justify-between mb-2">
                        <p className="font-semibold">{lift.name}</p>
                        <div className="flex">
                            <p className="text-xs font-medium py-1 px-2 bg-slate-500 text-white rounded-full mr-1">{lift.totalVolume} lbs Lifted</p>
                            <p className="text-xs font-medium py-1 px-2 bg-slate-500 text-white rounded-full">{lift.highestOneRepMax} lb 1RM</p>
                        </div>
                    </div>
                    {standardizedLifts.some(l => l.name === lift.name) && (
                        <StrengthSpectrum liftName={lift.name} sets={lift.sets} bodyweight={workout.bodyweight} gender={workout.gender} />
                    )}
                    <div className="[&>*:nth-child(odd)]:bg-slate-100">
                        <div className="flex items-center grid grid-cols-3 py-2 pl-4">
                            <p className="text-sm font-bold">Set</p>
                            <p className="text-sm font-bold">Volume</p>
                            <p className="text-sm font-bold">ORM</p>
                        </div>
                        {lift.sets.map((set, index) => (
                            <div key={index} className="flex items-center grid grid-cols-3 py-2 pl-4">
                                <p className="text-sm font-medium">{set.weight} lbs x {set.reps}</p>
                                <p className="text-sm font-medium">{set.weight * set.reps} lbs</p>
                                <p className="text-sm font-medium">{calculateOneRepMax(set.weight, set.reps)} lbs</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}