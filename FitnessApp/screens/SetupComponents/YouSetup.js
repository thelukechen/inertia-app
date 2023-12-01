import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { userId } from "../Auth";
function YouSetup({onPressDown, index}) {

    const [weightVal, setWeightVal] = useState("150");
    const [isWeightFocused, setIsWeightFocused] = useState(false);


    const [heightVal, setHeightVal] = useState("5");
    const [isHeightFocused, setIsHeightFocused] = useState(false);
    const [inchesVal, setInchesVal] = useState("11");
    const [isInchesFocused, setIsInchesFocused] = useState(false);

    const [ageVal, setAgeVal] = useState("21");
    const [isAgeFocused, setIsAgeFocused] = useState(false);

    const [sexVal, setSexVal] = useState("M");

    const handleWeightFocus = () => {
        setIsWeightFocused(true);
        setWeightVal("");
    }

    const handleHeightFocus = () => {
        setIsHeightFocused(true);
        setHeightVal("");
    }

    const handleInchesFocus = () => {
        setIsInchesFocused(true);
        setInchesVal("");

    }

    const handleAgeFocus = () => {
        setIsAgeFocused(true);
        setAgeVal("");
    }




    const inputWeightTextRef = useRef(null);
    const weightPressHandler = () => {
        inputWeightTextRef.current.focus();
      };


    const inputHeightRef = useRef(null);
    const heightPressHandler = () => {
          inputHeightRef.current.focus();
        };


    const inputAgeTextRef = useRef(null);
    const agePressHandler = () => {
          inputAgeTextRef.current.focus();
    };
    const handleWeightTextChange = (inputText) => {
        if (parseInt(inputText) < 999 || inputText == "") {
            setWeightVal(inputText);
            console.log(inputText);
        } else {
            console.log("Invalid");
        }

      };



      const handleHeightTextChange = (inputText) => {
        if (inputText.length < 2 || inputText === "") {
            setHeightVal(inputText);

        } else {
            console.log("Invalid");
        }
      };


      const handleInchesTextChange = (inputText) => {
        if (inputText.length < 3 || inputText === "") {
            if (parseInt(inputText) < 13 || inputText === "") {
                setInchesVal(inputText);
            } else {
                console.log("Invalid");
            }

        } else {
            console.log("Invalid");
        }
      };

      const handleAgeTextChange = (inputText) => {
        if (parseInt(inputText) < 100 || inputText == "") {
            setAgeVal(inputText);
            console.log(inputText);
        } else {
            console.log("Invalid");
        }

      };

      function handleSexChange() {
        if (sexVal === "M") {
            setSexVal("F");
        } else {
            setSexVal("M")
        }
      }


      useEffect(() => {
        if (index === 4) {

            const calories = parseInt(weightVal) * 15;
            const protein = parseInt(weightVal);
            const fats = parseInt(parseInt(weightVal) * .45);
            const carbs = parseInt((calories - ((protein * 4) + (fats) * 9))/4);

            const data = {
                UID: userId,
                Calories: calories,
                Carbs: carbs,
                Fats: fats,
                Protein: protein
              };



        }
      }, [index]);


    

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                You
            </Text>
            <View style={{top: 77}}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={weightPressHandler}>
                        <View style={[styles.buttonContainer, {top: -90, left: -8}]}>
                            <Text style={[styles.buttonTextColor, {top: -5}]}>
                                Weight
                            </Text>
                            <View style={{flexDirection: 'row', top: -10}}>
                                <TextInput ref={inputWeightTextRef} onFocus={handleWeightFocus} placeholder="150" placeholderTextColor={isWeightFocused ? 'transparent' : 'white'} value={weightVal} onChangeText={handleWeightTextChange} keyboardType="decimal-pad" style={[styles.buttonTextColor, {fontSize: 30}]} keyboardAppearance="dark">
                                
                                </TextInput>
                                <Text style={[styles.buttonTextColor, {top: 14}]}>lbs</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                        <View style={[styles.buttonContainer, {top: -90, left: 9}]}>
                            <Text style={[styles.buttonTextColor, {top: -5}]}>
                                Height
                            </Text>
                            <View style={{flexDirection: 'row', top: -10}}>
                                <TextInput ref={inputHeightRef} onFocus={handleHeightFocus} placeholder={"5"} placeholderTextColor={isHeightFocused ? 'transparent' : 'white'} value={heightVal} onChangeText={handleHeightTextChange} keyboardType="decimal-pad" keyboardAppearance="dark" style={[styles.buttonTextColor, {fontSize: 26, left: 2}]}>
                                
                                </TextInput>
                                <Text style={styles.buttonTextColor}>
                                    '
                                </Text>
                                <TextInput onFocus={handleInchesFocus} placeholder="11" placeholderTextColor={isInchesFocused? 'transparent' : 'white'} value={inchesVal} onChangeText={handleInchesTextChange} keyboardType="decimal-pad" keyboardAppearance="dark" style={[styles.buttonTextColor, {fontSize: 26, left: 2}]}>

                                </TextInput>
                                <Text style={styles.buttonTextColor}>
                                    "
                                </Text>
                            </View>
                        </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={agePressHandler} >
                        <View style={[styles.buttonContainer, {top: -90, left: -8}]}>
                            <Text style={[styles.buttonTextColor, {top: -5}]}>
                                Age
                            </Text>
                            <View style={{flexDirection: 'row', top: -10}}>
                                <TextInput ref={inputAgeTextRef} keyboardAppearance="dark" onFocus={handleAgeFocus} placeholder="21" placeholderTextColor={isAgeFocused ? 'transparent' : 'white'} value={ageVal} onChangeText={handleAgeTextChange} keyboardType="decimal-pad" style={[styles.buttonTextColor, {fontSize: 30}]}>
                                
                                </TextInput>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSexChange}>
                        <View style={[styles.buttonContainer, {top: -90, left: 9}]}>
                            <Text style={[styles.buttonTextColor, {top: -5}]}>
                                Sex
                            </Text>
                            <Text style={[styles.buttonTextColor, {fontSize: 28, top: -10}]}>
                                {sexVal}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default YouSetup;

const styles = StyleSheet.create({
    container: {backgroundColor: 'black', flex: 1, alignItems: 'center', justifyContent: 'center'},
    headerText: {
        color: 'white',
        fontSize: 55,
        fontWeight: '600',
        top: -65,
    },
    buttonContainer: {
        backgroundColor: '#1c1c1e',
        height: 147,
        width: 147,
        borderRadius: 29,
        marginBottom: 17,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        height: 82.5,
        width: 82.5,
        top: 5
    },
    buttonTextColor: {
        color: 'white',
        fontSize: 16,
        marginTop: 5
    }
});