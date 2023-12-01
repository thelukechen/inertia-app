import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, Image, Pre, Pressable} from "react-native";
import { userId } from "../Auth";
function DaysSetup({index}) {


    const [monPressed, setMonPressed] = useState(false);
    const [tuePressed, setTuePressed] = useState(false);
    const [wedPressed, setWedPressed] = useState(false);
    const [thuPressed, setThuPressed] = useState(false);
    const [friPressed, setFriPressed] = useState(false);
    const [satPressed, setSatPressed] = useState(false);
    const [sunPressed, setSunPressed] = useState(false);


    function monPressedHandler() {
        setMonPressed(!monPressed);
    }
    function tuePressedHandler() {
        setTuePressed(!tuePressed);
    }
    function wedPressedHandler() {
        setWedPressed(!wedPressed);
    }
    function thuPressedHandler() {
        setThuPressed(!thuPressed);
    }
    function friPressedHandler() {
        setFriPressed(!friPressed);
    }
    function satPressedHandler() {
        setSatPressed(!satPressed);
    }
    function sunPressedHandler() {
        setSunPressed(!sunPressed);
    }


    function booleanToInt(bool) {
        return bool ? "1" : "0"
    }


    const [daysSplit, setDaysSplit] = useState("0000000");

    useEffect(() => {
        let days = "";
        days += booleanToInt(monPressed);
        days += booleanToInt(tuePressed);
        days += booleanToInt(wedPressed);
        days += booleanToInt(thuPressed);
        days += booleanToInt(friPressed);
        days += booleanToInt(satPressed);
        days += booleanToInt(sunPressed);
        console.log(days);
        setDaysSplit(days)
    })
    

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    return(
        <View style={styles.screenContainer}>
            <View>
                <Text style={{color: 'white', fontSize: 47, fontWeight: 'bold', left: 2, position: 'absolute', top: -176, left: -140, }}>
                    Which Days?
                </Text>
                <View style={{flexDirection: 'row', top: -44, }}>
                    <Pressable onPress={monPressedHandler}>
                        <View style={{height: 44, width: 62, borderRadius: 50, backgroundColor: monPressed ? '#75e18a' : '#1c1c1e', left: -176, top: -22, alignItems: 'center', justifyContent: 'center',  position: 'absolute'}}>
                            <Text style={{color: 'white', fontSize: 16}}>
                                Mon
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={tuePressedHandler}>
                        <View style={{height: 44, width: 62, borderRadius: 50, backgroundColor: tuePressed ? '#75e18a' : '#1c1c1e', left: -103, top: -22, alignItems: 'center', justifyContent: 'center',  position: 'absolute'}}>
                            <Text style={{color: 'white', fontSize: 16}}>
                                Tue
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={wedPressedHandler}>
                        <View style={{height: 44, width: 62, borderRadius: 50, backgroundColor: wedPressed ? '#75e18a' : '#1c1c1e', left: -30, top: -22, alignItems: 'center', justifyContent: 'center',  position: 'absolute'}}>
                            <Text style={{color: 'white', fontSize: 16}}>
                                Wed
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={thuPressedHandler}>
                        <View style={{height: 44, width: 62, borderRadius: 50, backgroundColor: thuPressed ? '#75e18a' : '#1c1c1e', left: 43, top: -22, alignItems: 'center', justifyContent: 'center',  position: 'absolute'}}>
                            <Text style={{color: 'white', fontSize: 16}}>
                                Thu
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={friPressedHandler}>
                        <View style={{height: 44, width: 62, borderRadius: 50, backgroundColor: friPressed ? '#75e18a' : '#1c1c1e', left: 115.2, top: -22, alignItems: 'center', justifyContent: 'center' , position: 'absolute'}}>
                            <Text style={{color: 'white', fontSize: 16}}>
                                Fri
                            </Text>
                        </View>
                    </Pressable>
                </View>
                <View>
                    <Pressable onPress={satPressedHandler}>
                        <View style={{height: 44, width: 62, borderRadius: 50, backgroundColor: satPressed ? '#75e18a' : '#1c1c1e', left: -67, top: -12, alignItems: 'center', justifyContent: 'center',  position: 'absolute'}}>
                            <Text style={{color: 'white', fontSize: 16}}>
                                Sat
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={sunPressedHandler}>
                        <View style={{height: 44, width: 62, borderRadius: 50, backgroundColor: sunPressed ? '#75e18a' : '#1c1c1e', left:6.5, top: -12, alignItems: 'center', justifyContent: 'center',  position: 'absolute'}}>
                            <Text style={{color: 'white', fontSize: 16}}>
                                Sun
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default DaysSetup;
const styles = StyleSheet.create({

    screenContainer: {
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});