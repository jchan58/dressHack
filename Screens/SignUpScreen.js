import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Logo from '../assets/images/Logo.png';
import CustomInput from '../components/Custom_Input';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../components/CustomButton';
import { auth } from '../firebase';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import {createUserWithEmailAndPassword } from 'firebase/auth';


const SignUpScreen= () => {

    const navigation = useNavigation();
    //both username and password should be state vars since they will be changing
    //setUsername and setPassword and automatically genereated updater functions
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')


    //user should be navigated to login screen
    const onSignInPressed = () => {
        navigation.navigate('Login');

    }
    //when user signs up, they will be back to login page to sign in
    const onSignUpPress = async () => {
        //should register user with firebase
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            //here's the generated user
            const user = userCredential.user

            // Store the username in Firestore
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                //storing the username in firestore 
                username: username,
            });

            //upon success
            navigation.navigate('Login');
            
            } catch(error) {
            console.error("Error creating user:", error);
            }
    };
    


    const onSignInFacebook = () => {
        console.warn("Sign in");

    }

    const onSignInGoogle = () => {
        console.warn("Sign in");

    }

    const onSignInApple = () => {
        console.warn("Sign in");

    }

    return (
        //wrap whole thing in scroll view
        <LinearGradient colors={['#000000', '#2c106e', '#71319e']} style={styles.linearGradient}>
            <View style={styles.root}>
                    <Text style = {styles.title}>
                        Create Account
                    </Text>

                    <View style={styles.containerInput}>
                        <View style={styles.textInputContainer}>
                            <CustomInput
                                value={username}
                                setValue={setUsername}
                                placeholder="Username"
                                secureTextEntry={false}
                            />

                        <CustomInput
                            placeholder="Email"
                            value={email}
                            setValue={setEmail}
                        />

                            <CustomInput
                                placeholder="Password"
                                value={password}
                                setValue={setPassword}
                                secureTextEntry={true}
                            />

                        <CustomInput
                            placeholder="Repeat Password"
                            value={passwordRepeat}
                            setValue={setPasswordRepeat}
                            secureTextEntry={true}
                        />

                            <CustomButton
                                text="Sign Up"
                            onPress={onSignUpPress}
                            />

                           <Text style = {styles.text}>
                            By Registering, you confirm that you accept our <Text style = {styles.link}>Terms of Use</Text> and 
                            <Text style={styles.link}> Privacy Policy</Text>
                           </Text>

                            <CustomButton
                                text="Sign In With Facebook"
                                onPress={onSignInFacebook}
                                bgColor='#87cefa'
                                fgColor='#4765A9'

                            />

                            <CustomButton
                                text="Sign In With Google"
                                onPress={onSignInGoogle}
                                bgColor='#ffb6c1'
                                fgColor='#DD4D44'
                            />

                            <CustomButton
                                text="Sign In With Apple"
                                onPress={onSignInApple}
                                bgColor='#d3d3d3'
                                fgColor='#363636'
                            />

                            <CustomButton
                                text="Have an Account? Sign In"
                                // direct to login page
                                onPress={onSignInPressed}
                                type="TERTIARY"
                            />
                        </View>
                    </View>
            </View>
        </LinearGradient>
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

    text: { 
        color: 'gray',
        marginVertical: 10,
        width: 'auto',
    },
    link: {
        color: '#FDB075',
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
    title: {
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#9400d3',
        margin: 10, 
    }

});

export default SignUpScreen;