import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { userId } from "../Auth";
function ExperienceSetup({onPressDown}) {
    function handleInput(input) {
        onPressDown();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                Experience Level
            </Text>
            <View style={{top: 77}}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => handleInput('B')}>
                        <View style={[styles.buttonContainer, {top: -90, left: -8}]}>
                            <Text style={styles.buttonTextColor}>
                                Beginner
                            </Text>
                            <Image source={require('../../assets/SetupIcons/Beginner.png')} style={styles.imageStyle}>

                            </Image>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleInput('I')}>
                        <View style={[styles.buttonContainer, {top: -90, left: 9}]}>
                            <Text style={styles.buttonTextColor}>
                                Intermediate
                            </Text>
                            <Image source={require('../../assets/SetupIcons/Intermediate.png')} style={styles.imageStyle}>

                            </Image>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => handleInput('A')}>
                        <View style={[styles.buttonContainer, {top: -90, left: -8}]}>
                        <Text style={styles.buttonTextColor}>
                                Advanced
                            </Text>
                            <Image source={require('../../assets/SetupIcons/Advanced.png')} style={[styles.imageStyle]}>

                            </Image>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleInput('R')}>
                        <View style={[styles.buttonContainer, {top: -90, left: 9}]}>
                            <Text style={styles.buttonTextColor}>
                                Rich Piana
                            </Text>
                            <Image source={require('../../assets/SetupIcons/Rich_Piana.png')} style={[styles.imageStyle]}>

                            </Image>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default ExperienceSetup;

const styles = StyleSheet.create({
    container: {backgroundColor: 'black', flex: 1, alignItems: 'center', justifyContent: 'center'},
    headerText: {
        color: 'white',
        fontSize: 34,
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
        height: 86,
        width: 86,
        top: 0,
        shadowColor: '#32543c',
        shadowOpacity: 10,
        shadowRadius: 100
    },
    buttonTextColor: {
        color: 'white',
        fontSize: 16,
        marginTop: 5
    }
});