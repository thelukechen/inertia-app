import { Text , StyleSheet, View, findNodeHandle, UIManager} from "react-native";
import { useEffect, useImperativeHandle, useState, useRef } from "react";
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withTiming, } from "react-native-reanimated";
import { forwardRef } from "react";
import { TouchableOpacity, TextInput } from "react-native";
import { formattedDate, widthRatio } from "../helper";
const CurrentExericseItemFront = (props, ref) => {

    const exerciseId = props.exercise.id

    const styles = StyleSheet.create({
        listItemContainer: {
            backgroundColor: '#1C1C1E',
            borderRadius: 16,
            padding: 7,
            width: 370 * widthRatio,
            left: 1,
            marginBottom: 9
        },
        textPrimary: {
            color: 'white',
            letterSpacing: -.1,
        },
        textSecondary: {
            color: '#808080',
            fontWeight: "300",
        },
        labelText: {
            color: 'white',
            fontSize: 20,
            
        },
        dataText: {
            color: 'white',
            fontSize: 24,
        },
    });

    const [expanded, setExpanded] = useState(false)
    const [setList, setSetList] = useState(props.exercise.setList)
    const [setListVisible, setSetListVisible] = useState('none')
    const setListOpacity = useSharedValue(0)
    const primaryTextRef = useRef(null);
    const primaryTextLeft = useSharedValue(0)
    const secondaryTextRef = useRef(null);
    const secondaryTextLeft = useSharedValue(0)
    const [displayInfo, setDisplayInfo] = useState('none')
    const infoOpacity = useSharedValue(0)
    const index = props.index
    const [calculated, setCalculated] = useState(false)

    const setLogs = useRef([])



    const animatePrimaryText = useAnimatedStyle(() => {
        return {
            left: primaryTextLeft.value
        }
    })

    const animateSecondaryText = useAnimatedStyle(() => {
        return {
            left: secondaryTextLeft.value
        }
    })

    const animateSetList = useAnimatedStyle(() => {
        return {
            opacity: setListOpacity.value
        }
    })

    const animateInfo = useAnimatedStyle(() => {
        return {
            opacity: infoOpacity.value
        }
    })

    const itemHeight = useSharedValue(108);
    const animateItemHeight = useAnimatedStyle(() => {
        return {
            height: itemHeight.value
        }
    })

    function navigateToInfo() {
        props.navigation.navigate("ExerciseInfoScreen")
    }

    useEffect(() => {
        if (props.currentExercise) {
            handleExpansion()
        } else {
            handleShrink()
        }
    }, [props.currentExercise,])

    const [primaryExpandedLeftTranslate, setPrimaryExpandedLeftTranslate] = useState(0)
    const [secondaryExpandedLeftTranslate, setSecondaryExpandedLeftTranslate] = useState(0)


    function handlePressed() {
        props.handlePressed()
    }

    function handleExpansion() {
        if (!expanded) {
            setTimeout(() => {
                primaryTextLeft.value = withSpring(primaryExpandedLeftTranslate, {duration: 300})
                secondaryTextLeft.value = withSpring(secondaryExpandedLeftTranslate, {duration: 300})
                const expandedHeight = (150 + props.exercise.setList.length*58 + 53)
                itemHeight.value = withSpring(expandedHeight, {duration: 300})
            }, 500)
            setTimeout(() => {
                setSetListVisible('flex')
                setListOpacity.value = withTiming(1)
                setDisplayInfo('flex')
                infoOpacity.value = withTiming(1)
            }, 800);
            setExpanded(true)
        }
    }

    function handleShrink() {
        if (expanded) {
            setListOpacity.value = withTiming(0, {duration: 450})
            infoOpacity.value = withTiming(0, {duration: 450})
            setDisplayInfo('none')
            itemHeight.value = withTiming(108, {duration: 450})
            primaryTextLeft.value = withTiming(0, {duration: 450})
            secondaryTextLeft.value = withTiming(0, {duration: 450})
            setExpanded(false)
            
            let setDataToBeSaved = []
            
            for (let i = 0; i < setData.length; i++) {
                if (setData[i].checked) {
                    setDataToBeSaved.push(setData[i])
                }
            }
            console.log("Set data to be saved: ", setDataToBeSaved);
        }
    }

    useEffect(() => {
        console.log("Set data: ", setData)
    }, [setData])

    
    const [setData, setSetData] = useState(() => {
        let initialSetData = []
        for (let i = 1; i <= props.exercise.setList.length; i++) {
            const data = {
                "id": exerciseId,
                "date": formattedDate(),
                "setNumber": i,
                "reps": "",
                "weight": "",
                "rpe": "",
                "checked": false
            }
            initialSetData.push(data)
        }
        return initialSetData
    });
    
    function handleUpdateSetData(index, newData) {
        let newSetData = setData;
        newSetData[index] = newData
        console.log("New Set Data: ", newSetData)
        setSetData([...newSetData])
    }
    
    const SetListItem = (props) => {
        
        const itemHeight = useSharedValue(50);
        const itemMargin = useSharedValue(8);
        
        const thisSetData = setData[props.index]
        
        const [reps, setReps] = useState(thisSetData.reps);
        const [weight, setWeight] = useState(thisSetData.weight)
        const [rpe, setRpe] = useState(thisSetData.rpe)

        const repRef = useRef(null);
        const weightRef = useRef(null);
        const rpeRef = useRef(null);


        const handleRepsChange = (inputText) => {
            inputText = inputText.replace(/[^0-9]/g, '');
            setReps((inputText));
        }

        const handleWeightChange = (inputText) => {
            inputText = inputText.replace(/[^0-9]/g, '');
            setWeight((inputText));
        }

        const handleRpeChange = (inputText) => {
            inputText = inputText.replace(/[^0-9]/g, '');
            setRpe((inputText));
        }

        const animateItemStyle = useAnimatedStyle(() => {
            return {
                height: itemHeight.value,
                marginBottom: itemMargin.value
            }
        })
        

        function handleCheck() {
            const setData = {
                "id": exerciseId,
                "date": formattedDate(),
                "setNumber": props.index + 1,
                "reps": reps,
                "weight": weight,
                "rpe": rpe,
                "checked": !thisSetData.checked
            }
            handleUpdateSetData(props.index, setData)
        }


        return (
            <View>
                <Animated.View style={[{flexDirection: 'row'}, animateItemStyle]}>
                    
                    <View style={{width: 68*widthRatio, left: 10*widthRatio, top: 20, marginRight: -15}} >
                        <Text style={styles.dataText}>{props.index + 1}</Text>
                    </View>
                    <TouchableOpacity onPress={() => repRef.current.focus()} style={{ width: 50*widthRatio, top: 8.5, marginRight: 16*widthRatio, backgroundColor: '#383838', borderRadius: 14, alignItems: 'center', justifyContent: 'center'}}>
                        <TextInput placeholder={props.item.Reps} placeholderTextColor={"#a0a0a0"} value={reps} onChangeText={handleRepsChange} focusable={false} keyboardAppearance="dark" keyboardType="number-pad" ref={repRef} style={[styles.dataText, {textAlign: 'center'}]}></TextInput>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => weightRef.current.focus()} style={{width: 80 * widthRatio, top: 8.5, marginRight: 16*widthRatio, backgroundColor: '#383838', borderRadius: 14, alignItems: 'center', justifyContent: 'center'}}>
                        <TextInput placeholder={props.item.Weight} placeholderTextColor={"#a0a0a0"} value={weight} onChangeText={handleWeightChange} focusable={false} keyboardAppearance="dark" keyboardType="number-pad" ref={weightRef} style={styles.dataText}></TextInput>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => rpeRef.current.focus()} style={{width: 50 * widthRatio, top: 8.5, marginRight: 15*(widthRatio), backgroundColor: '#383838', borderRadius: 14, alignItems: 'center', justifyContent: 'center'}}>
                        <TextInput placeholder={props.item.Rpe} placeholderTextColor={"#a0a0a0"} value={rpe} onChangeText={handleRpeChange} focusable={false} keyboardAppearance="dark" keyboardType="number-pad" ref={rpeRef} style={[styles.dataText, {textAlign: 'center'}]}></TextInput>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={handleCheck} style={{width: 50*(widthRatio), top: 6, alignItems: 'center', justifyContent: 'center' , backgroundColor: thisSetData.checked ? '#7fe18f' : '#383838', top: 8.5, borderRadius: 14}}>
                        <View style={{height:25, width: 5, backgroundColor: thisSetData.checked ? 'white' : 'grey', borderRadius: 10, position: 'absolute', transform: [{rotate: '40deg'}], left: 28}}>
                            
                        </View>
                        <View style={{height:5, width: 13, backgroundColor: thisSetData.checked ? 'white' : 'grey', borderRadius: 10, top: 27, left: 14, position: 'absolute', transform: [{rotate: '40deg'}]}}>
                            
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        )
    }

    return (
        <Animated.View style={[animateItemHeight,styles.listItemContainer]}>
            <TouchableOpacity onPressOut={handlePressed}> 
            <View style={[{height: 101,flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -10}]}>
                <Animated.View style={{borderRadius: 180, backgroundColor: props.backgroundCircleColor, height: 76, width: 76, marginLeft: 11*widthRatio, top: 6, marginRight: 3}}>
                </Animated.View>
                <Animated.View style={{ marginRight: 8*widthRatio, top: 7}}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <View ref={primaryTextRef} onLayout={() => {
                            if (primaryTextRef.current && !calculated) {
                                primaryTextRef.current?.measureInWindow(
                                    (x, y, width, height) => {
                                    setPrimaryExpandedLeftTranslate(115 - x)
                                    setCalculated(true)
                                    },
                                    () => {
                                    console.error('Measurement failed');
                                    },
                                );
                            }
                        }} style={{backgroundColor: 'black', height: 20, width:5, opacity: 0}}></View>
                        <View>
                            <Animated.Text style={[styles.textPrimary, animatePrimaryText, {fontSize: 20, textAlign: 'right',}]}>{props.exercise.name}</Animated.Text>
                        </View>                   
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <View ref={secondaryTextRef} onLayout={() => {
                            if (secondaryTextRef.current && !calculated) {
                                secondaryTextRef.current?.measureInWindow(
                                    (x, y, width, height) => {
                                    setSecondaryExpandedLeftTranslate(115 - x)
                                    setCalculated(true)
                                    },
                                    () => {
                                    console.error('Measurement failed');
                                    },
                                );
                            }
                        }} style={{backgroundColor: 'black', height: 20, width:5, opacity: 0}}></View>
                        <View>
                            <Animated.Text style={[styles.textSecondary, animateSecondaryText, {fontSize: 17, textAlign: 'right'}]}>{setList.length} sets {props.exercise.lowRepRange}-{props.exercise.highRepRange} reps</Animated.Text>
                        </View>
                    </View>
                </Animated.View>

            </View>
            <Animated.View style={[{marginTop: 18, marginLeft: 18, display: setListVisible}, animateSetList]}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.labelText, {marginRight: 27}]}>Set</Text>
                    <Text style={[styles.labelText, {marginRight: 43}]}>Reps</Text>
                    <Text style={[styles.labelText, {marginRight: 46}]}>Lbs</Text>
                    <Text style={[styles.labelText]}>RPE</Text>
                </View>
                <View>
                    {setList.map((data, index) => (
                        <SetListItem key={data.Id} item={data} index={index}></SetListItem>
                    ))}
                </View>
            </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    );
}

export default forwardRef(CurrentExericseItemFront);

