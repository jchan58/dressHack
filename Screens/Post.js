import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import ImageViewer from '../components/ImageViewer';
import Button from '../components/Button'
import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const PlaceholderImage = require('../assets/images/blank_image.png');

export default function Post() {

  const [selectedImage, setSelectedImage] = useState(null);

  //image picking functionality (has cropping! perfect...)
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('Please select an image.');
    }
  };

  //the page with the buttons
  return (
    <LinearGradient colors = {['#000000', '#2c106e', '#71319e']} style = {styles.linearGradient}>
      <View style={styles.container}>
        <View style = {styles.imageContainer}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
        </View>

        <View style={styles.footerContainer}>
            <Button theme="choose" label="Choose a photo" onPress = {pickImageAsync} />
            <Button theme="post" label= "Post!" />
        </View>

        <StatusBar style="dark" />
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
});