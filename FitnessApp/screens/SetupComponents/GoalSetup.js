import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { userId } from "../Auth";

export let goal = "";

function GoalSetup({onPressDown}) {


    function handleInput(input) {
        onPressDown();
        goal = input;
        console.log(goal);
    }



    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                Goal
            </Text>
            <View style={{top: 77}}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => handleInput('Lose')}>
                        <View style={[styles.buttonContainer, {top: -90, left: -8}]}>
                            <Text style={styles.buttonTextColor}>
                                Lose Weight
                            </Text>
                            <Image source={require('../../assets/SetupIcons/Lose_Weight.png')} style={styles.imageStyle}>

                            </Image>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleInput('Gain')}>
                        <View style={[styles.buttonContainer, {top: -90, left: 9}]}>
                            <Text style={styles.buttonTextColor}>
                                Gain Mass
                            </Text>
                            <Image source={require('../../assets/SetupIcons/Gain_Mass.png')} style={styles.imageStyle}>

                            </Image>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => handleInput('Fit')}>
                        <View style={[styles.buttonContainer, {top: -90, left: -8}]}>
                        <Text style={styles.buttonTextColor}>
                                Be Fit
                            </Text>
                            <Image source={require('../../assets/SetupIcons/Be_Fit.png')} style={[styles.imageStyle, {height: 113, width: 113, marginTop: -22}]}>

                            </Image>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleInput('Tracking')}>
                        <View style={[styles.buttonContainer, {top: -90, left: 9}]}>
                            <Text style={styles.buttonTextColor}>
                                Tracking
                            </Text>
                            <Image source={require('../../assets/SetupIcons/Tracking.png')} style={[styles.imageStyle, {height: 90, width: 90, marginTop: 0, top: -3}]}>

                            </Image>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default GoalSetup;

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