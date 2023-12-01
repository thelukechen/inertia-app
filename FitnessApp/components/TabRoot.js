import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import NutritionScreen from "../screens/NutritionScreen";
import ProfileScreen from "../screens/ProfileScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import WorkoutRoot from "./WorkoutRoot";
import EncyclopediaRoot from "./EncyclopediaRoot";
import { Image, View } from "react-native";
import { heightRatio } from "../helper";

const Tab = createBottomTabNavigator();

function TabRoot() {
    const tabHeight = 82*heightRatio
    const iconratio = tabHeight/82
    return(
        <Tab.Navigator 
        screenOptions={{headerShown: false, 
        headerStatusBarHeight: 0, 
        tabBarItemStyle: {marginTop: 0, }, tabBarStyle: {backgroundColor: 'black', borderTopColor: '#242424', height: tabHeight,}} } >
        
            <Tab.Screen
             name="Workout" 
             component={WorkoutRoot} 
             options={{
                tabBarShowLabel: false,
                tabBarIcon: ({focused}) => (
                    <View>
                      <Image style={{height: 24*iconratio, width: 24*iconratio}} source={focused ? require("../assets/navIcons/HomeFilled.png") : require("../assets/navIcons/Home.png")}>

                      </Image>
                    </View>
                )
             }}
             ></Tab.Screen>
            <Tab.Screen 
              name="Statistics" 
              component={StatisticsScreen}
              options={{
                  tabBarShowLabel: false,
                  tabBarIcon: ({focused}) => (
                    <View>
                      <Image style={{height: 24*iconratio, width: 24*iconratio}} source={focused ? require("../assets/navIcons/SocialFilled.png") : require("../assets/navIcons/Social.png")}>

                      </Image>
                    </View>
                )
            }}></Tab.Screen>
            <Tab.Screen 
              name="Encyclopedia" 
              component={EncyclopediaRoot}
              options={{
                tabBarShowLabel: false,
                tabBarIcon: ({focused}) => (
                  <View>
                    <Image style={{height: 24*iconratio, width: 24*iconratio}} source={focused ? require("../assets/navIcons/BookFilled.png") : require("../assets/navIcons/Book.png")}>

                    </Image>
                  </View>
              )
            }}></Tab.Screen>
            <Tab.Screen 
              name="Nutrition" 
              component={NutritionScreen}
              options={{
                  tabBarShowLabel: false,
                  tabBarIcon: ({focused}) => (
                    <View>
                      <Image style={{height: 24*iconratio, width: 24*iconratio}} source={focused ? require("../assets/navIcons/LeafFilled.png") : require("../assets/navIcons/Leaf.png")}>

                      </Image>
                    </View>
                )
            }}></Tab.Screen>
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused}) => (
                      <View>
                        <Image style={{height: 24*iconratio, width: 24*iconratio}} source={focused ? require("../assets/navIcons/ProfileFilled.png") : require("../assets/navIcons/Profile.png")}>
  
                        </Image>
                      </View>
                  )
                 }}
                ></Tab.Screen>
        
        </Tab.Navigator>
    );
}

export default TabRoot;