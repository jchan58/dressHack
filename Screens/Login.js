import { View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import Logo from '../assets/images/Logo.png'; 
import CustomInput from '../components/Custom_Input';


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const {height} = useWindowDimensions();
  return (
    <View style = {styles.root}>
      <Image source = {Logo} 
      style={[styles.logo, 
      {height: height * 0.2}]} 
      resizeMethod="contain">
      </Image>

      <View style={styles.textInputContainer}>
        <CustomInput placeholder= "Username" value ={username} setvalue={setUsername} />
        <CustomInput placeholder="Password" value={password} setvalue={setPassword} />
      </View>

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
  logo: {
    width: 400, 
    maxWidth: 500,
    maxHeight: 600
  },
  textInputContainer: {
    marginTop: 20, // Add space between the logo and text inputs
  },
});

export default Login;