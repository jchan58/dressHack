//need to be able to add post and description here
//and choose by to be anon or get name from profile
//get style from analysis (put in file name ig when saved?)
//need to be able to post from Post or from Image Analyzer
//need to be able to navigate to this screen after posting
//need to be able to see only your posts (on profile or here)
//increment likes on user press and with new post add new liked state
//can restyle text and stuff

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  StatusBar, View, Image
} from 'react-native';

import {LinearGradient} from 'expo-linear-gradient';
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";


const casualImageEx = require('../assets/images/casual_ex.jpg');
const profImageEx = require('../assets/images/prof_ex.jpg');
const exerImageEx = require('../assets/images/exer_ex.jpg');
const partyImageEx = require('../assets/images/party_ex.jpg');

const ViewPosts = () => {
  
  function getaspectratio(img) {
    const data = image.resolveassetsource(img);
    return data.width / data.height;
  }

  
  const [liked1, setLiked1] = useState(false);
  const [liked2, setLiked2] = useState(false);
  const [liked3, setLiked3] = useState(false);
  const [liked4, setLiked4] = useState(false);
  

  return (
    <View style={styles.containerMajor}>
    
    <LinearGradient colors = {['#000000', '#2c106e', '#71319e']} style = {styles.linearGradient}>
      <StatusBar style="dark" />   
        <ScrollView style={styles.scrollView}>
          
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={casualImageEx} style={styles.image} />
          </View>


          <View style={styles.interactContainer}>
            <View style = {[styles.leftTextContainer, styles.textUnderline]}>
              <Text style= {styles.text}>Outfit By: Amy</Text>
            </View>

            <View style = {styles.leftTextContainer}>
              <Text style= {styles.text}>Style: Casual</Text>
            </View>

            <View style = {styles.descTextContainer}>
              <Text style= {styles.descText}>Outfit for today!</Text>
            </View>
            
            <View style = {styles.likeContainer}>
              <Pressable onPress={() => setLiked1((isLiked) => !isLiked)}>
                <Ionicons
                  name={liked1 ? "heart" : "heart-outline"}
                  size={32}
                  color={liked1 ? '#fc3fc4' : "black"}
                />
              </Pressable>

              <Text style = {styles.likeText}>313</Text>

            </View>

          </View>
        </View>

        <View style={styles.container}>
          
        </View>

        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={profImageEx} style={styles.image} />
          </View>


          <View style={styles.interactContainer}>
            <View style = {[styles.leftTextContainer, styles.textUnderline]}>
              <Text style= {styles.text}>Outfit By: Jeremy</Text>
            </View>

            <View style = {styles.leftTextContainer}>
              <Text style= {styles.text}>Style: Professional</Text>
            </View>

            <View style = {styles.descTextContainer}>
              <Text style= {styles.descText}>Ready to present.</Text>
            </View>
            
            <View style = {styles.likeContainer}>
              <Pressable onPress={() => setLiked2((isLiked) => !isLiked)}>
                <Ionicons
                  name={liked2 ? "heart" : "heart-outline"}
                  size={32}
                  color={liked2 ? '#fc3fc4' : "black"}
                />
              </Pressable>

              <Text style = {styles.likeText}>200</Text>
            </View>

          </View>

          
        </View>

        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={exerImageEx} style={styles.image} />
          </View>


          <View style={styles.interactContainer}>
            <View style = {[styles.leftTextContainer, styles.textUnderline]}>
              <Text style= {styles.text}>Outfit By: Lucy</Text>
            </View>

            <View style = {styles.leftTextContainer}>
              <Text style= {styles.text}>Style: Exercise</Text>
            </View>

            <View style = {styles.descTextContainer}>
              <Text style= {styles.descText}>Workout fit!!</Text>
            </View>
            
            <View style = {styles.likeContainer}>
              <Pressable onPress={() => setLiked3((isLiked) => !isLiked)}>
                <Ionicons
                  name={liked3 ? "heart" : "heart-outline"}
                  size={32}
                  color={liked3 ? '#fc3fc4' : "black"}
                />
              </Pressable>

              <Text style = {styles.likeText}>114</Text>
            </View>


          </View>



        </View>

        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={partyImageEx} style={styles.image} />
          </View>



          <View style={styles.interactContainer}>
            <View style = {[styles.leftTextContainer, styles.textUnderline]}>
              <Text style= {styles.text}>Outfit By: Mary</Text>
            </View>

            <View style = {styles.leftTextContainer}>
              <Text style= {styles.text}>Style: Party</Text>
            </View>

            <View style = {styles.descTextContainer}>
              <Text style= {styles.descText}>Ready for the dance!</Text>
            </View>
            
            <View style = {styles.likeContainer}>
              <Pressable onPress={() => setLiked4((isLiked) => !isLiked)}>
                <Ionicons
                  name={liked4 ? "heart" : "heart-outline"}
                  size={32}
                  color={liked4 ? '#fc3fc4' : "black"}
                />
              </Pressable>

              <Text style = {styles.likeText}>350</Text>
            </View>

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
  image: {
    width: 350,
    height: 550,
    borderRadius: 18,
  },
  imageContainer: {
    flex: 1,
    borderWidth: 6,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  }, 
  interactContainer: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 5,
    backgroundColor: 'white',
    width: 355,
    height: 150,
    borderRadius: 10,
    paddingEnd: 10,
    borderWidth: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Helvetica',
    lineHeight: 32,
    fontWeight: '300',
    textAlign: 'left',
    color: 'black',
    borderRadius: 12,
    position: 'absolute'
  }, 
  textUnderline: {
    textDecorationLine: 'underline',
    textDecoration: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black'
  },
  leftTextContainer: {
    paddingBottom: 25,
    justifyContent: 'flex-start',
    borderWidth: 0,
  },
  descTextContainer: {
    paddingBottom: 25,
    paddingTop: 20,
    justifyContent: 'flex-end',
    borderWidth: 0,
    fontSize: 60,
  },
  descText: {
    fontSize: 25,
  },
  likeContainer: {
    position: 'absolute',
    paddingLeft: 290,
    paddingTop: 15,
  },
  likeText: {
    fontSize: 15,
    color: '#fc3fc4',
    paddingLeft: 5,
  }
});

export default ViewPosts;