import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EncyclopediaScreen from "../screens/EncyclopediaScreen";
import EncyclopediaCatalog from "./EncyclopediaCatalog";

const EncyclopediaStack = createNativeStackNavigator();

const EncyclopediaRoot = () => {
    return (
            <EncyclopediaStack.Navigator screenOptions={{headerShown: false}}>
                <EncyclopediaStack.Screen name={"EncyclopediaScreen"} component={EncyclopediaScreen}></EncyclopediaStack.Screen>
                <EncyclopediaStack.Screen name={"EncyclopediaCatalog"} component={EncyclopediaCatalog}></EncyclopediaStack.Screen>
            </EncyclopediaStack.Navigator>
    );
}

export default EncyclopediaRoot;