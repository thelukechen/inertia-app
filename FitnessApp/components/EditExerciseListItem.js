import { forwardRef } from "react";

import { View, Image, StyleSheet, Text} from "react-native";

const EditExerciseListItem = (props, ref) => {
    const styles = StyleSheet.create({
        listItemContainer: {
            color: '#1C1C1E',
            backgroundColor: '#1C1C1E',
            borderRadius: 16,
            padding: 7,
            width: 370*props.widthRatio,
            left: 1,
        },
        textPrimary: {
            color: 'white',
            letterSpacing: -.1,
        },
        textSecondary: {
            color: '#808080',
            fontWeight: "300",
        },
    });


    return(
        <View style={[styles.listItemContainer, styles.front,{height: 101, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}]}>
            <View style={[{borderRadius: 180, height: 76, width: 76, top: 12, left: 11,  backgroundColor: props.backgroundCircleColor, position: 'absolute'}]}>
                
            </View>
            <View style={[{justifyContent: 'center', marginBottom: 0, marginRight: 8, marginLeft: 0, top: 0}]}>
                <Text style={[styles.textPrimary, {fontSize: 20, textAlign: 'right', marginBottom: 0}]}>{props.name}</Text>
                <Text style={[styles.textSecondary, {fontSize: 17, textAlign: 'right'}]}>{props.sets} sets {props.lowRepRange}-{props.highRepRange} reps</Text>

            </View>
        </View>
        );
    }

export default forwardRef(EditExerciseListItem);

  

/*

            <Image source={props.imgSrc} style={[{position: "absolute" , top: 25, left: 24, height: 50, width: 50}]}></Image>


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


            {itemId, name, sets, lowRepRange, highRepRange, backgroundCircleColor, imgSrc, navigation, props.widthRatio, props.heightRatio, deleteId, ref}
*/