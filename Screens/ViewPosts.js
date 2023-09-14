//have a few posts
//be able to add posts
//want like button, comment button?, name (or anon), outfit style as rated by the analyzer and comments to be displayed in box(it's a box for now)
import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar, View, Image
} from 'react-native';

import {LinearGradient} from 'expo-linear-gradient';
import LikeButton from '../components/Button'


const casualImageEx = require('../assets/images/casual_ex.jpg');
const profImageEx = require('../assets/images/assets/prof_ex.jpg');
const exerImageEx = require('../assets/images/exer_ex.jpg');
const partyImageEx = require('../assets/images/party_ex.jpg');

const App = () => {
  
  function getaspectratio(img) {
    const data = image.resolveassetsource(img);
    return data.width / data.height;
  }

  

  

  return (
    <View style={styles.containerMajor}>
    
    <LinearGradient colors = {['#000000', '#2c106e', '#71319e']} style = {styles.linearGradient}>
      <StatusBar style="dark" />   
        <ScrollView style={styles.scrollView}>
          
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={casualImageEx} style={styles.image} />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.interactContainer}>
            <LikeButton></LikeButton>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={profImageEx} style={styles.image} />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={exerImageEx} style={styles.image} />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={partyImageEx} style={styles.image} />
          </View>
        </View>

        
  
        </ScrollView>
    </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMajor: {
    paddingBottom: 0,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  text: {
    fontSize: 42,
  },
  image: {
    width: 350,
    height: 550,
    borderRadius: 18,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  }, 
  interactContainer: {
    flex: 1,
    paddingTop: 58,
    backgroundColor: 'white',
    width: 350,
    height: 250,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default App;