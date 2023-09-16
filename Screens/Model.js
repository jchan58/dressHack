import React, { useState, useEffect } from 'react';  // <-- Add useEffect
import { View, Button, Image, Text } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location'; // <-- Import Location

export default function Model() {
    const [image, setImage] = useState(null);
    const [actualPrediction, setActualPrediction] = useState(null);
    const [colorPrediction, setColorPrediction] = useState(null);
    const [weatherPrediction, setWeatherPrediction] = useState(null);
    const [location, setLocation] = useState(null);  // <-- Store the user's location

    useEffect(() => {
        // Request location permission when the component mounts
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);
        })();
    }, []); // <-- Run this effect only once, when the component mounts

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const getPrediction = async () => {
        if (!image) return;
    
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
            const response = await axios.post('http://10.203.28.219:5001/predict', formData);
            console.log("Received response:", response.data);
            setActualPrediction(response.data.predictions_model);
            setColorPrediction(response.data.predictions_color_model);
            setWeatherPrediction(response.data.predictions_weather_model); 
        } catch (error) {
            console.error('Failed to predict:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Button title="Pick Image" onPress={pickImage} />
    {image && <Image source={{ uri: image }} style={{ width: 256, height: 256 }} />}
    <Button title="Predict" onPress={getPrediction} />

    {actualPrediction && Array.isArray(actualPrediction[0]) && actualPrediction[0].map((prob, index) => (
        <Text key={index}>Actual Model - Label {index}: {(prob ? (prob * 100).toFixed(2) : 'N/A')}%</Text>
    ))}

    {colorPrediction && Array.isArray(colorPrediction[0]) && colorPrediction[0].map((prob, index) => (
        <Text key={index}>Color Model - Label {index}: {(prob ? (prob * 100).toFixed(2) : 'N/A')}%</Text>
    ))}

    {weatherPrediction && Array.isArray(weatherPrediction[0]) && weatherPrediction[0].map((prob, index) => ( 
        <Text key={index}>Weather Model - Label {index}: {(prob ? (prob * 100).toFixed(2) : 'N/A')}%</Text>
    ))}

    {location && <Text>Location: {location.latitude}, {location.longitude}</Text>}
</View>

    );
}
