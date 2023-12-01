import { Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";


function AddExerciseButton({onPress, widthRatio, heightRatio, style}) {
    const styles = StyleSheet.create({
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

        },
    });
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[style, styles.buttonContainer]}>
                <Image source={require('../assets/plus.png')} style={{height: 40, width: 40}}/>
            </View>
        </TouchableOpacity>
    );
}

export default AddExerciseButton;

