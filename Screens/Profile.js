import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    //user will be able to choose an image
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUri, setImageUri] = useState(null);

    const onLogout = () => {
        //direct user to sign up page
        navigation.navigate('Login');

    }


    // Function to handle image selection
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
        }
    };


    useEffect(() => {
        const currentUser = auth.currentUser;

        if (currentUser) {
            const userEmail = currentUser.email;
            const uid = currentUser.uid;

            const userRef = doc(db, 'users', uid);

            getDoc(userRef)
                .then((docSnapshot) => {
                    if (docSnapshot.exists()) {
                        const userData = docSnapshot.data();
                        const userUsername = userData.username;
                        setUsername(userUsername);

                        setUser({ email: userEmail, username: userUsername });
                    } else {
                        console.log('No such document!');
                    }
                })
                .catch((error) => {
                    console.log('Error getting document:', error);
                });
        }
    }, []);

    return (
        <LinearGradient colors={['#000000', '#2c106e', '#71319e']} style={styles.linearGradient}>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>User Information</Text>
            {user && (
                <View style={styles.userDataContainer}>
                    <View style={styles.userDataBlock}>
                        <Text style={styles.userDataLabel}>Email:</Text>
                        <Text style={styles.userDataValue}>{user.email}</Text>
                    </View>
                    <View style={styles.userDataBlock}>
                        <Text style={styles.userDataLabel}>Username:</Text>
                        <Text style={styles.userDataValue}>{user.username}</Text>
                    </View>

                    <CustomButton
                        text="Pick Image"
                        onPress={pickImage}
                    />
                    <View style={{ marginTop: 20 }}>
                    <View style={styles.imageContainer}>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={styles.image} />
                        ) : (
                            <Text style={styles.imagePlaceholder}>Select Profile Image</Text>
                        )}
                        </View>
                    </View>

                        <CustomButton
                            text="Logout"
                            onPress={onLogout}
                            type = "TERTIARY"
                        />


                    
                </View>
                
            )}
        </ScrollView>
        </LinearGradient >

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "#ffffff",
    },
    userDataContainer: {
        alignItems: 'center',
        width: 450, 
        height: 'auto',

    },
    userDataBlock: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        marginBottom: 20,
        width: '80%',
    },
    userDataLabel: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    userDataValue: {},

    imageContainer: {
        width: 200, // Adjust the width and height as needed
        height: 200,
        borderRadius: 100, // To create a circular shape
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 200,
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
    },


});

export default ProfileScreen;
