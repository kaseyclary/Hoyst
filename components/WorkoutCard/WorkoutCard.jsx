
import { useState } from 'react'
import { formatDate, countSets } from '@/lib/utils'
import { WorkoutSummary } from './WorkoutSummary'
import { FullWorkout } from './FullWorkout'
import { FistBumpIcon } from '../icons'
import Image from 'next/image'

export default function WorkoutCard ({workout}) {

    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="w-full bg-white rounded-lg shadow mb-4 text-slate-700">
            <div className="w-full mx-auto p-6 ">
                    <div>
                        <div>
                            {/* Where user photo will go */}
                        </div>
                        <div>
                            <h2 className="text-lg font-bold mb-1">{workout.name}</h2>
                            <p className="text-sm font-medium mb-1">{formatDate(workout.date)}</p>
                            <div className="flex w-1/2 mb-6">
                                <p className="text-sm font-medium">{workout.lifts.length} Total Lifts, {countSets(workout.lifts)} Total Sets</p>
                            </div>
                        </div>
                    </div>
                    {isExpanded ? ( 
                        <FullWorkout workout={workout} />
                    ) : (<WorkoutSummary workout={workout} />)}

                    <button onClick={() => setIsExpanded(!isExpanded)} className="w-full text-center bg-orange-600 py-3 text-sm font-semibold text-white rounded">{isExpanded ? "Close" : "See Full Workout"}</button>
            </div>
            <div className="h-[50px] w-full">
                <div className="h-full w-3/4 mx-auto flex justify-around items-center border-t">
                    <div className="w-full flex justify-center border-r">
                        <Image
                            src="/fist-bump.png" // path relative to the public folder
                            alt="Description of Image"
                            width={30} // set width
                            height={30} // set height
                        />
                    </div>
                    <div className="w-full flex justify-center">
                        <Image
                            src="/comment.png" // path relative to the public folder
                            alt="Description of Image"
                            width={25} // set width
                            height={25} // set height
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
