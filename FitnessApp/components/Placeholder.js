import { View, StyleSheet, Text } from "react-native";

function Placeholder({customText}) {
    return (
        <View style={styles.container}>
            <Text style={styles.placeholderText}>{customText}</Text>
        </View>
    );
}

export default Placeholder;

const styles = StyleSheet.create({
    container: {
        color: 'black',
    },
    placeholderText: {
        color: 'white'
    }
})