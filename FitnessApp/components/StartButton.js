
import { useState, useEffect } from "react";
import {Text, StyleSheet, TouchableOpacity, Animated } from "react-native";


function StartButton({workoutStarted, onPress, showButton}) {

  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (!showButton) {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  } else {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }
  }, [fadeAnim, showButton]);  


    return (
        <Animated.View style={[styles.buttonContainer, {opacity: fadeAnim}]}>
          <TouchableOpacity onPress={onPress} hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}>
              <Text style={styles.buttonText}>
                  {workoutStarted ? "Done" : "Start"}
              </Text>
            </TouchableOpacity>
      </Animated.View>


    );
}

export default StartButton;

const styles = StyleSheet.create({
    buttonContainer: {
      position: 'absolute',
      width: 135,
      height: 38,
      top: 715,
      left: 125,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:18,
      backgroundColor: '#78E28A',

    },
    buttonText: {
      color: 'white',
      fontSize: 22,
      textAlign: 'center'
    }

  });