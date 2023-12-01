import { View, StyleSheet, Text, Pressable, Image, TextInput, Dimensions } from "react-native";
import EncyclopediaCircle from "../components/EncyclopediaCircle";
import * as React from 'react';
import { exercises } from "../exercises";
const { width, height } = Dimensions.get('window');

const EncyclopediaScreen = ({navigation}) => {

  const handleSearch = () => {
    console.log('Search button pressed');
  };

  const categoryPressedHandler = (categoryName) => {
    if (categoryName == 'Chest') {
      navigation.navigate("EncyclopediaCatalog", {data: exercises.chest, name: "Chest"});
    } else if (categoryName == 'Back') {
      navigation.navigate("EncyclopediaCatalog", {data: exercises.back, name: "Back"});
    } else if (categoryName == 'Shoulders') {
      navigation.navigate("EncyclopediaCatalog", {data: exercises.shoulder, name: "Shoulders"});
    } else if (categoryName == 'Arms') {
      navigation.navigate("EncyclopediaCatalog", {data: exercises.arms, name: "Arms"});
    } else if (categoryName == 'Legs') {
      navigation.navigate("EncyclopediaCatalog", {data: exercises.legs, name: "Legs"});
    } else if (categoryName == 'Core') {
      navigation.navigate("EncyclopediaCatalog", {data: exercises.core, name: "Core"});
    }
  };
  

  return (
      <View style={styles.container}>
        
        <View style={{top: 450}}>
          <View style={{alignItems: 'center'}}>
          <Text style={[styles.buttonText, {top: -300, right: 0 ,fontSize: 36}]}>Encyclopedia</Text>
          <View style={styles.imageContainer}>
          </View>
          </View>
          <View style={styles.contain}>
            <TextInput placeholder="Search" style={[styles.searchButton, {top: -82, left: 150, fontSize: 16, width: 99,height: 37}]} onPress={handleSearch}>
            <Text style={[styles.searchButtonText]}>Search</Text>
            </TextInput>
            <EncyclopediaCircle positionX={85} positionY={-216} color={'#f78481'} onPress={() => categoryPressedHandler('Chest')} />
            <EncyclopediaCircle positionX={198} positionY={-216} color={'#9ff590'} onPress={() => categoryPressedHandler('Back')} />
            <EncyclopediaCircle positionX={23} positionY={-110} color={'#f4f78e'} onPress={() => categoryPressedHandler('Shoulders')} />
            <EncyclopediaCircle positionX={260} positionY={-110} color={'#f28568'} onPress={() => categoryPressedHandler('Arms')} />
            <EncyclopediaCircle positionX={85} positionY={-5} color={'#7ea3f9'} onPress={() => categoryPressedHandler('Legs')} />
            <EncyclopediaCircle positionX={198} positionY={-5} color={'#f88bd7'} onPress={() => categoryPressedHandler('Core')} />
          </View>
        </View>
      </View>
  );
}


export default EncyclopediaScreen;


const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: 'black',
},
imageContainer: {
alignSelf: 'center',
justifyContent: 'center'
},
contain: {
flex: 1,
},
placeholderContainer: {
flex: 8,
justifyContent: 'center',
alignItems: 'center',
},
toolbarMenuContainer: {
flex: 1,
},
buttonContainer: {
position: 'absolute',
width: 135,
height: 38,
top: 700,
alignItems: 'center',
justifyContent: 'center',
borderRadius:18,
backgroundColor: '#78E28A'
},
buttonText: {
color: 'white',
textAlign: 'center',
},
image: {
alignSelf: 'center',
justifyContent: 'center'
},
row: {
flexDirection: 'row',
},
circle: {
width: 100,
height: 100,
borderRadius: 50,
borderWidth: 4,
justifyContent: 'center',
alignItems: 'center',
marginHorizontal: -60,
marginLeft: 78,
},
innerCircle: {
width: 80,
height: 80,
borderRadius: 40,
},
searchButton: {
backgroundColor: '#404040',
borderRadius: 25,
textAlign: 'center'
},
searchButtonText: {
color: 'white',
},
});