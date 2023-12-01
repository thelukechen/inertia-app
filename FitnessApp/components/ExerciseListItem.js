import React, { useState, useRef, useEffect } from "react";

import { View, Image, StyleSheet, Text, Animated, TouchableOpacity, Dimensions} from "react-native";


import { userId } from "../screens/Auth";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function ExerciseListItem({name, sets, lowRepRange, highRepRange, backgroundCircleColor, imgSrc, navigation, widthRatio, heightRatio, onPress}) {
    const styles = StyleSheet.create({
        listItemContainer: {
            color: '#1C1C1E',
            backgroundColor: '#1C1C1E',
            borderRadius: 16,
            justifyContent: 'space-between',
            padding: 7 * widthRatio,
            width: 370 * widthRatio,
            marginBottom: 9 * heightRatio,
            left: 1 * widthRatio,
        },
        leftListItem: {
            top: 0,
            left: 0,
            
        },
        imgBackground: {
            width: 87 * widthRatio,
            height: 87 * heightRatio,
        },
        rightListItem: {
            marginLeft: 10 * widthRatio,
            
        },
        textPrimary: {
            color: 'white',
            letterSpacing: -.1,
            left: -1 * widthRatio,
            top: -1 * heightRatio
        },
        textSecondary: {
            color: '#808080',
            fontWeight: "300",
        },
        listItemContainerPressed: {
            color: '#1C1C1E',
            backgroundColor: '#1C1C1E',
            borderRadius: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 7 * heightRatio,
            width: 384 * widthRatio,
            marginBottom: 17.5,
            height: 200 *heightRatio,
        },
        imgContainer: {
            position: 'absolute',
            top: 8 * heightRatio,
            left: 8 * widthRatio,
            width: 70 * widthRatio,
            height: 70 * heightRatio
        },
        back: {
            backfaceVisibility: 'hidden',
            position: 'absolute',
        },
        front: {
            backfaceVisibility: 'hidden',
        }
    });


    const [displayIButton, setDisplayIButton] = useState('none');

    function onPressHandler() {
        console.log("Navigate")
    }


    const height = 101 * heightRatio
    return(
        <View>

        <TouchableOpacity onPress={onPress}>
            <Animated.View style={[styles.listItemContainer, styles.front, {height: height, flexDirection: 'row'}]}>
                <View style={{top: 8 * heightRatio, left: 4 * widthRatio, width: height - (25*heightRatio), height: height - (25*heightRatio), borderRadius: 90, backgroundColor: backgroundCircleColor}}>
                    
                </View>
                <View style={[{justifyContent: 'center', marginBottom: 0, marginRight: 8 * widthRatio, marginLeft: 0}]}>
                    <Text style={[styles.textPrimary, {fontSize: 20 * widthRatio, textAlign: 'right'}]}>{name}</Text>
                    <Text style={[styles.textSecondary, {fontSize: 17 * widthRatio, textAlign: 'right'}]}>{sets} sets {lowRepRange}-{highRepRange} reps</Text>

                </View>
            </Animated.View>

            </TouchableOpacity>
        </View>    
        );
    }

export default ExerciseListItem;

  

/*
        top: 8,
        left: 8,
        width: 70,
        height: 70

        top: 19,
        left: 29,
        width: 185,
        height: 185, 

        width: 237,
        height: 237,

        top: 65,
        left: 70,



        width: 87,
        height: 87,





    textPrimary: {
        color: 'white',
        fontSize: 22,
        textAlign: 'right',
    },
    textSecondary: {
        color: 'white',
        fontSize: 17,
        textAlign: 'right',
        fontWeight: "300",
    },



        rightListItem: {
        marginRight: 8,
        marginBottom: 30,
        
    },



                <Animated.View style={[styles.listItemContainer, styles.back, {height: height, flexDirection: listItemContainerFlexDirection}]}>
                <View style={{top: imgBackGroundTop, left: imgBackGroundLeft}}>
                    <Image source={backgroundSrc} style={{height: imgBackGroundHeight, width: imgBackGroundWidth}}>
                    </Image>
                    <Image source={imgSrc} style={{position: "absolute" , top: imgTop, left: imgLeft, height: imgHeight, width: imgWidth}}></Image>
                </View>

                <View style={[{justifyContent: rightListItemJustify, marginBottom: rightListItemMarginBottom, marginRight: rightListItemMarginRight, marginLeft: rightListItemMarginLeft}]}>
                    <Text style={[styles.textPrimary, {fontSize: textPrimaryFontSize, textAlign: textAlignment}]}>{name}</Text>
                    <Text style={[styles.textSecondary, {fontSize: textSecondaryFontSize, textAlign: textAlignment}]}>{sets} sets {lowRepRange}-{highRepRange} reps</Text>

                </View>
            </Animated.View>
*/