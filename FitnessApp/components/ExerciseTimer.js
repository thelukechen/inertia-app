/*
import { useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

function ExerciseTimer({display, setNumber, name, sets, lowRepRange, highRepRange, timer, start, initital}) {

    const progressRef = useRef(null);

    useEffect(()=> {
        if (timer < 0) {
            progressRef.current.pause();
            console.log("Paused");

        } 
        if (timer === initital) {
            progressRef.current.reAnimate();
        }
    }, [timer]);

    


    return (
        <View style={{display: display, height: 420, }}>
        <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: 13, marginLeft: 20}}>
            <Text style={{fontSize: 47, color: 'white', fontWeight: '600'}}>Set {setNumber}</Text>
            </View>
        </View>
        <View style={{top: 0, left: 83}}>
        <CircularProgress
            initialValue={0}
            value={5 - timer}
            maxValue={5}
            radius={100}
            duration={1000}
            ref={progressRef}
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

                return (5-value).toFixed(0);
            }}
            />


        </View>

        <View style={[{justifyContent: 'flex-end', marginBottom: 35, marginRight: 0, marginLeft: 10, marginTop: 25}]}>
            <Text style={[styles.textPrimary, {fontSize: 28, textAlign: 'center'}]}>{name}</Text>
            <Text style={[styles.textSecondary, {fontSize: 22, textAlign: 'center'}]}>{sets} sets {lowRepRange}-{highRepRange} reps</Text>
        </View>
    </View>
    );
}

export default ExerciseTimer;

const styles = StyleSheet.create({
    listItemContainer: {
        color: '#1C1C1E',
        backgroundColor: '#1C1C1E',
        borderRadius: 16,
        justifyContent: 'space-between',
        padding: 7,
        width: 384,
        marginBottom: 17.5,
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
*/

import { useEffect } from "react";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { View , Text, StyleSheet} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
const ExerciseTimer = (props, ref) => {
    const [playing, setPlaying] = useState(false)

    useImperativeHandle(ref, () => ({
        startTimer,
    }))

    const startTimer = () => {
        setPlaying(true)
    }

    const countdownTop = useSharedValue(0);
    const countDownOpacity = useSharedValue(1);
    const animatedTop = useAnimatedStyle(() => {
        return ({
            top: countdownTop.value,
            opacity: countDownOpacity.value
        })
    })



    return (
        <View style={{height: 420}}>
            <View style={{flexDirection: 'row'}}>
                <View style={{marginTop: 13, marginLeft: 20}}>
                    <Text style={{fontSize: 47, color: 'white', fontWeight: '600'}}>Set {props.setNumber}</Text>
                </View>
            </View>
            <View style={{alignItems: 'center', top: 30}}>
                <View>
                    <CountdownCircleTimer
                    isPlaying={playing}
                    duration={5}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[50, 35, 20, 0]}
                    onComplete={props.completeTimer}
                    strokeWidth={20}
                    size={190}
                    trailStrokeWidth={0}
                    >
                        {({ remainingTime, color }) => <Animated.View style={[{flexDirection: 'row', justifyContent: 'center'}]}>
                            <Text style={{color: color, fontSize: 40}}>{remainingTime}</Text>
                            <Text style={{fontSize: 32, color: 'white', top: 6}}>s</Text>
                            </Animated.View>}
                    </CountdownCircleTimer>
                </View>
                <View style={[{justifyContent: 'center', marginLeft: 0, top: 30}]}>
                    <Text style={[styles.textPrimary, {fontSize: 28, textAlign: 'center'}]}>{props.name}</Text>
                    <Text style={[styles.textSecondary, {fontSize: 17, textAlign: 'center'}]}>{props.sets} sets {props.lowRepRange}-{props.highRepRange} reps</Text>
                </View>
            </View>
        </View>
    );
}

export default forwardRef(ExerciseTimer);
const styles = StyleSheet.create({
    listItemContainer: {
        color: '#1C1C1E',
        backgroundColor: '#1C1C1E',
        borderRadius: 16,
        justifyContent: 'space-between',
        padding: 7,
        width: 384,
        marginBottom: 17.5,
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
      },
      textPrimary: {
        color: 'white',
        letterSpacing: -.1,
        },
        textSecondary: {
            color: '#808080',
            fontWeight: "300",
        },
});