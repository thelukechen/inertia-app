import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, Animated as DefaultAnimated, TextInput, TouchableOpacity} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import CurrentExericseItemFront from "./CurrentExerciseItemFront";
import ExerciseTimer from "./ExerciseTimer";
import Animated, { } from "react-native-reanimated";
import { FlatList } from "react-native";
function CurrentExerciseListItem({name, sets, lowRepRange, highRepRange, backgroundSrc, imgSrc, handleEnterButton, setNumber, navigation, backgroundCircleColor, currentExercise, firstExercise, goNext}) {

    const [weightText, setWeightText] = useState("Weight");
    const [repsText, setRepsText] = useState("Reps");
    const [initialFlip, setInitialFlip] = useState(false);
    const animate = useRef(new DefaultAnimated.Value(0));    
    const [isFlipped, setIsFlipped] = useState(false);
    let relativeHighWeight = 0;
    let highWeight = 0;
    let highReps = 0;

    function handleTextInputFocusWeight() {
            setWeightText("");
    }

    function handleTextInputFocusReps() {
        setRepsText("");
    }

    const handleTextInputChangeWeight = (text) => {

            setWeightText(text);

    }


    const handleTextInputChangeReps = (text) => {
        setRepsText(text);
    }

    const expandRef = useRef();
    const [expandCounter, setExpandCounter] = useState(0);
    useEffect(() => {
        if (firstExercise && (expandCounter === 0)) {
            expandRef.current.expand();
            setExpandCounter(1);
        }
    })
    function gestureHandler() {
            if (!initialFlip && currentExercise) {
                doAFlip();
                setInitialFlip(true);
                setTimeout(() => {
                    setDefaultFront('none');
                    setTimerDisplay('flex');
                }, 300)
            }        
    }

    const doAFlip = () => {
        DefaultAnimated.timing(animate.current, {
            duration: 300,
            toValue: isFlipped ? 0:180,
            useNativeDriver: true,
        }).start(() => {
            setIsFlipped(!isFlipped);
        });
    };


    const interpolatedValueFront = animate.current.interpolate({
        inputRange: [0, 180],
        outputRange: ["0deg", "180deg"],
      });
    
    const interpolatedValueBack = animate.current.interpolate({
        inputRange: [0, 180],
        outputRange: ["180deg", "360deg"],
      });
    
      const rotateFront = {
        transform: [
          {
            rotateY: interpolatedValueFront,
          },
        ],
      };
    
      const rotateBack = {
        transform: [
          {
            rotateY: interpolatedValueBack,
          },
        ],
      };


    const timerRef = useRef();

    function endTimer() {
        doAFlip();        
    }
        const [expanded, setExpanded] = useState(false);
    function enterButtonPressedHandler() {
        if (isFlipped) {
            setExpanded(true);
            const weightValue = parseInt(weightText, 10);
            const repsValue = parseInt(repsText);
            const lastSet = setNumber === sets ? true : false;

            if (!isNaN(weightValue) && !isNaN(repsValue)) {
                setExerciseStats(exerciseStats.concat([[weightValue, repsValue]]))
            }

            if (!isNaN(weightValue) && !isNaN(repsValue) && !lastSet) {
                setWeightText("Weight");
                setRepsText("Reps");
                console.log(weightValue);
                console.log(repsValue);

                const relativeWeight = parseInt(weightValue / (1.0278 - 0.0278 * repsValue));
                if (relativeHighWeight < relativeWeight) {
                    relativeHighWeight = relativeWeight;
                    highWeight = weightValue;
                    highReps = repsValue;
                }
                if (initialFlip) {
                    setTimerDisplay('flex');
                    setDefaultFront('none');
                }

                doAFlip();
                setTimeout(() => {
                    timerRef.current.startTimer();
                }, 500);

                handleEnterButton(weightValue, repsValue, lastSet, relativeHighWeight, highWeight, highReps);

            } else if (!isNaN(weightValue) && !isNaN(repsValue) && lastSet) {
                    console.log("Call firebase to enter" + relativeHighWeight + "," + highWeight + "," + highReps);
                    handleEnterButton(weightValue, repsValue, lastSet, relativeHighWeight, highWeight, highReps);
                    setTimerDisplay('none');
                    setSummaryDisplay('flex');
                    doAFlip();
                    setTimeout(() => {
                        setInputDisplay('none');
                    }, 300);
                    return;
            }
            else {
                console.log("Please enter valid weight and reps values");
            }
        }
    }


    function handleNext() {
        goNext();
    }

    const [defaultFront, setDefaultFront] = useState('flex');
    const [timerDisplay, setTimerDisplay] = useState('none');
    const [enterDisplay, setEnterDisplay] = useState('flex');
    const [summaryDisplay, setSummaryDisplay] = useState('none');
    const [inputDisplay, setInputDisplay] = useState('flex');


    const [exerciseStats, setExerciseStats] = useState([]);

    useEffect(() => {
        if (exerciseStats.length > 0) {
            console.log(exerciseStats[exerciseStats.length - 1])
        }
    }, [exerciseStats])

    function renderSetData(item) {
        return (
            <View>
                <Text style={{color: 'white', fontSize: 20}}>Set {item.index}: {item.item[0]}x{item.item[1]}</Text>
            </View>
        )
    }

        return(
            <View>
                <GestureRecognizer onSwipeLeft={gestureHandler}>
                    <DefaultAnimated.View style={[styles.listItemContainer, styles.front, rotateFront]}>

                            <CurrentExericseItemFront ref={expandRef} currentExercise={currentExercise} firstExercise={firstExercise} navigation={navigation} display={defaultFront} setNumber={setNumber} backgroundSrc={backgroundSrc} imgSrc={imgSrc} name={name} sets={sets} lowRepRange={lowRepRange} highRepRange={highRepRange} backgroundCircleColor={backgroundCircleColor}></CurrentExericseItemFront>
                            <View style={[{display: timerDisplay}]}>
                                <ExerciseTimer ref={timerRef} completeTimer={endTimer} setNumber={setNumber} lowRepRange={lowRepRange} highRepRange={highRepRange} name={name}></ExerciseTimer>
                            </View>
                            <Animated.View style={[styles.listItemContainer, {justifyContent: 'center', alignItems: 'center', display: summaryDisplay, height: 420}]}>
                                <View style={[{ left: -6, flexDirection: 'column' ,justifyContent: 'space-between', top: 40, alignItems: 'center'}]}>
                                    <Text style={{color: 'white', fontSize: 20, left: 6, marginBottom: 50}}>Exercise Summary Placeholder</Text>
                                    <FlatList data={exerciseStats} renderItem={renderSetData}>

                                    </FlatList>
                                    <TouchableOpacity style={{zIndex: 5, left: 6}} onPress={handleNext}>
                                        <View style={{height: 50, width: 100, borderRadius: '20', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{color: 'white', fontSize: 14}}>Next</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </Animated.View>
                    </DefaultAnimated.View>
                    <DefaultAnimated.View style={[styles.back, rotateBack, ]}>

                        <Animated.View style={[ styles.listItemContainer,{display: inputDisplay, height: 420}]}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{marginTop: 13, marginLeft: 20}}>
                                <Text style={{fontSize: 47, color: 'white', fontWeight: '600'}}>Set {setNumber}</Text>
        
                                </View>
                            </View>
                            <View style={[{ left: -6, flexDirection: 'column' ,justifyContent: 'space-between', top: -60, alignItems: 'center', display: inputDisplay}]}>

                                <TextInput value={weightText} keyboardAppearance="dark" keyboardType={'numeric'} onFocus={handleTextInputFocusWeight} onChangeText={handleTextInputChangeWeight} editable={isFlipped} style={{backgroundColor: '#3C3B40', height: 82, top: -50, borderRadius: 20,  fontSize: 27, color: 'white', paddingLeft: 15, marginBottom: 24, width: 333}}>
                                    
                                </TextInput>
                                <TextInput value={repsText} keyboardAppearance="dark" keyboardType={'numeric'} onFocus={handleTextInputFocusReps} onChangeText={handleTextInputChangeReps} editable={isFlipped} style={{backgroundColor: '#3C3B40', height: 82, top: -50, borderRadius: 20,  fontSize: 27, color: 'white', paddingLeft: 15, marginBottom: 10, width: 333}}>
                                    
                                </TextInput>
                                <TouchableOpacity onPress={enterButtonPressedHandler}>
                                    <View style={styles.enterButtonContainer}>
                                        <Text style={styles.enterButtonText}>
                                            Enter
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </DefaultAnimated.View>
                </GestureRecognizer>
            </View>    
        );

    }









export default CurrentExerciseListItem;

const styles = StyleSheet.create({
    listItemContainer: {
        color: '#1C1C1E',
        backgroundColor: '#1C1C1E',
        borderRadius: 16,
        justifyContent: 'space-between',
        width: 370,
        marginBottom: 9,
    },
    leftListItem: {
        top: 0,
        left: 0,
        
    },
    imgBackground: {
        width: 87,
        height: 87,
    },
    rightListItem: {
        marginLeft: 10,
        
    },
    textPrimary: {
        color: 'white',
    },
    textSecondary: {
        color: 'white',
        fontWeight: "300",
    },
    listItemContainerPressed: {
        color: '#1C1C1E',
        backgroundColor: '#1C1C1E',
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 7,
        width: 384,
        marginBottom: 17.5,
        height: 200,
    },
    imgContainer: {
        position: 'absolute',
        top: 8,
        left: 8,
        width: 70,
        height: 70
    },
    back: {
        backfaceVisibility: 'hidden',
        position: 'absolute',
    },
    front: {
        backfaceVisibility: 'hidden',
    },
    enterButtonContainer: {
        width: 145,
        height: 41,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:25,
        backgroundColor: '#78E28A',
        marginTop: -34,
    },
    enterButtonText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center'
      }
});
  
/*
                <View style={{flexDirection: 'row'}}>
                    <View style={{marginTop: 13, marginLeft: 20}}>
                    <Text style={{fontSize: 47, color: 'white', fontWeight: '600'}}>Set {setNumber}</Text>

                    </View>
                </View>
                <View style={{top: -8, left: 74}}>
                    <Image source={backgroundSrc} style={{height: 230, width: 230}}>
                    </Image>
                    <Image source={imgSrc} style={{position: "absolute" , top: 20, left: 25, height: 185, width: 185}}></Image>
                </View>

                <View style={[{justifyContent: 'flex-end', marginBottom: 35, marginRight: 0, marginLeft: 10}]}>
                    <Text style={[styles.textPrimary, {fontSize: 28, textAlign: 'center'}]}>{name}</Text>
                    <Text style={[styles.textSecondary, {fontSize: 22, textAlign: 'center'}]}>{sets} sets {lowRepRange}-{highRepRange} reps</Text>

                </View>






                                <View style={{flexDirection: 'row'}}>
                    <View style={{marginTop: 13, marginLeft: 20}}>
                    <Text style={{fontSize: 47, color: 'white', fontWeight: '600'}}>Set {setNumber}</Text>

                    </View>
                </View>
                <View style={{top: 0, left: 83}}>
                <CircularProgress
                    initialValue={0}
                    maxValue={180}
                    value={180}
                    radius={100}
                    duration={180000}
                    progressValueColor={'white'}
                    progressValueFontSize={45}
                    valueSuffix={"s"}
                    valueSuffixStyle={{fontSize: 47}}
                    progressValueStyle={{fontWeight: '300'}}
                    titleFontSize={16}
                    titleColor={'#333'}
                    titleStyle={{ fontWeight: 'bold' }}
                    circleBackgroundColor={'#1C1C1E'}
                    activeStrokeColor={'red'}
                    activeStrokeSecondaryColor={'green'}
                    inActiveStrokeColor={'green'}
                    activeStrokeWidth={26.5}
                    inActiveStrokeWidth={0}
                    progressFormatter={(value) => {
                        'worklet';
                          
                        return (180 - value).toFixed(0);
                      }}
                    />


                </View>

                <View style={[{justifyContent: 'flex-end', marginBottom: 35, marginRight: 0, marginLeft: 10}]}>
                    <Text style={[styles.textPrimary, {fontSize: 28, textAlign: 'center'}]}>{name}</Text>
                    <Text style={[styles.textSecondary, {fontSize: 22, textAlign: 'center'}]}>{sets} sets {lowRepRange}-{highRepRange} reps</Text>

                </View>




                                    <View style={{display: enterDisplay}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{marginTop: 13, marginLeft: 20}}>
                            <Text style={{fontSize: 47, color: 'white', fontWeight: '600'}}>Set {setNumber}</Text>
    
                            </View>
                        </View>
                        <View style={{ width:370, left: -6, flexDirection: 'column' ,justifyContent: 'space-between', top: 80, alignItems: 'center'}}>
                            <TextInput value={weightText} keyboardType={'numeric'} onFocus={handleTextInputFocusWeight} onChangeText={handleTextInputChangeWeight} editable={isFlipped} style={{backgroundColor: '#3C3B40', height: 82, top: -50, borderRadius: 20,  fontSize: 27, color: 'white', paddingLeft: 15, marginBottom: 24, width: 333}}>
                                
                            </TextInput>
                            <TextInput value={repsText} keyboardType={'numeric'} onFocus={handleTextInputFocusReps} onChangeText={handleTextInputChangeReps} editable={isFlipped} style={{backgroundColor: '#3C3B40', height: 82, top: -50, borderRadius: 20,  fontSize: 27, color: 'white', paddingLeft: 15, marginBottom: 10, width: 333}}>
                                
                            </TextInput>
                            <Pressable onPress={enterButtonPressedHandler}>
                                <View style={styles.enterButtonContainer}>
                                    <Text style={styles.enterButtonText}>
                                        Enter
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>

                    itemHeight.value = withTiming(0, {duration: 600});
                    itemOpacity.value = withTiming(0, {duration: 600});
                    setTimeout(() => {
                        setTimerDisplay('none');
                    }, 600)


*/