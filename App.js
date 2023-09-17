import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './Screens/Login';
import SignUpScreen from './Screens/SignUpScreen';
import ForgotPassword from './Screens/ForgotPassword';
import ResetPassword from './Screens/ResetPassword';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Screens/Profile';
import Analyzer from './Screens/Analyzer';
import Post from './Screens/Post';
import Model from './Screens/Model';
import ViewPosts from './Screens/ViewPosts';
import { Ionicons } from '@expo/vector-icons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); 

function MainTabs(){
  return (
    <Tab.Navigator initialRouteName="Profile">
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarLabel: 'Profile', headerShown: false, 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),  
        }}
      />
      <Tab.Screen 
        name="Camera" 
        component={Analyzer}
        options={{
          tabBarLabel: 'Camera', headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Post" 
        component={Post}
        options={{
          tabBarLabel: 'Post', headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#00008b' }}} >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="DressHacks" component={MainTabs} />
        <Stack.Screen name="ViewPosts" component={ViewPosts} />
        <Stack.Screen name="Model" component={Model} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
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