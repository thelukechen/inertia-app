import { View, StyleSheet, TouchableOpacity } from "react-native";

function NutritionScreen({navigation}) {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={[styles.listItemContainer,{justifyContent: 'center', alignItems: 'center', height: 420}]}>
          <TouchableOpacity style={[{ left: -6, flexDirection: 'column' ,justifyContent: 'space-between', top: 40, alignItems: 'center'}]}>
          </TouchableOpacity>
      </View>
    </View>
  );
}

export default NutritionScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000',
    },
    placeholderContainer: {
      flex: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    toolbarMenuContainer: {
      flex: 1,
    },
    listItemContainer: {
      color: '#1C1C1E',
      backgroundColor: '#1C1C1E',
      borderRadius: 16,
      justifyContent: 'space-between',
      width: 370,
      marginBottom: 9,
  },
  });
  