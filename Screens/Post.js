import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView, Modal, TextInput, Dimensions} from 'react-native';
import ImageViewer from '../components/ImageViewer';
import Button from '../components/Button'
import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library'


const PlaceholderImage = require('../assets/images/blank_image.png');
const { width } = Dimensions.get("window");

export default function Post() {

  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();

  // This is to manage Modal State
  const [isModalVisible, setModalVisible] = useState(false);
  
  // This is to manage TextInput State
  const [inputValue, setInputValue] = useState("");

  // Create toggleModalVisibility function that will
  // Open and close modal upon button clicks.
  const toggleModalVisibility = () => {
      setModalVisible(!isModalVisible);
  };
  

  //image picking functionality (has cropping! perfect...)
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) { 
        const asset = await MediaLibrary.createAssetAsync(result.assets[0].uri);
      if(MediaLibrary.getAlbumAsync("Dress Hacks Posts") != null) {
        //false = move to album instead of copy
        album = MediaLibrary.createAlbumAsync("Dress Hacks Posts", asset, false);
      } else {
        MediaLibrary.addAssetsToAlbumAsync([asset], "Dress Hacks Posts", false)
      }
      
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('Please select an image.');
    }
  };

  const pickAndPopUp = () => {
    pickImageAsync();
    toggleModalVisibility();
  }

  const Post = () => {
    navigation.navigate('ViewPosts', {postText: inputValue});
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
            

            <SafeAreaView>
      

            {/** Post and toogle model on to type text* (needs to be onPress -> pickImageAsync, toggleModalVisibility/}
            {/**  We are going to create a Modal with Text Input. */}
            <Button theme="choose" label="Choose a photo" onPress = {pickAndPopUp} />
  
            {/** This is our modal component containing textinput and a button */}
            <Modal animationType="slide" 
                   transparent visible={isModalVisible} 
                   presentationStyle="overFullScreen" 
                   onDismiss={toggleModalVisibility}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <TextInput placeholder="Enter a description for your post" 
                                   value={inputValue} style={styles.textInput} 
                                   onChangeText={(value) => setInputValue(value)} maxLength={20}/>
  
                        {/** This button is responsible to close the modal */}
                        <Button theme = "close" label="Close" onPress={toggleModalVisibility} />
                    </View>
                </View>
            </Modal>
            </SafeAreaView>
            <Button theme="post" label= "Post!" onPress = {Post}/>
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
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, 
                { translateY: -90 }],
    height: 180,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 7,
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