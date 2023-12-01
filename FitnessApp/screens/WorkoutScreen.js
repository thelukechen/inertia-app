import { View, StyleSheet, Text, Image, TouchableOpacity, Modal} from "react-native";
import { ppl } from "../data/DummyData";
import WorkoutContainerComponent from "../components/WorkourContainerComponent";
import {useState } from "react";
import { userId } from "./Auth";
import EditWorkout from "../components/EditWorkout";
import { useEffect } from "react";

function WorkoutScreen({navigation, route}) {

    const workout = route.params ? route.params.workout : null;
    const id = route.params ? route.params.id : null;
    const editedWorkout = route.params ? route.params.editedWorkout : null;

    const [workoutStarted, setWorkoutStarted] = useState(false);
    
    function startWorkoutHandler() {
        console.log("Start workout");
        setWorkoutStarted(true);
    }

    const date = new Date();
    const datePlusOne = new Date(date.getTime() + 86400000);
    const datePlusTwo = new Date(datePlusOne.getTime() + 86400000);
    const datePlusThree = new Date(datePlusTwo.getTime() + 86400000);
    const datePlusFour = new Date(datePlusThree.getTime() + 86400000);
    const datePlusFive = new Date(datePlusFour.getTime() + 86400000);
    const datePlusSix = new Date(datePlusFive.getTime() + 86400000);

    const [currentIndex, setCurrentIndex] = useState(0);
    const dates = [
        {
            idx: 0,
            date: date
        },
        {
            idx: 1,
            date: datePlusOne
        },
        {
            idx: 2,
            date: datePlusTwo
        },
        {
            idx: 3,
            date: datePlusThree
        },
        {
            idx: 4,
            date: datePlusFour
        },
        {
            idx: 5,
            date: datePlusFive
        },
        {
            idx: 6,
            date: datePlusSix
        },

    ]
    const [workoutReal, setWorkoutReal] = useState(workout);

    function saveEditedWorkout(newData) {
        setWorkoutReal(newData)
        editedWorkout(newData, id)
    }

    function handleEndWorkout() {
        console.log("Going back")
        navigation.goBack()
    }

    const [selectWorkoutVisible, setSelectWorkoutVisible] = useState(false);
    if (workoutStarted) {
        return (
            <View style={styles.container}>
                <WorkoutContainerComponent date={dates[currentIndex].date} workout={workoutReal} navigation={navigation} endWorkout={handleEndWorkout}></WorkoutContainerComponent>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
              <Modal visible={selectWorkoutVisible} animationType="fade" transparent={true}>
                <View style={{height: 259, width: 130, top: 125, left: 245, backgroundColor: 'black', borderRadius: 11}}>
                    <TouchableOpacity onPress={() => setCurrentIndex(0)}>
                        <View style={{height: 37, backgroundColor: "#181818", borderTopLeftRadius: 11, borderTopRightRadius: 11, justifyContent: 'center', paddingLeft: 16}}>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>Mon</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentIndex(1)}>
                        <View style={{height: 37, backgroundColor: "#181818", justifyContent: 'center', paddingLeft: 16, borderTopWidth: .5, borderTopColor: "#3c3c3c"}}>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>Tues</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentIndex(2)}>
                        <View style={{height: 37, backgroundColor: "#181818", justifyContent: 'center', paddingLeft: 16, borderTopWidth: .5, borderTopColor: "#3c3c3c"}}>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>Wed</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentIndex(3)}>
                        <View style={{height: 37, backgroundColor: "#181818", justifyContent: 'center', paddingLeft: 16, borderTopWidth: .5, borderTopColor: "#3c3c3c"}}>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>Thurs</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentIndex(4)}>
                        <View style={{height: 37, backgroundColor: "#181818", justifyContent: 'center', paddingLeft: 16, borderTopWidth: .5, borderTopColor: "#3c3c3c"}}>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>Fri</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentIndex(5)}>
                        <View style={{height: 37, backgroundColor: "#181818", justifyContent: 'center', paddingLeft: 16, borderTopWidth: .5, borderTopColor: "#3c3c3c"}}>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>Sat</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCurrentIndex(6)}>
                        <View style={{height: 37, backgroundColor: "#181818", justifyContent: 'center', paddingLeft: 16, borderTopWidth: .5, borderTopColor: "#3c3c3c", borderBottomLeftRadius: 11, borderBottomRightRadius: 11}}>
                            <Text style={{color: 'white', fontSize: 18, fontWeight: '300'}}>Sun</Text>
                        </View>
                    </TouchableOpacity>
                </View>
              </Modal>
              <TouchableOpacity style={{position: 'absolute', left: 350, top: 90, height:40, width:40, zIndex: 1}} hitSlop={{left: 40, top: 40, bottom: 40, right: 40}} onPress={() => setSelectWorkoutVisible(!selectWorkoutVisible)}>
                <Image source={require("../assets/option.png")} style={{width: 27, height: 27}}></Image>
              </TouchableOpacity>
              <EditWorkout editedWorkout={saveEditedWorkout} date={dates[currentIndex].date} workout={workoutReal} navigation={navigation} startWorkout={startWorkoutHandler}></EditWorkout>
            </View>
    
        );
    }
}

export default WorkoutScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000',
    }
  });
  
