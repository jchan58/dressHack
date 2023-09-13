import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Screens/Login';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './Screens/Profile';
import Analyzer from './Screens/Analyzer';
import Post from './Screens/Post';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#00008b' }}} >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Camera" component={Analyzer} />
        <Stack.Screen name="Feed" component={Post} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //change entire background of app here (changed to gray for now)
    backgroundColor: '#00008b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});