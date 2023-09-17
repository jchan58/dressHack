import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Image, SafeAreaView, Modal, TextInput, Dimensions} from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';


export default function Model({ route }) {
    const imageUri = route.params?.imageUri;
    const [image, setImage] = useState(imageUri);
    console.log("Received imageUri:", imageUri);
    useEffect(() => {
        setImage(imageUri);
    }, [imageUri]);
    const [actualPrediction, setActualPrediction] = useState(null);
    const [colorPrediction, setColorPrediction] = useState(null);
    const [weatherPrediction, setWeatherPrediction] = useState(null);
    const [fetchingLocation, setFetchingLocation] = useState(true);
    const [location, setLocation] = useState(null); 
    const actualLabels = ['Casual', 'Professional'];
    const colorLabels = ['Coordinated', 'Uncoordinated'];
    const weatherLabels = ['Fall', 'Spring', 'Summer', 'Winter'];
    const navigation = useNavigation();
    const MAX_RETRIES = 6; // adjust this based on how many attempts you want to make
    let attemptCounter = 0;

    useEffect(() => {
    async function fetchLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            setFetchingLocation(false);
            return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        if (currentLocation && currentLocation.coords) {
            setLocation(currentLocation.coords);
            setFetchingLocation(false);
            await getPrediction();
            clearInterval(locationInterval);  // stop the interval if the location is obtained
        } else {
            attemptCounter++;
            if (attemptCounter >= MAX_RETRIES) {
                console.error('Failed to obtain location after maximum attempts.');
                clearInterval(locationInterval); // stop the interval after max attempts
            }
        }
    }

    const locationInterval = setInterval(fetchLocation, 5000);  // try every 5 seconds

    return () => clearInterval(locationInterval); // cleanup on component unmount
}, []);

    

    const getHigherLabel = () => {
        if (!actualPrediction || !Array.isArray(actualPrediction[0])) return null;
        return actualLabels[actualPrediction[0][0] > actualPrediction[0][1] ? 0 : 1];
    };   
    
    const makePost = () => {
        const label = getHigherLabel();
        if (!label) {
            console.error("Prediction data is missing.");
            return;
        }
        
        navigation.navigate('Post', {
            image: image,
            label: label
        });
    };

    const goBack = () => {
        navigation.navigate('Analyzer')
    };
    

    const getLabel = (model, index) => {
        switch (model) {
            case 'actual': return actualLabels[index] || `Label ${index}`;
            case 'color': return colorLabels[index] || `Label ${index}`;
            case 'weather': return weatherLabels[index] || `Label ${index}`;
            default: return `Label ${index}`;
        }
    };

    const getPrediction = async () => {
        if (!image) return;
        console.log("Inside getPrediction function with image:", image);
        const formData = new FormData();
        formData.append('file', {
            uri: image,
            type: 'image/jpeg',
            name: 'upload.jpg',
        });
        if (location) {
            formData.append('latitude', location.latitude.toString());
            formData.append('longitude', location.longitude.toString());
        }

        try {
            console.log("Sending prediction request...");
            const response = await axios.post('http://10.203.222.79:5001/predict', formData);
            console.log("Received response:", response.data);
            setActualPrediction(response.data.predictions_model);
            setColorPrediction(response.data.predictions_color_model);
            setWeatherPrediction(response.data.predictions_weather_model); 
        } catch (error) {
            console.error('Failed to predict:', error);
        }
    };

    
    return (
        <LinearGradient colors={['#93acff', '#93acff', '#71319e']} style={styles.linearGradient}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {image && <Image source={{ uri: image }} style={{ width: 256, height: 256 }} />}

            {actualPrediction && Array.isArray(actualPrediction[0]) && actualPrediction[0].map((prob, index) => (
                <Text key={index}>Actual Model - {getLabel('actual', index)}: {(prob ? (prob * 100).toFixed(2) : 'N/A')}%</Text>
            ))}

            {colorPrediction && Array.isArray(colorPrediction[0]) && colorPrediction[0].map((prob, index) => (
                <Text key={index}>Color Model - {getLabel('color', index)}: {(prob ? (prob * 100).toFixed(2) : 'N/A')}%</Text>
            ))}

            {weatherPrediction && Array.isArray(weatherPrediction[0]) && weatherPrediction[0].map((prob, index) => ( 
                <Text key={index}>Weather Model - {getLabel('weather', index)}: {(prob ? (prob * 100).toFixed(2) : 'N/A')}%</Text>
            ))}
            <Button title="Make Predictions" onPress={getPrediction} />
            <Button title="Make a Post" onPress={makePost} />
            <Button title="Take another picture" onPress={goBack} />
        </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 100,
    },
    footerContainer: {
      flex: 1 / 3,
      alignItems: 'center',
      paddingTop: 40,
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
    viewWrapper: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    textInput: {
      width: "80%",
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderColor: "rgba(0, 0, 0, 0.2)",
      borderWidth: 1,
      marginBottom: 8,
    },
  });
