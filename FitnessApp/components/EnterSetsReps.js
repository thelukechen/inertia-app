import { View, TextInput, Pressable, StyleSheet, Text } from "react-native";

function EnterSetsReps({display, setNumber, weightText, repsText, handleTextInputFocusWeight, handleTextInputChangeWeight, handleTextInputChangeReps, handleTextInputFocusReps, isFlipped, enterButtonPressedHandler}) {
    return (
    <View style={{display: display}}>
        <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: 13, marginLeft: 20}}>
            <Text style={{fontSize: 47, color: 'white', fontWeight: '600'}}>Set {setNumber}</Text>

            </View>
        </View>
        <View style={{ width:330, left: 20 , flexDirection: 'column' ,justifyContent: 'space-between', top: 80, alignItems: 'center'}}>
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
    );
}

export default EnterSetsReps;

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