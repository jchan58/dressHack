import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import Logo from '../assets/images/Logo.png'; 
import CustomInput from '../components/Custom_Input';
import { useNavigation } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate('DressHacks', { screen: 'Analyzer' });
}
  const {height} = useWindowDimensions();
  return (
    <View style = {styles.root}>
      <LinearGradient colors = {['#000000', '#2c106e', '#71319e']} style = {styles.linearGradient}>
      <Image source = {Logo} 
      style={[styles.logo, 
      {height: height * 0.2}]}>
      </Image>
      
      <View style= {styles.containerInput}>
        <View style={styles.textInputContainer}>
          <CustomInput placeholder= "Username" value ={username} setvalue={setUsername} />
          <CustomInput placeholder="Password" value={password} setvalue={setPassword} />
        </View>
     
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>
    </View>
  )
}



const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center', 
    paddingTop: 75,
  },
  button: {
    backgroundColor: "#122F8E",
    padding: 10,
    borderRadius: 5,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  logo: {
    width: 400, 
    maxWidth: 500,
    maxHeight: 600
  },
  textInputContainer: {
    marginTop: 20, // Add space between the logo and text inputs
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  containerInput: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default Login;