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
  { value: "machineShoulderPress", label: "Machine Shoulder Press" },
  { value: "crunches", label: "Crunches" },
  { value: "straightLegDeadlift", label: "Straight Leg Deadlift" },
  { value: "pullUp", label: "Pull Up" },
  { value: "inclineBenchCurl", label: "Incline Bench Curl" },
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
  { value: "boxSquat", label: "Box Squat" },
  { value: "sumoSquat", label: "Sumo Squat" },
  { value: "hackSquat", label: "Hack Squat" },
  { value: "splitSquat", label: "Split Squat" },
  { value: "sissySquat", label: "Sissy Squat" },
  { value: "gobletSquat", label: "Goblet Squat" },
  { value: "zercherSquat", label: "Zercher Squat" },
  { value: "safetyBarSquat", label: "Safety Bar Squat" },
  { value: "beltSquat", label: "Belt Squat" },
  { value: "overheadSquat", label: "Overhead Squat" },
  { value: "andersonSquat", label: "Anderson Squat" },
  { value: "pauseSquat", label: "Pause Squat" },
  { value: "boxDeadlift", label: "Box Deadlift" },
  { value: "sumoDeadlift", label: "Sumo Deadlift" },
  { value: "deficitDeadlift", label: "Deficit Deadlift" },
  { value: "rackPull", label: "Rack Pull" },
  { value: "romanianDeadlift", label: "Romanian Deadlift" },
  { value: "stiffLegDeadlift", label: "Stiff Leg Deadlift" },
  { value: "trapBarDeadlift", label: "Trap Bar Deadlift" },
  { value: "blockPull", label: "Block Pull" },
  { value: "pausedDeadlift", label: "Paused Deadlift" },
  { value: "goodMornings", label: "Good Mornings" },
  { value: "bentOverRow", label: "Bent Over Row" },
  { value: "tBarRow", label: "T-Bar Row" },
  { value: "dumbbellRow", label: "Dumbbell Row" },
  { value: "pendlayRow", label: "Pendlay Row" },
  { value: "sealRow", label: "Seal Row" },
  { value: "meadowsRow", label: "Meadows Row" },
  { value: "chestSupportedRow", label: "Chest Supported Row" },
  { value: "inclineBenchPress", label: "Incline Bench Press" },
  { value: "declineBenchPress", label: "Decline Bench Press" },
  { value: "closeGripBenchPress", label: "Close Grip Bench Press" },
  { value: "dumbbellBenchPress", label: "Dumbbell Bench Press" },
  { value: "dumbbellInclinePress", label: "Dumbbell Incline Press" },
  { value: "dumbbellDeclinePress", label: "Dumbbell Decline Press" },
  { value: "floorPress", label: "Floor Press" },
  { value: "boardPress", label: "Board Press" },
  { value: "pinPress", label: "Pin Press" },
  { value: "slingShotBenchPress", label: "Sling Shot Bench Press" },
  { value: "spotoPress", label: "Spoto Press" },
  { value: "standingOverheadPress", label: "Standing Overhead Press" },
  { value: "seatedOverheadPress", label: "Seated Overhead Press" },
  { value: "dumbbellShoulderPress", label: "Dumbbell Shoulder Press" },
  { value: "arnoldPress", label: "Arnold Press" },
  { value: "pushPress", label: "Push Press" },
  { value: "behindTheNeckPress", label: "Behind The Neck Press" },
  { value: "landminePress", label: "Landmine Press" },
  { value: "barbellShrug", label: "Barbell Shrug" },
  { value: "dumbbellShrug", label: "Dumbbell Shrug" },
  { value: "farmersShrug", label: "Farmer's Shrug" },
  { value: "rackShrug", label: "Rack Shrug" },
  { value: "uprightRow", label: "Upright Row" },
  { value: "barbellCurl", label: "Barbell Curl" },
  { value: "preacherCurl", label: "Preacher Curl" },
  { value: "dumbbellCurl", label: "Dumbbell Curl" },
  { value: "hammerCurl", label: "Hammer Curl" },
  { value: "concentrationCurl", label: "Concentration Curl" },
  { value: "ezBarCurl", label: "EZ Bar Curl" },
  { value: "dragCurl", label: "Drag Curl" },
  { value: "zottmanCurl", label: "Zottman Curl" },
  { value: "skullCrushers", label: "Skull Crushers" },
  { value: "closeGripPushUp", label: "Close Grip Push Up" },
  { value: "cableTricepPushdown", label: "Cable Tricep Pushdown" },
  { value: "tricepDip", label: "Tricep Dip" },
  { value: "overheadTricepExtension", label: "Overhead Tricep Extension" },
  { value: "tricepKickback", label: "Tricep Kickback" },
  { value: "dumbbellPullover", label: "Dumbbell Pullover" },
  { value: "facePull", label: "Face Pull" },
  { value: "rearDeltFly", label: "Rear Delt Fly" },
  { value: "legExtension", label: "Leg Extension" },
  { value: "legCurl", label: "Leg Curl" },
  { value: "calfRaise", label: "Calf Raise" },
  { value: "seatedCalfRaise", label: "Seated Calf Raise" },
  { value: "legPress", label: "Leg Press" },
  { value: "romanChairLegRaise", label: "Roman Chair Leg Raise" },
  { value: "weightedPlank", label: "Weighted Plank" },
  { value: "weightedDip", label: "Weighted Dip" },
  { value: "weightedPullUp", label: "Weighted Pull Up" },
  { value: "weightedPushUp", label: "Weighted Push Up" },
  { value: "krocRow", label: "Kroc Row" }
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

export const findBestEffort = (workouts, liftType) => {
    let bestEffort = 0;

    workouts.forEach((workout) => {
        workout.lifts.forEach((lift) => {
            if (lift.name === liftType) {
                const highestOneRepMax = findHighestOneRepMaxInLift(lift);

                if (highestOneRepMax > bestEffort) {
                    bestEffort = highestOneRepMax;
                }
            }
        });
    });

    return bestEffort;
}

export const calculateWilksScore = (bodyWeight, total) => {
    const a = -216.0475144;
    const b = 16.2606339;
    const c = -0.002388645;
    const d = -0.00113732;
    const e = 7.01863E-06;
    const f = -1.291E-08;

    return total * 500 / (a + b * bodyWeight + c * Math.pow(bodyWeight, 2) + d * Math.pow(bodyWeight, 3) + e * Math.pow(bodyWeight, 4) + f * Math.pow(bodyWeight, 5));
}

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
