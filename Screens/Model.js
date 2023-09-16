import React, { useState } from 'react';
import { View, Button, Image, Text } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

export default function Model() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

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

    try {
      const response = await axios.post('http://10.203.28.219:5001/predict', formData);
      setPrediction(response.data); // Adjust according to your response structure
    } catch (error) {
      console.error('Failed to predict:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Pick Image" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Button title="Predict" onPress={getPrediction} />
        {prediction && prediction[0].map((prob, index) => (
            <Text key={index}>Label {index}: {(prob * 100).toFixed(2)}%</Text>
        ))}
    </View>
);
}
