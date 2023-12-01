import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useReducer, useState, useRef } from "react";
import { useCallback } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList, { OpacityDecorator } from "react-native-draggable-flatlist";
import { Swipeable, TextInput } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { baseApiUrl, heightRatio, widthRatio } from "../helper";
import { userId } from "./Auth";
function SplitScreen({navigation}) {

    const queryClient = useQueryClient()

    const { data, isLoading, isError } = useQuery({queryKey: ['split'], queryFn: getSplit,});

    useEffect(() => {
        console.log("User Id obtained from auth is: ", userId)
    })

    async function getSplit() {
        queryData = {
            "userId": userId,
            "splitId": "s1"
        }
        const response = await axios.get(baseApiUrl+'split/get', {params: queryData})
        if (response.status === 200) {
            return response.data.splits[0]
        }
    }
    /*
    function updateWorkouts(newWorkouts) {
        setWorkouts(newWorkouts)
        postSplit({
            "SplitId": splitId,
            "SplitName": splitName,
            "workouts": newWorkouts
        })        
    }
    */

    const handleSplitUpdate = async(newSplit) => {
        try {
            await splitMutation.mutateAsync(newSplit)
        } catch (error) {
            console.error("Error posting split: ", error)
        }
    }

    const splitMutation = useMutation({
        mutationFn: postSplit,

        onSettled: () => {
            queryClient.invalidateQueries(['split']);
        }
    })

    async function postSplit(newSplit) {
        console.log("Posting split")

        const splitData = {
            "userId": userId,
            "splitDocument": newSplit
        }
        const response = await axios.post(baseApiUrl+'split/save', splitData)
        if (response.status === 200) {
            return response.data
        }
    }

    function goToWorkout(workout, id) {
        navigation.navigate("WorkoutHome", {workout: workout, id: id, editedWorkout: editedWorkout})
    }

    const editedWorkout = (newData, id) => {
        console.log("Edited Workout")

        let newSplit = queryClient.getQueryData(['split'])
        const index = newSplit.workouts.findIndex(item => item.id === id)
        
        newSplit.workouts[index] = newData
        console.log(newSplit)
        setWorkouts(newSplit.workouts)
        handleSplitUpdate(newSplit)
    }

    function deleteWorkout(id) {
        let newSplit = queryClient.getQueryData(['split'])
        newSplit.workouts = newSplit.workouts.filter((item) => item.id !== id);
        setWorkouts(newSplit.workouts)
        handleSplitUpdate(newSplit)
    }

    const reorderWorkouts = (newOrder) => {
        console.log("Reordered workouts");

        let newSplit = queryClient.getQueryData(['split'])
        newSplit.workouts = newOrder
        setWorkouts(newSplit.workouts)
        handleSplitUpdate(newSplit);
    }

    const renderItem = useCallback(
        ({item, drag}) => {
            let setCount = 0
            for (let i = 0; i < item.exercises.length; i++) {
                setCount += item.exercises[i].setList.length
            }

            function DeleteButton() {
                return (
                    <View style={{flexDirection: 'row'}}>
                        <View style={[{height: 103, width: 22, backgroundColor: '#1C1C1E', marginLeft: -18}]}>
        
                        </View>
                        <TouchableOpacity onPress={deleteWorkoutHandler}>
                            <View style={[{height: 103,width: 85, backgroundColor: '#383838', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 16, borderBottomRightRadius: 16}]}>
                                <Image source={require('../assets/trash.png')} style={{height:30, width: 30}}/>
                                <Text style={{color: 'white', marginTop: -1}}>Delete</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }

            const height = useSharedValue(101)
            const marginBottom = useSharedValue(10)
            const opacity = useSharedValue(1)

            const animatedWorkoutItem = useAnimatedStyle(() => {
                return {
                    height: height.value,
                    marginBottom: marginBottom.value,
                    opacity: opacity.value
                }
            })
            
            function deleteWorkoutHandler() {
                height.value = withTiming(0)
                opacity.value = withTiming(0)
                marginBottom.value = withTiming(0)
                setTimeout(() => {
                    deleteWorkout(item.id)
                }, 300);
            }

            
            return(
                <Animated.View style={animatedWorkoutItem}>
                    <OpacityDecorator>
                        <Swipeable renderRightActions={DeleteButton} overshootRight={false}>
                            <TouchableOpacity style={styles.workoutItem} onLongPress={drag} onPress={() => goToWorkout(item, item.id)}>
                                <View>
                                <Text style={{color: 'white', fontSize: 29, fontWeight: '500', marginBottom: 4}}>{item.name}</Text>
                                <Text style={{color: 'white', fontSize: 22, fontWeight: '200'}}>{item.durationLow}-{item.durationHigh} min</Text> 
                                </View>
                                <View>
                                    <Text style={{color: 'white', fontSize: 22, fontWeight: '200', marginTop: 6, marginBottom: 6}}>{item.exercises.length} Exercises</Text>
                                    <Text style={{color: 'white', fontSize: 22, fontWeight: '200',}}>{setCount} Sets</Text>
                                </View>
                            </TouchableOpacity>
                        </Swipeable>
                    </OpacityDecorator>
                </Animated.View>
            )
            
        }
    )
    function addWorkoutHandler() {
        const newId = ("w" + (new Date()).toString())
        const newWorkout = {
            durationHigh: "0",
            durationLow: "0",
            exercises: [],
            id: newId,
            name: "Start"
        }
        navigation.navigate("WorkoutHome", {workout: newWorkout, id: newId, editedWorkout: saveNewWorkout})
    }

    const saveNewWorkout = (newData, id) => {
        console.log("Adding Workout")
        console.log(newData)

        let newSplit = queryClient.getQueryData(['split'])
        newSplit.workouts.push(newData)
        setWorkouts(newSplit.workouts)
        handleSplitUpdate(newSplit)
    }

    const [splitName, setSplitName] = useState('')
    const [workouts, setWorkouts] = useState([])
    const handleSplitNameChanged = () => {
        const newSplit = queryClient.getQueryData(['split'])
        newSplit.SplitName = splitName
        handleSplitUpdate(newSplit)
    }

    useEffect(() => {
        console.log("Split Screen Use Effect")
        if (data) {
            setSplitName(data.SplitName)
            setWorkouts(data.workouts)
        }
    }, [data])
    
    if (isLoading) {
        return (<View style={{flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={"white"}></ActivityIndicator>
        </View>)
    } else if (isError) {
        return (<View style={{flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'white', fontSize: 25}}>Error</Text>
    </View>)
    } else {
        console.log(data)
        return (
            <View style={{backgroundColor: 'black', flex: 1, alignItems: 'center'}}>
                <View style={{marginTop: 110 * heightRatio}}>
                    <TextInput onChangeText={(newText) => setSplitName(newText)} onEndEditing={handleSplitNameChanged} textAlign="right" value={splitName} style={{color: 'white', fontSize: 34}}></TextInput>
                </View>
                <View style={{marginTop: 40*heightRatio}}>
                    <TouchableOpacity style={[styles.buttonContainer]} onPress={addWorkoutHandler}>
                        <Image source={require('../assets/plus.png')} style={{height: 32, width: 32,}}/>
                    </TouchableOpacity>
                    <View style={{marginTop: 71*heightRatio}}>
                        <DraggableFlatList data={workouts} renderItem={renderItem} keyExtractor={(item) => item.id} onDragBegin={({index}) => console.log("Started Dragging")} onDragEnd={({data}) => reorderWorkouts(data)}>
    
                        </DraggableFlatList>
                    </View>
                </View>
            </View>
        )
    }

    /*    
    return (
        <View style={{backgroundColor: 'black', flex: 1, alignItems: 'center'}}>
            <View style={{marginTop: 110}}>
                <TextInput onChangeText={(newName) => {setSplitName(newName)}} onEndEditing={handleChangeSplitName} textAlign="right" value={splitName} style={{color: 'white', fontSize: 34}}></TextInput>
            </View>
            <View style={{marginTop: 40}}>
                <TouchableOpacity style={[styles.buttonContainer]} onPress={addWorkoutHandler}>
                    <Image source={require('../assets/plus.png')} style={{height: 40, width: 40,}}/>
                </TouchableOpacity>
                <View style={{marginTop: 73}}>
                    <DraggableFlatList data={workouts} renderItem={renderItem} keyExtractor={(item) => item.id} onDragBegin={({index}) => console.log("Started Dragging")} onDragEnd={({data}) => setWorkouts(data)}>

                    </DraggableFlatList>
                </View>
            </View>
        </View>
    )
    */
}

const styles = StyleSheet.create({
    workoutItem: {
        color: '#1C1C1E',
        backgroundColor: '#1C1C1E',
        borderRadius: 16,
        padding: 7,
        width: 370 * widthRatio,
        left: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 32,
        alignItems: 'center',
    },
    buttonContainer: {
        color: '#1C1C1E',
        backgroundColor: '#1C1C1E',
        borderRadius: 16,
        padding: 7,
        width: 370 * widthRatio,
        justifyContent: 'center',
        alignItems: 'center',
        height: 66,
        top: 65,
        marginTop: -9
    },
})

export default SplitScreen