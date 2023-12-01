import { useState, useRef, useCallback, useEffect } from "react";
import { View, StyleSheet, Text,  Dimensions, Image, TouchableOpacity, Touchable, TextInput} from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import DraggableFlatList, {OpacityDecorator} from 'react-native-draggable-flatlist'
import EditExerciseListItem from "./EditExerciseListItem";
import { Swipeable } from "react-native-gesture-handler";
import Animated, { useSharedValue , useAnimatedStyle, withTiming, withSpring} from 'react-native-reanimated';
import { heightRatio, widthRatio } from "../helper";


function EditWorkout({workout, date, startWorkout, navigation, editedWorkout}) {

    const dateRel = date;
    const [workoutExercises, setWorkoutExercises] = useState(workout.exercises);
    const [workoutName, setWorkoutName] = useState(workout.name)
    const [displayHeader, setDisplayHeader] = useState('flex');
    const [lowDuration, setLowDuration] = useState(workout.durationLow)
    const [highDuration, setHighDuration] = useState(workout.durationHigh)
    const [totalSets, setTotalSets] = useState(0)

    const [edit, setEdit] = useState(false);

    const [deleteId, setDeleteId] = useState("none");
    const [initialLoad, setInitialLoad] = useState(false);
    const daysOfWeek = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY"
    ]

    const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC"
    ]


    function addExerciseHandler() {
        const newExercise = {
            "color": "#FFB846",
            "del": false,
            "highRepRange": 0,
            "id": "placeholder",
            "imgSrc": 3,
            "lowRepRange": 0,
            "name": "Add Exercise",
            "setList": []
        }
        navigation.navigate("AddEditExerciseScreen", {exercise: newExercise, onDataReceived: addExercise})
      }

      const addExercise = (data) => {
        if (data.name==="Add Exercise" || data.setList.length === 0) {
            return
        }
        console.log("Adding exercise", data)

        let newWorkoutExercises = workoutExercises;
        newWorkoutExercises.push(data)
        console.log("New workout exercises: ", newWorkoutExercises)
        setWorkoutExercises([...newWorkoutExercises])
      }

      function deleteItemFromWorkout(id) {

        let newWorkoutExercises = workoutExercises;
        const index = newWorkoutExercises.findIndex((item) => item.id === id)
        if (index > -1) {
            newWorkoutExercises.splice(index, 1)
        }
        console.log("New workout exercises: ", newWorkoutExercises)
        setWorkoutExercises([...newWorkoutExercises])
    }


    function openEditView() {
        console.log("Open edit view now");
        leftValueAnimated.value = withSpring(leftValueAnimated.value - 429);
        listTopAnimated.value = withTiming(listTopAnimated.value + 66)
        setTimeout(() => {
            setListMargin(145)
        }, 300);
        setEdit(true);
    }


    function closeEditScreen() {
        if (workoutExercises.length > 0) {
            console.log("Stop editing");
            listRef.current.scrollToIndex({index: 0, animated: true})
            setTimeout(() => {
                leftValueAnimated.value = withTiming(leftValueAnimated.value - 420);
            }, 400);
            setTimeout(() => {
                leftValueAnimated.value = leftValueAnimated.value + 849;
                listTopAnimated.value = withSpring(listTopAnimated.value - 66);
                setListMargin(80)

            }, 700);

            editedWorkout(
                {
                    "durationHigh": highDuration,
                    "durationLow": lowDuration,
                    "exercises": workoutExercises,
                    "id": workout.id,
                    "name": workoutName,
                }
            )
            setEdit(false);
        }
    }
    const [listMargin, setListMargin] = useState(80);
    const listRef = useRef(null)
    const listTopAnimated = useSharedValue(0);
    const animateListTop = useAnimatedStyle(() => {
        return {
            top: listTopAnimated.value
        }
    })

    const leftValueAnimated = useSharedValue(430);
    const animateLeftValue = useAnimatedStyle(() => {
        return {
            left: leftValueAnimated.value
        }
    });

    function updateExercise(id, newData) {
        const index = workoutExercises.findIndex(item => item.id === id)
        let newWorkoutExercises = workoutExercises;
        newWorkoutExercises[index] = newData
        console.log("New workout exercises: ", newWorkoutExercises)
        setWorkoutExercises([...newWorkoutExercises])
    }

    useEffect(() => {
        console.log("Workout exercises: ", workoutExercises)
        let sum = 0
        for (let i = 0; i < workoutExercises.length; i++) {
            sum += workoutExercises[i].setList.length
        }
        setTotalSets(sum)
    }, [workoutExercises])


    const renderItem = useCallback(
        ({item, drag}) => {
        
        
        const itemRef = useRef();

        function goToEditSets() {
            navigation.navigate("AddEditExerciseScreen", {exercise: item, onDataReceived: onDataReceived})
            setTimeout(() => {
                swipeRef.current.close()
            }, 200);
        }

        const onDataReceived = (data) => {
            // Update the receivedData state with the data from Screen2
            updateExercise(item.id, data)
          };

        function deleteItemHandler(id) {
            opacityAnimated.value = withTiming(opacityAnimated.value - 1);
            heightAnimated.value = withTiming(heightAnimated.value - 101);
            animateMargin.value = withTiming(animateMargin.value - 9);
            setTimeout(() => {
                deleteItemFromWorkout(id);
            }, 500);
        }

        const opacityAnimated = useSharedValue(1);
        const opacityAnimatedValue = useAnimatedStyle(() => {
            return {
                opacity: opacityAnimated.value
            }
        });

        const heightAnimated = useSharedValue(101);
        const animateHeight = useAnimatedStyle(() => {
            return {
                height: heightAnimated.value
            }
        });

        const animateMargin = useSharedValue(9);
        const animatedMarginValue = useAnimatedStyle(() => {
            return {
                marginBottom: animateMargin.value
            }
        });
        
        
        function DeleteButton() {
            
            return (
                    <View style={{flexDirection: 'row'}}>
                        <View style={[{height: 101, width: 22, backgroundColor: '#1C1C1E', marginLeft: -18}]}>

                        </View>
                        <TouchableOpacity onPress={goToEditSets}>
                            <View style={[{height: 101, width: 85, backgroundColor: '#7a7980', justifyContent: 'center', alignItems: 'center'}]}>
                                <Image source={require('../assets/edit.png')} style={{width: 26, height: 26}}/>
                                <Text style={{color: 'white', marginTop: 2}}>Edit</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => deleteItemHandler(item.id)}>
                            <View style={[{height: 101,width: 85, backgroundColor: '#383838', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 16, borderBottomRightRadius: 16}]}>
                                <Image source={require('../assets/trash.png')} style={{height:30, width: 30}}/>
                                <Text style={{color: 'white', marginTop: -1}}>Delete</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }
            const swipeRef = useRef();

          return (
            <Animated.View style={[animateHeight, opacityAnimatedValue, animatedMarginValue]}>
            <OpacityDecorator>
                <Swipeable ref={swipeRef} enabled={edit}  renderRightActions={DeleteButton} heightRatio={heightRatio} widthRatio={widthRatio} overshootRight={false} rightThreshold={20}>
                    <Pressable onLongPress={edit ? drag : openEditView} delayLongPress={100}  pressRetentionOffset={{ bottom: 10, left: 10, right: 10, top: 10}}>
                        <EditExerciseListItem ref={itemRef} navigation={navigation} itemId={item.id} name={item.name} sets={item.setList.length} lowRepRange={item.lowRepRange} highRepRange={item.highRepRange} backgroundSrc={item.backgroundSrc} imgSrc={item.imgSrc} exerciseNumber={item.index} startExercise={false}  backgroundCircleColor={item.color} heightRatio={heightRatio} widthRatio={widthRatio} deleteId={deleteId}></EditExerciseListItem>
                    </Pressable>
                </Swipeable>
            </OpacityDecorator>
            </Animated.View>
          );
        },
        [edit]
      );

    
    useEffect(() => {
        if(!initialLoad) {
            if (workoutExercises.length == 0) {
                openEditView()
                setShowStart('none')
            }
        }
        if (workoutExercises.length > 0) {
            setShowStart('flex')
        } 
        setInitialLoad(true)
    })
    
    const [showStart, setShowStart] = useState('flex')

    function changeWorkoutName(inputText) {
        setWorkoutName(inputText)
    }

    const [nameFontSize, setNameFontSize] = useState(60.5)

    useEffect(() => {
        console.log(workoutName)
        if (workoutName.length > 5) {
            setNameFontSize(40)
        }
        if (workoutName.length <= 5) {
            setNameFontSize(60.5)
        }
    }, [workoutName])

    const handleScroll = (offset) => {
        console.log(offset)
    }

    return(
            <View style={styles.workoutScreenContainer}>
                <TouchableOpacity style={{top: 700 * heightRatio, position: 'absolute', zIndex: 1, display: showStart}} onPress={edit ? closeEditScreen : startWorkout}>
                    <View style={{height: 45 * heightRatio, width: 137 * widthRatio, borderRadius: 60, backgroundColor: '#74e189', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize: 23}}>{edit ? "Save" : "Start"}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.headerContainer}>
                    <View style={styles.leftHeaderContainer}>
                        <View style={{marginBottom: -10, height: 25, left: 12 * widthRatio}}>
                            <Text style={styles.dateText}>{daysOfWeek[dateRel.getDay()]}, {months[date.getMonth()]} {date.getDate()}</Text>
                        </View>
                        <View style={{display: displayHeader}}>
                            <View style={{marginBottom: -3, marginLeft: 10 * widthRatio}}>
                                <TextInput editable={edit} keyboardAppearance="dark" onChangeText={changeWorkoutName} style={[styles.workoutNameText, {fontSize: nameFontSize * widthRatio}]}>{workoutName}</TextInput>
                            </View>
                            <View>
                                <Text style={styles.durationText}>{lowDuration}-{highDuration} min</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.rightHeaderContainer, {display: displayHeader}]}>
                        <View style={{marginBottom: 30}}>
                            <Text> </Text>
                        </View>
                        <View style={{marginBottom: 5}}>
                            <Text style={styles.exerciseCountText}>{workoutExercises.length} Exercises</Text>
                        </View>
                        
                        <View>
                            <Text style={styles.setCountText}>{totalSets} Sets</Text>
                        </View>
                    </View>
                </View>
                                
                    <View style={[{flex: 15 * heightRatio, top: 40},styles.workoutContainer]}>
                        <TouchableOpacity onPress={addExerciseHandler}>
                            <Animated.View  style={[animateLeftValue,styles.buttonContainer]}>
                                <Image source={require('../assets/plus.png')} style={{height: 32, width: 32,}}/>
                            </Animated.View>
                        </TouchableOpacity>
                        <Animated.View style={[animateListTop, {marginBottom: listMargin}]}>
                            <DraggableFlatList ref={listRef} onDragBegin={({index}) => console.log("Started Dragging")} fadingEdgeLength={100} showsVerticalScrollIndicator={false} data={workoutExercises} renderItem={renderItem} keyExtractor={(item) => item.id} onDragEnd={({data}) => setWorkoutExercises(data)} onPlaceholderIndexChange={({index}) => console.log("Changed index")} onRelease={({index}) => console.log("Released")}></DraggableFlatList>
                        </Animated.View>
                    </View>
            </View>
    );
}
export default EditWorkout;


const styles = StyleSheet.create({
    workoutScreenContainer: {
      flex: 10.08,
      justifyContent: 'center',
      alignItems: 'center',
      width: 390 * widthRatio,
    },
    toolbarMenuContainer: {
      flex: 1,
      position: 'absolute',
      top: 300 * heightRatio,
      backgroundColor: 'black',
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 90,
        width: 384 * widthRatio,
        marginRight: -2 * widthRatio,

    },
    leftHeaderContainer: {
        marginTop: -3 * heightRatio,
        
    },
    rightHeaderContainer: {
        marginTop: -1.75 * heightRatio,
    },
    textContainer: {
        color: 'white',
    },
    workoutContainer: {
        width: 384 * widthRatio,
        marginLeft: 1.4 * widthRatio,
        alignItems: 'center',
        marginBottom: 30
    },
    dateText: {
        color: '#7F7E84',
        fontSize: 16 * widthRatio,
        letterSpacing: 0,
    },
    workoutNameText: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: 2 * heightRatio,
        letterSpacing: .1
    },
    durationText: {
        color: 'white',
        fontSize: 26 * widthRatio,
        fontWeight: '200',
        marginTop: 0,
        left: 13 * widthRatio

    },
    exerciseCountText: {
        color: 'white',
        fontSize: 26 * widthRatio,
        textAlign: 'right',
        left: -9 * widthRatio,
        top: 1 * heightRatio,
        letterSpacing: 0.03 
    },
    setCountText: {
        color: 'white',
        fontSize: 26 * widthRatio,
        textAlign: 'right',
        marginTop: 2 * heightRatio,
        left: -10 * widthRatio
    },
    workoutSummaryContainer: {
        backgroundColor: '#1C1C1E',
        height: 600 * heightRatio,
        top: -20 * heightRatio,
        width: 385 * widthRatio,
        borderRadius: 15,
        paddingVertical: 20 * heightRatio,
        paddingHorizontal: 35 * widthRatio,
    },
    buttonContainer: {
        color: '#1C1C1E',
        backgroundColor: '#1C1C1E',
        borderRadius: 16,
        padding: 7 * widthRatio,
        width: 370 * widthRatio,
        marginBottom: 9 * heightRatio,
        justifyContent: 'center',
        alignItems: 'center',
        height: 66 * heightRatio,
        top: 65
    },
  });

/*
                            <FlatList fadingEdgeLength={100} ref={flatListRef} data={workoutLocal.exercises} keyExtractor={(item) => item.id} renderItem={renderExerciseListItem} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}></FlatList>




                            <AddExerciseButton widthRatio={widthRatio} heightRatio={heightRatio} onPress={addExerciseHandler}></AddExerciseButton>

                            */