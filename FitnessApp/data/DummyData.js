import Exercise from "../models/Exercise";
import Workout from "../models/Workout";


const e1 =  new Exercise('e1', 'Barbell Bench Press', 2, 6, 8, require('../assets/exercises/bench.png'), '#FFB846', false)
const e2 =  new Exercise('e2', 'Incline Dumbbell Press', 3, 8, 12, require('../assets/exercises/incline.png'), '#9FFF91', false)
const e3 =  new Exercise('e3', 'Cable Flys', 4, 10, 12, require('../assets/exercises/flies.png'), '#77C0FF', false)
const e4 =  new Exercise('e4', 'Tricep Cable Pushdown', 4, 10, 12, require('../assets/exercises/tricep.png'), '#FF89FA', false)
const e5 =  new Exercise('e5', 'Front Raise', 2, 10, 12, null, '#FF6565', false)
const e6 =  new Exercise('e6', 'Lateral Raise', 3, 10, 15, null, '#FFB846', false)


const pushWorkoutExercises = new Array();
pushWorkoutExercises.push(e1);
pushWorkoutExercises.push(e2);
pushWorkoutExercises.push(e3);
pushWorkoutExercises.push(e4);
pushWorkoutExercises.push(e5);
pushWorkoutExercises.push(e6);


const e7 =  new Exercise('e7', 'Weighted Pullups', 4, 6, 8,null, '#FFB846')
const e8 =  new Exercise('e8', 'T-bar Row', 4, 8, 12, null, '#FFB846')
const e9 =  new Exercise('e9', 'Straight Arm Pulldown', 3, 8, 12, null, '#FFB846')
const e10 =  new Exercise('e10', 'Facepulls', 3, 10, 12, null, '#FFB846')
const e11 =  new Exercise('e11', 'Dumbbell Bicep Curl', 4, 8, 12, null, '#FFB846')



const pullWorkoutExercises = new Array();
pullWorkoutExercises.push(e7);
pullWorkoutExercises.push(e8);
pullWorkoutExercises.push(e9);
pullWorkoutExercises.push(e10);
pullWorkoutExercises.push(e11);


const e12 =  new Exercise('e12', 'Leg Press', 4, 8, 12, null, '#FFB846')
const e13 =  new Exercise('e13', 'Romanian Deadlift', 3, 8, 12, null, '#FFB846')
const e14 =  new Exercise('e14', 'Leg Extension', 3, 10, 14, null, '#FFB846')
const e15 =  new Exercise('e15', 'Hamstring Curl', 3, 10, 12, null, '#FFB846')
const e16 =  new Exercise('e16', 'Hip Abducctors', 2, 8, 12, null, '#FFB846')
const e17 =  new Exercise('e17', 'Hip Adductors', 2, 8, 12, null, '#FFB846')
const e18 =  new Exercise('e18', 'Standing Calf Raises', 3, 10, 15, null, '#FFB846')
const e19 =  new Exercise('e1', 'Seated Calf Raise', 3, 10, 15, null, '#FFB846')



const legWorkoutExercises = new Array();
legWorkoutExercises.push(e12);
legWorkoutExercises.push(e13);
legWorkoutExercises.push(e14);
legWorkoutExercises.push(e15);
legWorkoutExercises.push(e16);
legWorkoutExercises.push(e17);
legWorkoutExercises.push(e18);
legWorkoutExercises.push(e19);



export const EXERCISES = [
    e1,
    e2,
    e3,
    e4,
    e5,
    e6
];


const w1 = new Workout("w1", "Push", pushWorkoutExercises, "20", "6", "60", "90");
const w2 = new Workout("w2", "Pull", pullWorkoutExercises, "18", "5", "60", "70");
const w3 = new Workout("w3", "Legs", legWorkoutExercises, "23", "8", "90", "120");
const w0 = new Workout("w0", "Rest", null, null, null, null, null);

export let ppl = [
    w1, w1, w1, w1, w1, w1, w1
];



