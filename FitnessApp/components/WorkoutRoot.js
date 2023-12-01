import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExerCiseInfoScreen from "../screens/ExerciseInfoScreen";
import WorkoutScreen from "../screens/WorkoutScreen";
import AddEditExerciseScreen from "../screens/AddEditExerciseScreen";
import SplitScreen from "../screens/SplitScreen";


const WorkoutStack = createNativeStackNavigator();

const WorkoutRoot = () => {
    return (
        <WorkoutStack.Navigator screenOptions={{headerShown: false}}>
            <WorkoutStack.Screen name={"SplitScreen"} component={SplitScreen}></WorkoutStack.Screen>
            <WorkoutStack.Screen name={"WorkoutHome"} component={WorkoutScreen}></WorkoutStack.Screen>
            <WorkoutStack.Screen name={"ExerciseInfoScreen"} component={ExerCiseInfoScreen}></WorkoutStack.Screen>
            <WorkoutStack.Screen name={"AddEditExerciseScreen"} component={AddEditExerciseScreen}></WorkoutStack.Screen>
        </WorkoutStack.Navigator>
    );
}

export default WorkoutRoot;