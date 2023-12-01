import {View, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import GoalSetup from "./SetupComponents/GoalSetup";
import ExperienceSetup from "./SetupComponents/ExperienceSetup";
import {useState, useRef } from "react";
import DaysSetup from "./SetupComponents/DaysSetup";
import YouSetup from "./SetupComponents/YouSetup";
import ReadySetup from "./SetupComponents/ReadySetup";
import { userId } from "./Auth";

function Setup({navigation}) {
    const id = userId;


    const swiperRef = useRef(null);

    const scrollByIndex = (index) => {
      if (swiperRef && swiperRef.current) {
        swiperRef.current.scrollBy(index, true);
      }
    };

    function readySwipe() {
        navigation.navigate("TabRoot");
        console.log("Swiped");
        
    }
    

    const [currIndex, setCurrIndex] = useState(0);

    return (
        <View style={{ flex: 1}}>
            <Swiper loop={false} ref={swiperRef}  index={0} dot={<View style={{ backgroundColor: '#ABA6AC', width: 8, height: 8, borderRadius: 4, marginLeft: 2, marginRight: 2, marginTop: 3, marginBottom: 35, top: -5 }} />}
            activeDot={<View style={{ backgroundColor: '#FBFFFF', width: 8, height: 8, borderRadius: 4, marginLeft: 2, marginRight: 2, marginTop: 3, marginBottom: 35, top: -5 }}/>} onIndexChanged={index => setCurrIndex(index)}>
                <GoalSetup onPressDown={() => scrollByIndex(1)}></GoalSetup>
                <ExperienceSetup onPressDown={() =>scrollByIndex(1)}/>
                <DaysSetup index={currIndex}></DaysSetup>
                <YouSetup index={currIndex}></YouSetup>
                <ReadySetup swipeLeft={readySwipe}></ReadySetup>
            </Swiper>
        </View>
    );
}

export default Setup;


const styles = StyleSheet.create({
    container: {backgroundColor: 'black', flex: 1, alignItems: 'center', justifyContent: 'center'},
    headerText: {
        color: 'white',
        fontSize: 55,
        fontWeight: '600',
        top: -180
    }
});