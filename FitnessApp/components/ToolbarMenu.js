
import MenuItem from "./MenuItem";
import { View, StyleSheet} from "react-native";

function ToolbarMenu({wPress, pPress, ePress, sPress, nPress, selected}) {



    return(
        <View style={styles.menuContainer}>
            <View style={styles.menuItemContainer}>
                <MenuItem onPress={wPress} source={require('../assets/Green.png')}></MenuItem>
            </View>
            <View style={styles.menuItemContainer}>
                <MenuItem onPress={pPress} source={require('../assets/Green.png')}></MenuItem>
            </View>
            <View style={styles.menuItemContainer}>
                <MenuItem onPress={ePress} source={require('../assets/Green.png')}></MenuItem>
            </View>
            <View style={styles.menuItemContainer}>
                <MenuItem onPress={sPress} source={require('../assets/Green.png')}></MenuItem>
            </View>
            <View style={styles.menuItemContainer}>
                <MenuItem onPress={nPress} source={require('../assets/Green.png')}></MenuItem>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',
        color: 'black',
        borderTopWidth: .36,
        borderTopColor: '#242424',
        justifyContent: 'space-evenly',
    },
    menuItemContainer: {

        marginTop: 12,
        marginBottom: 30,
    },
});
