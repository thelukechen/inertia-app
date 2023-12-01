import { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native"
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const heightRatio = windowHeight/844;
const widthRatio = windowWidth/390;
function EncyclopediaCatalog({route}) {
    const receivedData = route.params ? route.params.data : null;
    const receivedName = route.params ? route.params.name : null;

    const date = new Date();

    const daysOfWeek = [
        "SUNDAY",
        "MONDAY",
        "TUESDAY",
        "WEDNESDAY",
        "THURSDAY",
        "FRIDAY",
        "SATURDAY"    ]

    const months = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC"
    ]

    const colors = [
        "#FFB846",
        "#9FFF91",
        "#77C0FF",
        "#FF89FA",
        "#FF6565"
    ]
        
    const renderItem = ({item, index}) => (

        <View style={[styles.listItemContainer,{height: 101, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 10}]}>
            <View style={[{borderRadius: 180, height: 76, width: 76, top: 12, left: 11,  backgroundColor: colors[index % colors.length], position: 'absolute'}]}>
                
            </View>
            <View style={[{justifyContent: 'center', marginBottom: 0, marginRight: 8, marginLeft: 0, top: 0}]}>
                <Text style={[styles.textPrimary, {fontSize: 20, textAlign: 'right', marginBottom: 0}]}>{item.Name}</Text>
            </View>
        </View>
    )

    return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
            <View style={styles.headerContainer}>
                <View style={styles.leftHeaderContainer}>
                    <View style={{marginBottom: -10, height: 25, left: 12 * widthRatio}}>
                        <Text style={styles.dateText}>{daysOfWeek[date.getDay()]}, {months[date.getMonth()]} {date.getDate()}</Text>
                    </View>

                    <View style={{marginBottom: -3, marginLeft: 10 * widthRatio}}>
                        <Text style={[styles.workoutNameText]}>{receivedName}</Text>
                    </View>

                </View>

            </View>
                <View style={{flex: 3.4, marginLeft: 4}}>
                    <FlatList data={receivedData} renderItem={renderItem} >

                    </FlatList>
                </View>
        </View>

    )
}

export default EncyclopediaCatalog

const styles = StyleSheet.create({
    workoutScreenContainer: {
      flex: 10.08,
      justifyContent: 'center',
      alignItems: 'center',
      width: 390 * widthRatio,
    },
    toolbarMenuContainer: {
      flex: 1,
      position: 'absolute',
      top: 300 * heightRatio,
      backgroundColor: 'black',
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 90,
        width: 384 * widthRatio,
        marginRight: -2 * widthRatio,

    },
    leftHeaderContainer: {
        marginTop: -3 * heightRatio,
        
    },
    rightHeaderContainer: {
        marginTop: -1.75 * heightRatio,
    },
    textContainer: {
        color: 'white',
    },
    workoutContainer: {
        width: 384 * widthRatio,
        marginLeft: 1.4 * widthRatio,
        alignItems: 'center',
        marginBottom: 30
    },
    dateText: {
        color: '#7F7E84',
        fontSize: 16 * widthRatio,
        letterSpacing: 0,
    },
    workoutNameText: {
        color: 'white',
        fontSize: 60.5 * widthRatio,
        fontWeight: 'bold',
        marginTop: 2 * heightRatio,
        letterSpacing: .1
    },
    durationText: {
        color: 'white',
        fontSize: 26 * widthRatio,
        fontWeight: '200',
        marginTop: 0,
        left: 13 * widthRatio

    },
    exerciseCountText: {
        color: 'white',
        fontSize: 26 * widthRatio,
        textAlign: 'right',
        left: -9 * widthRatio,
        top: 1 * heightRatio,
        letterSpacing: 0.03 
    },
    setCountText: {
        color: 'white',
        fontSize: 26 * widthRatio,
        textAlign: 'right',
        marginTop: 2 * heightRatio,
        left: -10 * widthRatio
    },
    workoutSummaryContainer: {
        backgroundColor: '#1C1C1E',
        height: 600 * heightRatio,
        top: -20 * heightRatio,
        width: 385 * widthRatio,
        borderRadius: 15,
        paddingVertical: 20 * heightRatio,
        paddingHorizontal: 35 * widthRatio,
    },
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
        top: 65
    },
    listItemContainer: {
        color: '#1C1C1E',
        backgroundColor: '#1C1C1E',
        borderRadius: 16,
        padding: 7,
        width: 370*widthRatio,
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

