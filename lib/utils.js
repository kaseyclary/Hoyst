//function that takes reps and weight and returns an estimated one rep max
export function calculateOneRepMax(weight, reps) {
    return Math.round(weight / (1.0278 - 0.0278 * reps));
}

export const liftTypes = [
    { value: "squat", label: "Squat" },
    { value: "benchPress", label: "Bench Press" },
    { value: "deadlift", label: "Deadlift" },
    { value: "legPress", label: "Leg Press" },
    { value: "shoulderPress", label: "Shoulder Press" },
    { value: "pullUp", label: "Pull Up" },
    { value: "bicepCurl", label: "Bicep Curl" },
    { value: "tricepExtension", label: "Tricep Extension" },
    { value: "latPulldown", label: "Lat Pulldown" },
    { value: "row", label: "Row" },
    { value: "lunges", label: "Lunges" },
    { value: "dips", label: "Dips" },
    { value: "legCurl", label: "Leg Curl" },
    { value: "legExtension", label: "Leg Extension" },
    { value: "frontSquat", label: "Front Squat" },
    { value: "cleanAndJerk", label: "Clean and Jerk" },
    { value: "snatch", label: "Snatch" },
    { value: "inclineBenchPress", label: "Incline Bench Press" },
    { value: "pushPress", label: "Push Press" },
    { value: "farmersWalk", label: "Farmer's Walk" },
    { value: "cableCrossover", label: "Cable Crossover" },
    { value: "facePull", label: "Face Pull" },
    { value: "shrugs", label: "Shrugs" },
    { value: "plank", label: "Plank" },
    { value: "sideLateralRaise", label: "Side Lateral Raise" },
    { value: "hammerCurl", label: "Hammer Curl" },
    { value: "pecDeck", label: "Pec Deck" },
    { value: "reverseFly", label: "Reverse Fly" },
    { value: "seatedRow", label: "Seated Row" },
    { value: "hyperextension", label: "Hyperextension" },
  ];

export const findHighestOneRepMaxInLift = (lift) => {
    let highestOneRepMax = 0;
  
    lift.sets.forEach((set) => {
      // Assuming oneRepMax is a property in each set object
      if (set.oneRepMax > highestOneRepMax) {
        highestOneRepMax = set.oneRepMax;
      }
    });
  
    return highestOneRepMax;
};

export const totalLiftVolume = (lift) => {
    let totalVolume = 0;

    lift.sets.forEach((set) => {
        totalVolume += set.weight * set.reps;
    });

    return totalVolume;
}

export const liftsWithCalculations = (lifts) => {
    lifts.forEach((lift) => {
      lift.sets.forEach((set) => {
        // Assuming weight and reps are properties in each set object
        set.oneRepMax = calculateOneRepMax(set.weight, set.reps);
        set.totalVolume = set.weight * set.reps;
      });
  
      // If you still need the highest one-rep max and total volume for each lift, you can calculate them here
      lift.highestOneRepMax = lift.sets.reduce((max, set) => Math.max(max, set.oneRepMax), 0);
      lift.totalVolume = lift.sets.reduce((total, set) => total + set.totalVolume, 0);
    });
  
    return lifts;
};

export function countSets(lifts) {
    let totalSets = 0;
  
    // If a single lift object is passed, convert it to an array
    if (!Array.isArray(lifts)) {
      lifts = [lifts];
    }
  
    lifts.forEach((lift) => {
      totalSets += lift.sets.length;
    });
  
    return totalSets;
}

export function countTotalReps(lift) {
    let totalReps = 0;
  
    lift.sets.forEach((set) => {
      totalReps += Number(set.reps);
    });
  
    return totalReps;
}
  


export function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };
  
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate
}
