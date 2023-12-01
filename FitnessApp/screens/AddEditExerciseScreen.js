import { useEffect, useState } from "react";
import { useRef } from "react";
import { FlatList, Modal } from "react-native";
import { ScrollView, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet, Image} from "react-native";
import { SearchBar } from "react-native-elements";
import Animated, { useAnimatedStyle, useSharedValue, withDecay, withTiming } from "react-native-reanimated";
import { allExercises } from "../exercises";
function AddEditExerciseScreen({route, navigation}) {

    const exercise = route.params ? route.params.exercise : null;
    const onDataReceived = route.params ? route.params.onDataReceived : null;

    const [exerciseName, setExerciseName] = useState(exercise.name)
    const [lowRepRange, setLowRepRange] = useState(exercise.lowRepRange)
    const [highRepRange, setHighRepRange] = useState(exercise.highRepRange)
    const [exerciseId, setExerciseId] = useState(exercise.id)
    const [color, setColor] = useState(exercise.color)
    const [listdata, setListData] = useState(exercise.setList);
    const [image, setImage] = useState(exercise.imgSrc)


    function deleteSetItemData(key) {
        setListData((listdata) => {
            return listdata.filter((item) => item.Id != key)
        })
        setSetCount(setCount - 1)
    }

    function updateSetItemData(key, reps, weight, rpe) {
        const index = listdata.findIndex((item) => item.Id == key);
        let newSetListData = listdata
        newSetListData[index].Reps = reps
        newSetListData[index].Weight = weight
        newSetListData[index].Rpe = rpe
        updateRepRange(newSetListData)
        setListData(newSetListData)
    }

    function addSetItemData() {
        setListData((listdata) => {
            return listdata.concat({"Id": Date.now(), "Reps": null, "Weight": null, "Rpe": null})
        })
        setSetCount(setCount +1)
    }

    function updateRepRange(newData) {
        let min = 1000000
        let max = -10000000
        for (let i = 0; i < newData.length; i++) {
            if (newData[i].Reps < min) {
                min = newData[i].Reps 
            }
            if (newData[i].Reps > max) {
                max = newData[i].Reps 
            }
        }
        console.log("Min value for reps: " + min)
        console.log("Max value for reps: " + max)

    }

    function goBackHandler() {
        const newExercise = {
            "color": color,
            "del": false,
            "highRepRange": highRepRange,
            "id": exerciseId,
            "imgSrc": image,
            "lowRepRange": lowRepRange,
            "name": exerciseName,
            "setList": listdata,
        }

        navigation.goBack();
        onDataReceived(newExercise)

    }

    const SetListItem = (props) => {
        const itemHeight = useSharedValue(60);
        const itemMargin = useSharedValue(8);

        const [reps, setReps] = useState(props.item.Reps);
        const [weight, setWeight] = useState(props.item.Weight)
        const [rpe, setRpe] = useState(props.item.Rpe)

        const repRef = useRef(null);
        const weightRef = useRef(null);
        const rpeRef = useRef(null);


        const handleRepsChange = (inputText) => {
            inputText = inputText.replace(/[^0-9]/g, '');
            setReps((inputText));
        }

        const handleWeightChange = (inputText) => {
            inputText = inputText.replace(/[^0-9]/g, '');
            setWeight((inputText));
        }

        const handleRpeChange = (inputText) => {
            inputText = inputText.replace(/[^0-9]/g, '');
            setRpe((inputText));
        }
        useEffect(() => {
            updateSetItemData(props.item.Id, reps, weight, rpe);
        }, [reps, weight, rpe])
        const animateItemStyle = useAnimatedStyle(() => {
            return {
                height: itemHeight.value,
                marginBottom: itemMargin.value
            }
        })

        const [deleteVisible, setDeleteVisible] = useState('flex')
        function deleteSetItem() {
            itemHeight.value = withTiming(0);
            itemMargin.value = withTiming(0);
            setDeleteVisible('none')
            setTimeout(() => {
                deleteSetItemData(props.item.Id)
            }, 300)
        }
        

        return (
            <View>
                <Animated.View style={[{flexDirection: 'row'}, animateItemStyle]}>
                    
                    <View style={{width: 68, left: 10, top: 20}} >
                        <Text style={styles.dataText}>{props.children[1] + 1}</Text>
                    </View>
                    <TouchableOpacity onPress={() => repRef.current.focus()} style={{ width: 60, left: -8, top: 6, marginRight: 16, backgroundColor: '#1C1C1E', borderRadius: 14, alignItems: 'center', justifyContent: 'center'}}>
                        <TextInput value={reps} onChangeText={handleRepsChange} focusable={false} keyboardAppearance="dark" keyboardType="number-pad" ref={repRef} style={[styles.dataText, {textAlign: 'right'}]}></TextInput>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => weightRef.current.focus()} style={{width: 90, left: -8, top: 6, marginRight: 16, backgroundColor: '#1C1C1E', borderRadius: 14, alignItems: 'center', justifyContent: 'center'}}>
                        <TextInput value={weight} onChangeText={handleWeightChange} focusable={false} keyboardAppearance="dark" keyboardType="number-pad" ref={weightRef} style={styles.dataText}></TextInput>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => rpeRef.current.focus()} style={{width: 60, left: -8, top: 6, marginRight: 0, backgroundColor: '#1C1C1E', borderRadius: 14, alignItems: 'center', justifyContent: 'center'}}>
                        <TextInput value={rpe} onChangeText={handleRpeChange} focusable={false} keyboardAppearance="dark" keyboardType="number-pad" ref={rpeRef} style={styles.dataText}></TextInput>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: 60, top: 6, alignItems: 'center', justifyContent: 'center', display: deleteVisible}} onPress={deleteSetItem}>
                        <View style={{height: 24, width: 3.2, position: 'absolute', backgroundColor: '#FF7171', transform: [{rotate: '45deg'}]}}>

                        </View>
                        <View style={{height: 24, width: 3.2, position: 'absolute', backgroundColor: '#FF7171', transform: [{rotate: '315deg'}]}}>

                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        )
    };


    const [minRepRange, setMinRepRange] = useState(6);
    const [maxRepRange, setMaxRepRange] = useState(8);

    const [modalZIndex, setModalZIndex] = useState(0)

    const [setCount, setSetCount] = useState(exercise.setList.length)


    const modalOpacityAnimated = useSharedValue(0)
    const modalAnimated = useAnimatedStyle(() => {
        return {
            opacity: modalOpacityAnimated.value
        }
    })

    function startSearchBar() {
        setModalZIndex(1)
        modalOpacityAnimated.value = withTiming(1)
        setSearchText("")
    }

    function closeSearchBar() {
        modalOpacityAnimated.value = withTiming(0)
        setSearchText("")
        setFilteredExercises([])
        setTimeout(() => {
            setModalZIndex(0)
        }, 500);
    }
    const [filteredExercises, setFilteredExercises] = useState([]);
    function searchChanged(newText) {
        setSearchText(newText)
        setFilteredExercises(filterExercises(newText))
    }

    function filterExercises(query) {
        return allExercises.filter(exercise => exercise.Name.toLowerCase().includes(query.toLowerCase()));
    }

    function searchItemPressedHandler(item) {
        setExerciseName(item.Name)
        setExerciseId(item.EID)
        closeSearchBar();
    }
    
    const [searchText, setSearchText] = useState("")
    return (
        <View style={{flex: 1, backgroundColor: 'black', alignItems: 'center'}}>
            <View style={{top: 90, marginLeft: 27}}>
                <Animated.View style={[{height: 585, top: 70, width: 390, backgroundColor: 'black', position: 'absolute', zIndex: modalZIndex}, modalAnimated]}>
                    <ScrollView style={{left: 0}}>
                        {filteredExercises.map((item, idx) => (
                        <View key={idx} style={{borderTopColor: '#242424', borderTopWidth: .5, paddingVertical: 5}}>
                            <TouchableOpacity onPress={() => searchItemPressedHandler(item)}>
                                <Text style={{color: 'white', fontSize: 19}}>{item.Name}</Text>
                                <Text style={{color: 'grey', fontSize: 13}}>{item.MuscleGroup}</Text>
                            </TouchableOpacity>
                        </View>   
                        ))}
                    </ScrollView>
                </Animated.View>
                <SearchBar onEndEditing={() => {console.log("Done editing")}} onChangeText={searchChanged} style={{color: 'white'}} textAlign="left" keyboardAppearance="dark" platform="ios" onFocus={startSearchBar} onCancel={closeSearchBar}  containerStyle={{backgroundColor: 'black ', height: 50, borderRadius: 80, marginBottom: 20, width: 390, left: -12}} inputContainerStyle={{backgroundColor: '#1C1C1E'}} placeholder="Search Exercise">
                    {searchText}
                </SearchBar>
                <Text style={{color: '#7F7E84', fontSize: 18, letterSpacing:-1, marginBottom: 12}}>MONDAY, DEC 12</Text>
                <ScrollView>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: 'white', fontSize: 32, marginBottom: 12}}>{exerciseName}</Text>
                        <View style={{height: 67, width: 67, position: 'absolute', top: 0, left: 295, borderRadius: 90, backgroundColor: color,}}>
                        </View>
                    </View>
                    <Text style={{color: "#7F7E84", fontSize: 17, letterSpacing: .5, marginBottom: 28}}>{setCount} Sets {lowRepRange}-{highRepRange} Reps 7 RPE</Text>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: 68}}>
                            <Text style={styles.categoryText}>Set</Text>
                        </View>
                        <View style={{width: 84}}>
                            <Text style={styles.categoryText}>Reps</Text>
                        </View>
                        <View style={{width: 102}}>
                            <Text style={styles.categoryText}>Weight</Text>
                        </View>
                        <View style={{width: 72}}>
                            <Text style={styles.categoryText}>RPE</Text>
                        </View>
                    </View>
                    <View style={{flex: .77}}>
                        {listdata.map((data, index) => (
                            <SetListItem key={data.Id} item={data}>idx={index} </SetListItem>
                        ))}
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', top: 10}}>
                        <TouchableOpacity style={{width: 130, height: 38, borderRadius: 30, backgroundColor: '#87DBFF', left: -40, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'white', fontSize: 20}}>Superset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={addSetItemData} style={{width: 130, height: 38, borderRadius: 30, backgroundColor: '#ABABAB', left: 15, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'white', fontSize: 20}}>Add Set</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <TouchableOpacity style={{alignItems: 'center', position: 'absolute', left: 117, top: 520}} onPress={goBackHandler}>
                        <View style={{width: 160, height: 44, borderRadius: 30, left: -17, backgroundColor: '#75E18A', justifyContent: 'center', alignItems: 'center', top: 83}}>
                            <Text style={{color: 'white', fontSize: 26}}>Done</Text>
                        </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}




export default AddEditExerciseScreen;

const styles = StyleSheet.create({
    categoryText: {
        color: 'white',
        fontSize: 20,
    },
    dataText: {
        color: 'white',
        fontSize: 24,
    },
})