import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Logo from '../assets/images/Logo.png';
import CustomInput from '../components/Custom_Input';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import CustomButton from '../components/CustomButton';


const ForgotPassword = () => {

    //both username and password should be state vars since they will be changing
    //setUsername and setPassword and automatically genereated updater functions
    const [username, setUsername] = useState('')
    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('Login');

    }

    const onSendPressed = () => {
        //check with backend if user exists, then move to reset password page
        navigation.navigate('ResetPassword');

    }

    const onForgotPasswordPressed = () => {
        console.warn("Sign in");

    }


    return (
        //wrap whole thing in scroll view
        <LinearGradient colors={['#000000', '#2c106e', '#71319e']} style={styles.linearGradient}>
            <View style={styles.root}>
                <Text style={styles.title}>
                    Reset Your Password
                </Text>

                <View style={styles.containerInput}>
                    <View style={styles.textInputContainer}>
                        <CustomInput
                            value={username}
                            setValue={setUsername}
                            placeholder="Enter Your Username *"
                            secureTextEntry={false}
                        />

                        <CustomButton
                            text="Send"
                            //direct to reset password screen
                            onPress={onSendPressed}
                        />

                        <CustomButton
                            text="Back to Sign In"
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

export default ForgotPassword;