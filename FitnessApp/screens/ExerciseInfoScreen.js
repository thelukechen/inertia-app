import { useState} from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated} from "react-native";
import { LineChart } from "react-native-wagmi-charts";
import { data1M, data1Y, data3M, data6M, dataLFT } from "../data/GraphDummyData";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
function ExerciseInfoScreen({navigation}) {
    const [data, setData] = useState(data6M);
    const [coverPos, setCoverPos] = useState(0);
    function backPressHandler() {
        navigation.goBack();
    }
    

    const [oneMPressed, setOneMPressed] = useState(true);
    const [threeMPressed, setThreeMPressed] = useState(false);
    const [sixMPressed, setSixMPressed] = useState(false);
    const [oneYPressed, setOneYPressed] = useState(false);
    const [lftMPressed, setLftPressed] = useState(false);
    const [slideValue, setSlideValue] = useState(new Animated.Value(0));
    const slideStyle = {
        transform: [{ translateX: slideValue }],
      };
    function oneMPressHandler() {
        setData(data1M);
        setOneMPressed(true);
        setThreeMPressed(false);
        setSixMPressed(false);
        setOneYPressed(false);
        setLftPressed(false);
        slideButton(0);
    }
    function threeMPressHandler() {
        setData(data3M);
        setOneMPressed(false);
        setThreeMPressed(true);
        setSixMPressed(false);
        setOneYPressed(false);
        setLftPressed(false);
        slideButton(57);
    }
    function sixMPressHandler() {
        setData(data6M);
        setOneMPressed(false);
        setThreeMPressed(false);
        setSixMPressed(true);
        setOneYPressed(false);
        setLftPressed(false);
        slideButton(115);
    }
    function oneYPressHandler() {
        setData(data1Y);
        setOneMPressed(false);
        setThreeMPressed(false);
        setSixMPressed(false);
        setOneYPressed(true);
        setLftPressed(false);
        slideButton(172);
    }
    function LFTPressHandler() {
        setData(dataLFT);
        setOneMPressed(false);
        setThreeMPressed(false);
        setSixMPressed(false);
        setOneYPressed(false);
        setLftPressed(true);
        slideButton(228);
    }

    function slideButton(newPosition) {
        Animated.timing(slideValue, {
            toValue: newPosition,
            duration: 300,
            useNativeDriver: true,
          }).start();
    }


    return(
        <View style={styles.infoContainer}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>
                    FRIDAY, MAR 3
                </Text>
            </View>
            <ScrollView>
                <View style={styles.graphContainer}>
                    <View>
                        <TouchableOpacity onPress={backPressHandler} style={{zIndex: 1}}>
                            <Image source={require('../assets/arrow_back.png')} style={styles.imageContainer}>

                            </Image>
                        </TouchableOpacity>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerMainText}>
                                Barbell Bench Press
                            </Text>
                            <Text style={styles.headerSecondText}>
                                Max: 225
                            </Text>
                            <Text style={styles.headerThirdText}>
                                1 Rep
                            </Text>
                            <Text style={styles.headerFourthText}>
                                07/25
                            </Text>
                        </View>
                    </View>
                    <View style={styles.chartContainer}>
                        <View style={styles.graphYAxis}>
                            <Text style={styles.graphYAxisText}>
                                230
                            </Text>
                            <Text style={styles.graphYAxisText}>
                                200
                            </Text>
                            <Text style={styles.graphYAxisText}>
                                180
                            </Text>
                        </View>
                        <View style={styles.lineChartContainer}>
                        <LineChart.Provider data={data} color={'white'}>
                            <LineChart width={275} height={80}>
                            <LineChart.Path color="red"  >
                                <LineChart.Gradient  />
                            </LineChart.Path>
                            <LineChart.CursorCrosshair color="red" />

                            </LineChart>
                        </LineChart.Provider>
                        </View>
                    </View>
                    <View style={styles.graphButtonContainer}>

                            <Animated.View style={[styles.slidingButton, slideStyle]} >

                            </Animated.View>
                            <View style={styles.graphButtonContainer}>
                                <Pressable onPress={oneMPressHandler}>
                                    <Text style={[styles.timeStepButtonTextTwo, {color: oneMPressed ? 'black': 'white'}]}>
                                        1M
                                    </Text >
                                </Pressable>
                            </View>
                            <View style={styles.graphButtonContainer}>
                                <Pressable onPress={threeMPressHandler}>
                                    <Text style={[styles.timeStepButtonTextTwo, {color: threeMPressed ? 'black': 'white'}]}>
                                        3M
                                    </Text >
                                </Pressable>
                            </View>
                            <View style={styles.graphButtonContainer}>
                                <Pressable onPress={sixMPressHandler}>
                                    <Text style={[styles.timeStepButtonTextTwo, {color: sixMPressed ? 'black': 'white'}]}>
                                        6M
                                    </Text >
                                </Pressable>
                            </View>
                            <View style={styles.graphButtonContainer}>
                                <Pressable onPress={oneYPressHandler}>
                                    <Text style={[styles.timeStepButtonTextTwo, {color: oneYPressed ? 'black': 'white'}]}>
                                        1Y
                                    </Text >
                                </Pressable>
                            </View>
                            <View style={styles.graphButtonContainer}>
                                <Pressable onPress={LFTPressHandler}>
                                    <Text style={[styles.timeStepButtonTextTwo, {color: lftMPressed ? 'black': 'white'}]}>
                                        LFT
                                    </Text >
                                </Pressable>
                            </View>

                    </View>
                </View>
                <View>
                    <Image source={require('../assets/Bench.png')} style={styles.exerciseImage}></Image>
                </View>
                <View style={styles.instructionsContainer}>
                    <Text  style={styles.instructionsHeader}>Instructions</Text>
                    <Text style={styles.instructionsText}>
                    The bench press is a popular strength training exercise that primarily targets the chest muscles, but also engages the triceps and shoulders. Here's a step-by-step guide on how to perform a bench press with proper form:

Set up the barbell: Start by adding the desired amount of weight to the barbell and securing it with collars on each end. Place the barbell on the bench press rack at a height that allows you to easily unrack it when lying down.

Lie down on the bench: Position yourself on the bench with your head and shoulders flat against it, and your feet firmly planted on the ground. Arch your back slightly and tuck your shoulder blades together to create a stable base.

Grip the bar: Grasp the bar with a shoulder-width grip, with your palms facing away from you. Make sure your grip is firm and your wrists are straight.

Unrack the bar: Lift the bar off the rack by straightening your arms. Hold the bar over your chest with your elbows locked out.

Lower the bar: Slowly lower the bar towards your chest by bending your elbows. Keep your elbows tucked in to your sides and aim to touch the bar to your mid-chest.

Press the bar: Once the bar has touched your chest, push it back up by straightening your arms. Exhale as you push the bar up and keep your elbows tucked in to your sides.

Repeat: Perform the desired number of reps, making sure to control the bar throughout the movement.

Rack the bar: Once you have completed your set, bring the bar back down to your chest and then lift it back onto the rack.

Remember to start with a weight that you can lift comfortably, and gradually increase the weight as you become stronger and more comfortable with the exercise. It's also important to have a spotter or use safety equipment when lifting heavy weights to avoid injury.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

export default ExerciseInfoScreen;


const styles = StyleSheet.create({
    infoContainer: {
        backgroundColor: 'black',
        flex: 1,
    },
    graphContainer: {
        backgroundColor: '#1C1C1E',
        height: 300,
        borderRadius: 15,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 22,
    },
    dateText: {
        color: '#7F7E84',
        fontSize: 16,
        fontWeight: 'bold'
    },
    dateContainer: {
        marginTop: 50,
        marginLeft: 5,
        marginBottom: 12
    },
    imageContainer: {
        height: 41,
        width: 41,
        marginLeft: 22,
        marginTop: 22
    },
    headerMainText: {
        color: 'white',
        fontSize: 26,
        textAlign: 'right',

    },
    headerContainer: {
        marginTop: -35,
        marginRight: 15
    },
    headerSecondText: {
        color: 'white',
        fontSize: 22,
        fontWeight: '100',
        textAlign: 'right',

    },
    headerThirdText: {
        color: 'white',
        fontSize: 19,
        textAlign: 'right',
        fontWeight: '100',

    },
    headerFourthText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'right',
        fontWeight: '100',

    },
    exerciseImage: {
        height: 200,
        width: 360,
        marginLeft: 14,
        borderRadius: 15,
        marginBottom: 22
    },
    instructionsContainer: {
            backgroundColor: '#1C1C1E',
            borderRadius: 15,
            marginLeft: 8,
            marginRight: 8,
            marginBottom: 22,
            paddingLeft: 30,
            paddingHorizontal: 30,
            paddingVertical: 25,
    },
    instructionsHeader: {
        color: 'white',
        fontSize: 24,
        marginBottom: 10
    },
    instructionsText: {
        color: 'white',
        fontSize: 16
    },
    graphYAxisText: {
        color: 'white',
        marginTop: 25
    },
    graphYAxis: {
        height: 200, 
        flexDirection: 'column',
        marginTop: -40,
        marginLeft: 20,


    },
    chartContainer: {
        flexDirection: 'row',
        
    },
    lineChartContainer: {
        top: 0,
        left: 30
    },
    graphButtonContainer: {
        top: -20,
        left: 35,
        flexDirection: 'row',

        
    },
    timeStepButtonTextOne: {
        color: 'black',
        fontSize: 17,
        marginRight: 33,
        fontWeight: '600'

    },
    timeStepButtonTextTwo: {
        color: 'black',
        fontSize: 17,
        marginRight: 33,
        fontWeight: '600'

    },
    slidingButton: {
        backgroundColor: 'white',
        height: 35,
        width: 56,
        position: 'absolute',
        zIndex:0,
        top: -27,
        left: 18,
        
        borderRadius: 11,
        
    },
    timeButtonContainer: {
        position: 'absolute',
        top: 10,
        left: -30,
        zIndex: 1
    }

    
});