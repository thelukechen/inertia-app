import { Image, StyleSheet, View , Text} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

function ReadySetup({swipeLeft}) {



    return(
        <GestureRecognizer onSwipeLeft={swipeLeft} style={{flex: 1, backgroundColor: 'black'}}>
        <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <Text style={styles.readyText}>{"Ready"}</Text>
            <Image source={require('../../assets/SetupIcons/arrows_ready.png')} style={{height: 75, width: 75, top: -32}}></Image>
        </View>
        </GestureRecognizer>

    );
}

export default ReadySetup;

const styles = StyleSheet.create({
    readyText: {
        color: 'white',
        fontSize: 70,
        fontWeight: '600',
        top: -40
    }
});