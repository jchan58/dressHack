//edited
import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../assets/images/Logo.png'; 
import CustomInput from '../components/Custom_Input';
import { useNavigation } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import CustomButton from '../components/CustomButton';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const Login = () => {
  //both username and password should be state vars since they will be changing
  //setUsername and setPassword and automatically genereated updater functions
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')




  const onNoAccountPress = () => {
    //direct user to sign up page
    navigation.navigate('SignUp');

  }

  const onForgotPasswordPressed = () => {
   navigation.navigate('ForgotPassword');

  }


  const onSignInFacebook = () => {
    console.warn("Sign in");

  }

  const onSignInGoogle= () => {
    console.warn("Sign in");

  }

  const onSignInApple = () => {
    console.warn("Sign in");

  }


  const navigation = useNavigation();

  const handleLogin = () => {
    //validate user is correct with backend 
    signInWithEmailAndPassword(auth, email, password).then(userCredentials => {
      const user = userCredentials.user;

      //success navigate to analyzer screen
      navigation.navigate('DressHacks', { screen: 'Analyzer' });
    })
      .catch((error) => {
        console.warn(error.message);
      });

}
  const {height} = useWindowDimensions();

 
    return (
      //wrap whole thing in scroll view
      <LinearGradient colors={['#123EA6','#0947DA','#6D2FEC','#71319e']} style={styles.linearGradient}>
      <ScrollView>
      <View style = {styles.root}>
        <Image source = {Logo} 
        style={
          [styles.logo, 
        {height: height * 0.2}]}>
        </Image>
        
        <View style= {styles.containerInput}>
          <View style={styles.textInputContainer}>
            <CustomInput 
              value={email}
              setValue={setEmail}
              placeholder= "Email" 
              secureTextEntry={false}
            />

            <CustomInput 
            placeholder="Password" 
            value={password} 
            setValue={setPassword} 
            secureTextEntry={true}
            />

            <CustomButton
            text = "Sign In"
            onPress = {handleLogin}
            type = "HANDJET"
            />

            <CustomButton
                text="Forgot Password?"
                onPress={onForgotPasswordPressed}
                type= "TERTIARY"
            />

              <CustomButton
                text="Sign In With Facebook"
                onPress={onSignInFacebook}
                bgColor= '#87cefa'
                fgColor= '#4765A9'
                type = "HANDJET"
                
              />

              <CustomButton
                text="Sign In With Google"
                onPress={onSignInGoogle}
                bgColor='#8FF9F1'
                fgColor='#0888AA'
                type = "HANDJET"
              />

              <CustomButton
                text="Sign In With Apple"
                onPress={onSignInApple}
                bgColor='#DAB4FF'
                fgColor='#363636'
                type = "HANDJET"
              />

              <CustomButton
                text="Don't Have an Account? Create One"
                onPress={onNoAccountPress}
                type="TERTIARY"
              />
          </View>
        </View>
      </View>
      </ScrollView>
        </LinearGradient >
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
    width: 500,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: 'Handjet'
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