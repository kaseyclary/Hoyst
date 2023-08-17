import { FullWorkout } from "@/components/WorkoutCard/FullWorkout"
import { useWorkout } from "@/workoutContext"
import { useRouter } from "next/router"
import { formatDate } from "@/lib/utils"
import Select from "react-select"

export default function SubmitWorkout() {

    const visibility = [
        {value: "public", label: "Public"},
        {value: "private", label: "Private"}
    ]

    const { workout, submitWorkout, handleWorkoutDescriptionChange, handleVisibilityChange } = useWorkout()
    const router = useRouter()

    return (
        <div className="px-4 pt-[75px] max-w-[600px] mx-auto text-slate-700 pb-[100px]">
            <h1 className="text-xl font-bold text-slate-800">{workout.name}</h1>
            <p className="font-medium mb-3">{formatDate(workout.date)}</p>
            <textarea className="w-full p-2 border border-gray-300 rounded mb-3 h-[100px]" placeholder="How did it feel? Share some takeaways from today's session." value={workout.description} onChange={(e) => handleWorkoutDescriptionChange(e.target.value)} />
            <div className="flex items-center mb-3">
                <label className="font-medium">Visibility: </label>
                <Select 
                    options={visibility} 
                    placeholder="Visibility" 
                    className="w-full ml-3" 
                    defaultValue={{label: "Public", value: "public"}} 
                    onChange={(selectedOption) => handleVisibilityChange(selectedOption.value)} 
                />            
            </div>
            <FullWorkout workout={workout}/>
            <div className="flex">
                <button className="px-3 py-2 bg-slate-600 text-white font-medium rounded w-full mr-3 hover:bg-slate-500 transition-colors duration-200 ease-in-out" onClick={()=> router.push('/AddWorkout')}>Edit Workout</button>
                <button className="px-3 py-2 bg-orange-600 text-white font-medium rounded w-full hover:bg-orange-500 transition-colors duration-200 ease-in-out" onClick={submitWorkout}>Submit Workout</button>
            </div>
        </div>
    )
}