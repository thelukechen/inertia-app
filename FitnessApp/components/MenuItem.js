import React from "react";
import { Pressable, View, StyleSheet, Image } from "react-native";

function MenuItem({label, onPress, source}) {
    return( 
        <View style ={styles.pressableContainer}>
            <Pressable onPress={onPress}>
                <Image source={source} style={{width: 30, height: 30 }}></Image>
            </Pressable>
        </View>
    );
}

export default MenuItem;

 
const styles = StyleSheet.create({
    pressableContainer: {
        marginRight: 8,
        marginLeft: 8,
    }
});