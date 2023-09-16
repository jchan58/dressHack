import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

export default function Model({ route }) {
    const imageUri = route.params?.imageUri;
    const [image, setImage] = useState(imageUri);
    console.log("Received imageUri:", imageUri);
    const [actualPrediction, setActualPrediction] = useState(null);
    const [colorPrediction, setColorPrediction] = useState(null);
    const [weatherPrediction, setWeatherPrediction] = useState(null);
    const [location, setLocation] = useState(null); 
    const actualLabels = ['Casual', 'Professional'];
    const colorLabels = ['Coordinated', 'Uncoordinated'];
    const weatherLabels = ['Fall', 'Spring', 'Summer', 'Winter'];
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);
        })();
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
            {image && <Image source={{ uri: image }} style={{ width: 256, height: 256 }} />}
            <Button title="Predict" onPress={getPrediction} />

            {actualPrediction && Array.isArray(actualPrediction[0]) && actualPrediction[0].map((prob, index) => (
                <Text key={index}>Actual Model - {getLabel('actual', index)}: {(prob ? (prob * 100).toFixed(2) : 'N/A')}%</Text>
            ))}

            {colorPrediction && Array.isArray(colorPrediction[0]) && colorPrediction[0].map((prob, index) => (
                <Text key={index}>Color Model - {getLabel('color', index)}: {(prob ? (prob * 100).toFixed(2) : 'N/A')}%</Text>
            ))}

            {weatherPrediction && Array.isArray(weatherPrediction[0]) && weatherPrediction[0].map((prob, index) => ( 
                <Text key={index}>Weather Model - {getLabel('weather', index)}: {(prob ? (prob * 100).toFixed(2) : 'N/A')}%</Text>
            ))}
            <Button title="Make a Post" onPress={makePost} />
        </View>
    );
}
