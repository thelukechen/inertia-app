import { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, FlatList, Modal, Dimensions, Image, TouchableOpacity } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Animated, { useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import CurrentExerciseItemFront from "./CurrentExerciseItemFront";
import { PanGestureHandler } from "react-native-gesture-handler";
import GestureRecognizer from "react-native-swipe-gestures";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const heightRatio = windowHeight/844;
const widthRatio = windowWidth/390;

function WorkoutContainerComponent({workout, date, navigation, endWorkout, closeSummary}) {
    const dateRel = date;
    const workoutLocal = workout


    const [modalStartVisible, setModalStartVisible] = useState(true);  
    const daysOfWeek = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY"    ]

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

    const colors = [
        "#FFB846",
        "#9FFF91",
        "#77C0FF",
        "#FF89FA",
        "#FF6565"
    ]


    function modalPressHandler() {
        setModalStartVisible(false);
        
    }

    const [currentExercise, setCurrentExercise] = useState(workoutLocal.exercises[0].id)

    const flatListRef = useRef(null)

    function renderExerciseListItem(itemData) {
        function handlePressed() {
            console.log("Pressed: ", itemData.item.id)
            setCurrentExercise(itemData.item.id)
        }

        return (
                <CurrentExerciseItemFront handlePressed={handlePressed} currentExercise={currentExercise === itemData.item.id} navigation={navigation} exercise={itemData.item} backgroundCircleColor={colors[itemData.index % 5]} heightRatio={heightRatio} widthRatio={widthRatio} index={itemData.index}></CurrentExerciseItemFront>
        );
    }

    function endWorkoutHandler() {
        workoutTopPosition.value = withTiming(-800)
        animateEndButtonOpacity.value = withTiming(0)
        animateWorkoutSummaryTop.value = withTiming(90)
    }

    function closeSummaryHandler() {
        endWorkout()
    }

    const opacityAnimated = useSharedValue(0);
    const animateOpacity = useAnimatedStyle(() => {
        return {
            opacity: opacityAnimated.value
        }
    })
    

    useEffect(() => {
        setTimeout(() => {
            
        }, 300);
        opacityAnimated.value = withTiming(1,{duration: 1000})
    })

    const workoutTopPosition = useSharedValue(0)

    const animatedWorkout = useAnimatedStyle(() => {
        return {
            top: workoutTopPosition.value
        }
    })

    const animateEndButtonOpacity = useSharedValue(1);

    const animateEndButton = useAnimatedStyle(() => {
        return {
            opacity: animateEndButtonOpacity.value
        }
    })

    const animateWorkoutSummaryTop = useSharedValue(800)

    const animateEndWorkout = useAnimatedStyle(() => {
        return {
            top: animateWorkoutSummaryTop.value,
        }
    })


    function handleGoBackToWorkout() {
        workoutTopPosition.value = withTiming(0)
        animateEndButtonOpacity.value = withTiming(1)
        animateWorkoutSummaryTop.value = withTiming(800)
    }

    return(
            <View style={styles.workoutScreenContainer}>
                <Animated.View  style={[{top: 700*heightRatio, position: 'absolute', zIndex: 1,}, animateEndButton]}>
                    <TouchableOpacity onPress={endWorkoutHandler}>
                        <View style={{height: 45, width: 137, borderRadius: 60, backgroundColor: '#74e189', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: 'white', fontSize: 23}}>{"End"}</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
                <Modal
                    animationType="none"
                    transparent={false}
                    visible={modalStartVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalStartVisible(!modalStartVisible);
                    }}>
                    <Pressable onPress={modalPressHandler}>
                        <View style={{height: windowHeight, width: windowWidth, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
                            <Animated.View style={[animateOpacity,{marginLeft: 30 * widthRatio, marginRight: 30 * widthRatio}]}>
                                <Text style={{color: 'white', fontSize: 20 * widthRatio, textAlign: 'center'}}>
                                    "The resistance that you fight physically in the gym and the resistance that you fight in life can only build a strong character."
                                </Text>
                            </Animated.View>
                        </View>
                    </Pressable>
                </Modal>

                <Animated.View style={animatedWorkout}>
                    <View style={styles.headerContainer}>
                        <View style={styles.leftHeaderContainer}>
                            <View style={{marginBottom: -10, height: 25, left: 12 * widthRatio}}>
                                <Text style={styles.dateText}>{daysOfWeek[dateRel.getDay()]}, {months[date.getMonth()]} {date.getDate()}</Text>
                            </View>
                        </View>
                    </View>
                                    
                    <View style={[styles.workoutContainer, {flex: 50.4 * heightRatio}, {top: 18}]}>
                        <FlatList ref={flatListRef} data={workoutLocal.exercises} keyExtractor={(item) => item.id} renderItem={renderExerciseListItem} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}></FlatList>
                    </View>
                </Animated.View>
                    <Animated.View style={[styles.endWorkoutModalContainer, animateEndWorkout]}       onTouchStart={e=> touchY = e.nativeEvent.pageY}
                        onTouchEnd={e => {
                            if (touchY - e.nativeEvent.pageY < -80)
                            handleGoBackToWorkout()
                        }}>

                        <View style={styles.workoutSummaryContainer}>
                            <View>
                                <Text style={styles.workoutSummaryHeader}>
                                    Summary
                                </Text>
                            </View>
                            <View style={styles.infoOneContainer}>
                                <View>
                                    <Text style={styles.caloriesText}>
                                        Calories
                                    </Text>
                                    <View style={styles.calContainer}>
                                        <Text style={styles.caloriesValOne}>
                                            427
                                        </Text>
                                        <Text style={styles.caloriesValTwo}>
                                            CAL
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.caloriesText}>
                                        Avg Heart Rate
                                    </Text>
                                    <View style={styles.calContainer}>
                                        <Text style={styles.caloriesValOne}>
                                            117
                                        </Text>
                                        <Text style={styles.caloriesValTwo}>
                                            BPM
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View style={styles.timeRow}>
                                    <Text style={styles.timeHeader}>
                                        Duration
                                    </Text>
                                    <Text style={styles.timeValue}>
                                        1:37:32
                                    </Text>
                                </View>
                                <View style={styles.timeRow}>
                                    <Text style={styles.timeHeader}>
                                        Active Time
                                    </Text>
                                    <Text style={styles.timeValue}>
                                        1:02:12
                                    </Text>
                                </View>
                                <View style={styles.timeRow}>
                                    <Text style={styles.timeHeader}>
                                        Avg Rest Time
                                    </Text>
                                    <Text style={styles.timeValue}>
                                        1:32
                                    </Text>
                                </View>
                                <View style={[styles.timeRow, {marginTop: 22}]}>
                                    <Text style={styles.timeHeader}>
                                        PRs
                                    </Text>
                                    <Text style={styles.timeValue}>
                                        3
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.checkContainer}>
                            <TouchableOpacity onPress={closeSummaryHandler} style={{height: 92, width: 92, left: 9, top: 9, backgroundColor: '#75e18a', borderRadius: 90}}>
                                <View style={{height:45, width: 10, backgroundColor: 'white', borderRadius: 10, position: 'absolute', transform: [{rotate: '40deg'}], top: 22, left: 49}}>
                                
                                </View>
                                <View style={{height:10, width: 24, backgroundColor:'white', borderRadius: 10, top: 47, left: 24, position: 'absolute', transform: [{rotate: '40deg'}]}}>
                                    
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
            </View>
    );
}
export default WorkoutContainerComponent;


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
        top: 25,
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
        fontSize: 60.5 * widthRatio,
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
    endWorkoutModalContainer: {
        height: 650 * heightRatio,
        alignSelf: 'center',
        width: 400 * widthRatio,
        top: 115 * heightRatio,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    workoutSummaryContainer: {
        backgroundColor: '#1C1C1E',
        height: 600 * heightRatio,
        width: 385 * widthRatio,
        borderRadius: 15,
        paddingVertical: 20 * heightRatio,
        paddingHorizontal: 35 * widthRatio,
    },
    workoutSummaryHeader: {
        color: 'white',
        fontSize: 50 * widthRatio,
        fontWeight: '600'
    },
    summaryText: {
        color: 'white',
        fontSize: 20 * widthRatio,
        fontWeight: '300'
    },
    infoOneContainer: {
        marginTop: 20 * heightRatio,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    calContainer: {
        flexDirection: 'row',
        marginBottom: 24 * heightRatio,
    },
    caloriesText: {
        color: '#acacae',
        fontSize: 22 * widthRatio,
        marginBottom: 10 * heightRatio
    },
    caloriesValOne: {
        color: '#f85b5b',
        fontSize: 24 * widthRatio
    },
    caloriesValTwo: {
        color: '#f85b5b',
        fontSize: 16 * widthRatio,
        marginTop: 8 * heightRatio
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeHeader: {
        color: 'white',
        fontSize: 28 * widthRatio,
        fontWeight: '300',
        marginBottom: 12 * heightRatio
    },
    timeValue: {
        color: '#acacae',
        fontSize: 28 * heightRatio,
        fontWeight: '300',
        marginBottom: 12 * heightRatio
    },
    checkContainer: {
        backgroundColor: 'black',
        height: 110 * heightRatio,
        width: 110 * widthRatio,
        borderRadius: 90,
        position: 'absolute',
        top: 539 * heightRatio
    }
  });
