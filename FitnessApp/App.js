import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoot from './components/TabRoot';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Auth from './screens/Auth';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar style='light'>
        </StatusBar>
        <Stack.Navigator screenOptions={{headerShown:false, animation: 'slide_from_left', gestureEnabled: false}}>
          <Stack.Screen name="Auth" component={Auth}></Stack.Screen>
          <Stack.Screen name = "TabRoot" component={TabRoot}></Stack.Screen> 
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    backgroundColor: '#000000',
  },
  placeholderContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbarMenuContainer: {
    flex: 1,
  },
});
/*
        <Stack.Screen name='Setup' component={Setup}></Stack.Screen>




                <Stack.Screen name="Auth" component={Auth}></Stack.Screen>
        <Stack.Screen name='Setup' component={Setup}></Stack.Screen>
*/