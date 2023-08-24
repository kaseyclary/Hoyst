export default function Admin() {
    const updateWorkouts = async () => {
        try {
          const response = await fetch('/api/updateWorkouts', { method: 'POST' });
          const data = await response.json();
          console.log(data.message);
        } catch (error) {
          console.error('Failed to update workouts:', error);
        }
    };
    
      return (
        <button className="mt-[100px]" onClick={updateWorkouts}>Update Workouts</button>
    );
}