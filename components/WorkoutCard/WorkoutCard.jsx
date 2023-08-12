
import { useEffect, useState } from 'react'
import { formatDate, countSets } from '@/lib/utils'
import { WorkoutSummary } from './WorkoutSummary'
import { FullWorkout } from './FullWorkout'
import { FistBumpIcon } from '../icons'
import { useUser } from '@/userContext'
import SocialSection from './SocialSection'

export default function WorkoutCard ({workout}) {

    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="w-full bg-white rounded-lg shadow mb-4 text-slate-700">
            <div className="w-full mx-auto px-6 pt-6 pb-3">
                    <div>
                        <div className="mb-3">
                            <div>
                                <h3 className="font-semibold text-sm mb-[3px]">{workout.userName}</h3>
                            </div>
                            <div className="flex items-center h-full w-full">
                                <img src="/barbell.png" className="w-[17px] h-[17px] mr-1"/>
                                <p className="text-xs font-medium">{formatDate(workout.date)}</p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold mb-1">{workout.name}</h2>
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
            <SocialSection workout={workout} />
        </div>
    )
}
