import { View, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions} from "react-native";
import { useNavigation } from "@react-navigation/native";

import * as React from 'react';


const { width, height } = Dimensions.get('window');
const screenWidth = Dimensions.get('window').width;
const marginR = screenWidth /5;
const marginL = screenWidth /17;
const marginLe = screenWidth /40;
function Information({route}) {
  const navigation = useNavigation();
  const bodyPart = route.params.bodyPart;



    const goBack = () => {
      navigation.goBack();
    };


    const handleButtonPress = (number) => {
      console.log(`Button ${number} pressed`);
    };


    const handleSearch = () => {
      console.log('Search button pressed');
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={goBack} style={[styles.backButton, {width: 70*Math.min(width/375, height/812),height: 70*Math.min(width/375, height/812), left: (width*-135)/375, top: (height*-68)/812}]}/>
            <Text style={[styles.header, { left: (width*-40.9)/375, top: (height*-121)/812 }, {fontSize: 32.5*Math.min(width/375, height/812)}]}>{bodyPart}</Text>
            <View style={[{zIndex: 1, left: 7}]}>
              <View style={[styles.row, {marginRight: marginR}, {marginLeft: marginLe}]}>
                <TouchableOpacity style={[styles.button, { left: (width*39)/375, top: (height*-45)/812, width: 165*Math.min(width/375, height/812),height: 78*Math.min(width/375, height/812)}]} onPress={() => handleButtonPress(1)}>
                  <Text style={[styles.buttonText, {fontSize: 20*Math.min(width/375, height/812)}]}>Barbell</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { left: (width*59)/375, top: (height*-45)/812, width: 165*Math.min(width/375, height/812),height: 78*Math.min(width/375, height/812) }]} onPress={() => handleButtonPress(2)}>
                  <Text style={[styles.buttonText, {fontSize: 20*Math.min(width/375, height/812)}]}>Dumbbell</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.row, {marginLeft: marginLe}]}>
                <TouchableOpacity style={[styles.button, { left: (width*38)/375, top: (height*-26)/812, width: 165*Math.min(width/375, height/812),height: 78*Math.min(width/375, height/812) }]} onPress={() => handleButtonPress(3)}>
                  <Text style={[styles.buttonText, {fontSize: 20*Math.min(width/375, height/81)}]}>Machine</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { left: (width*58)/375, top: (height*-26)/812, width: 165*Math.min(width/375, height/812),height: 78*Math.min(width/375, height/812) }]} onPress={() => handleButtonPress(4)}>
                  <Text style={[styles.buttonText, {fontSize: 20*Math.min(width/375, height/812)}]}>Cable</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.row, {marginLeft: marginLe}]}>
                <TouchableOpacity style={[styles.button, { left: (width*38)/375, top: (height*-7)/812, width: 165*Math.min(width/375, height/812),height: 78*Math.min(width/375, height/812) }]} onPress={() => handleButtonPress(5)}>
                  <Text style={[styles.buttonText, {fontSize: 20*Math.min(width/375, height/812)}]}>Bodyweight</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { left: (width*58)/375, top: (height*-7)/812, width: 165*Math.min(width/375, height/812),height: 78*Math.min(width/375, height/812) }]} onPress={() => handleButtonPress(6)}>
                  <Text style={[styles.buttonText, {fontSize: 20*Math.min(width/375, height/812)}]}>Stretches</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.row, {marginLeft: marginLe}]}>
                <TouchableOpacity style={[styles.button, { left: (width*38)/375, top: (height*11)/812, width: 165*Math.min(width/375, height/812),height: 78*Math.min(width/375, height/812) }]} onPress={() => handleButtonPress(7)}>
                  <Text style={[styles.buttonText, {fontSize: 20*Math.min(width/375, height/812)}]}>Recovery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { left: (width*58)/375, top: (height*11)/812, width: 165*Math.min(width/375, height/812),height: 78*Math.min(width/375, height/812) }]} onPress={() => handleButtonPress(8)}>
                  <Text style={[styles.buttonText, {fontSize: 20*Math.min(width/375, height/812)}]}>Personal</Text>
                </TouchableOpacity>
                <View style={[styles.marginLe, {right: 23}]}>
                <TextInput placeholder="Search" style={[styles.searchButton, { right: (width*165)/375, top: (height*152)/812 }, {fontSize: 16.5*Math.min(width/375, height/812), width: 95*Math.min(width/375, height/812),height: 33*Math.min(width/375, height/812)}]} onPress={handleSearch}>        
                <Text style={styles.searchButtonText}>Search</Text>
                </TextInput>
                </View>
            </View>
          </View>
      </View>
    )
  }


export default Information;


const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      },
      marginLe: {
        marginLeft: marginL,
      },
      backButton: {
        borderRadius: 40,
        backgroundColor: '#505050',
      },
      searchButton: {
        width: 95,
        height: 33,
        backgroundColor: '#404040',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
      },
      searchButtonText: {
        color: 'white',
        textAlign: 'center'
      },
      header: {
        fontWeight: 'bold',
        color: 'white',
      },
      errorText: {
        fontSize: 18,
        color: 'red',
      },
      row: {
        flexDirection: 'row',
      },
      button: {
        backgroundColor: '#303030',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
      },
      buttonText: {
        color: 'white',
      },
});