//need to be able to choose by to be anon or get name from profile
//get style from analysis (Joey)
//make analyzer the center tap, get rid of weird top...
//need to be able to pass analyzed image to post (Joey)
//need to be able to see only your posts (on profile or here)
//restyle text and stuff

import React, {useState} from 'react';
import {StyleSheet, Text, ScrollView, StatusBar, View, Image, Pressable} from 'react-native';

import {LinearGradient} from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from 'expo-media-library'
import ImageViewer from '../components/ImageViewer';
import { useRoute } from "@react-navigation/native";
import * as Font from 'expo-font';

const casualImageEx = require('../assets/images/casual_ex.jpg');
const profImageEx = require('../assets/images/prof_ex.jpg');
const partyImageEx = require('../assets/images/party_ex.jpg');
const PlaceholderImage = require('../assets/images/blank_image.png');

const ViewPosts = () => {

  const [fontsLoaded, setLoaded] = useState(false);
  

  const loadFonts = async () => {
    await Font.loadAsync({
      'Orbitron': require('../assets/fonts/Orbitron.ttf'), 'Tektur': require('../assets/fonts/Orbitron.ttf'), 
      'JosefinSans': require('../assets/fonts/JosefinSans.ttf'), 'Roboto': require('../assets/fonts/Roboto.ttf'),
      'Tajawal': require('../assets/fonts/Tajawal.ttf')
    });
    setLoaded(true);
  }

  loadFonts();

  //for if user selected a post
  const [selectedImage, setSelectedImage] = useState(null);

  //liked state and count
  const [liked1, setLiked1] = useState(false);
  const [liked2, setLiked2] = useState(false);
  const [liked3, setLiked3] = useState(false);
  const [liked4, setLiked4] = useState(false);
  
  const [likes4, setLikes4] = useState(225);
  const [likes1, setLikes1] = useState(313);
  const [likes2, setLikes2] = useState(200);
  const [likes3, setLikes3] = useState(325);



  function getaspectratio(img) {
    const data = image.resolveassetsource(img);
    return data.width / data.height;
  }

  const getPostAsync = async () => {
    posts = await MediaLibrary.getAlbumAsync("Dress Hacks Posts")
    if(posts != null) {
      paged_info = await MediaLibrary.getAssetsAsync({ album: posts.id })
      //post is newest added to album
      post = paged_info.assets[posts.assetCount - 1].uri;
      setSelectedImage(post);
    }
  }
 
  
  getPostAsync();
  const route = useRoute();
  const postStyle = route.params?.label;
  const postIm = route.params?.image;
  if(selectedImage != null) {
    if(selectedImage == null) {
      selectedImage = postIm;
    }

    if(postStyle == null) {
      //postStyle = '';
    }
    const postText = route.params?.postText
    if(fontsLoaded) {
      return (
        <View style={styles.containerMajor}>
      
        <LinearGradient colors = {['#123EA6','#0947DA','#6D2FEC','#71319e']} style = {styles.linearGradient}>
          <StatusBar style="dark" />   
            <ScrollView style={styles.scrollView}>


            <View style={styles.container}>
              <View style={styles.imageContainer}>
                
              <ImageViewer
              placeholderImageSource={PlaceholderImage}
              //this time is the post
              selectedImage={selectedImage}
              />
              </View>


              <View style={styles.interactContainer}>
                <View style = {[styles.leftTextContainer, styles.textUnderline]}>
                  <Text style= {styles.text}>Outfit By: Amy</Text>
                </View>

                <View style = {styles.leftTextContainer}>
                  <Text style= {styles.text}>Style: {post}</Text>
                </View>

                <View style = {styles.descTextContainer}>
                  <Text style= {styles.descText}>{postText}</Text>
                </View>
                
                <View style = {styles.likeContainer}>
                  <Pressable onPress={() => [setLiked4((isLiked) => !isLiked), liked4 ? setLikes4(likes4 - 1) : setLikes4(likes4 + 1)] }>
                    <Ionicons
                      name={liked4 ? "heart" : "heart-outline"}
                      size={32}
                      color={liked4 ? '#fc3fc4' : "black"}
                    />
                  </Pressable>

                  <Text style = {styles.likeText}>{likes4}</Text>

                </View>

              </View>
            </View>



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
                  <Pressable onPress={() => [setLiked1((isLiked) => !isLiked), liked1 ? setLikes1(likes1 - 1) : setLikes1(likes1 + 1)]}>
                    <Ionicons
                      name={liked1 ? "heart" : "heart-outline"}
                      size={32}
                      color={liked1 ? '#fc3fc4' : "black"}
                    />
                  </Pressable>

                  <Text style = {styles.likeText}>{likes1}</Text>

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
                  <Pressable onPress={() => [setLiked2((isLiked) => !isLiked), liked2 ? setLikes2(likes2 - 1) : setLikes2(likes2 + 1)]}>
                    <Ionicons
                      name={liked2 ? "heart" : "heart-outline"}
                      size={32}
                      color={liked2 ? '#fc3fc4' : "black"}
                    />
                  </Pressable>

                  <Text style = {styles.likeText}>{likes2}</Text>
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
                  <Text style= {styles.text}>Style: Casual</Text>
                </View>

                <View style = {styles.descTextContainer}>
                  <Text style= {styles.descText}>Dance time!</Text>
                </View>
                
                <View style = {styles.likeContainer}>
                  <Pressable onPress={() => [setLiked3((isLiked) => !isLiked), liked3 ? setLikes3(likes3 - 1) : setLikes3(likes3 + 1)]}>
                    <Ionicons
                      name={liked3 ? "heart" : "heart-outline"}
                      size={32}
                      color={liked3 ? '#fc3fc4' : "black"}
                    />
                  </Pressable>

                  <Text style = {styles.likeText}>{likes3}</Text>
                </View>


              </View>



            </View>
            
      
            </ScrollView>
        </LinearGradient>
      </View>
      );
    }
  }
  if(fontsLoaded) {
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
              <Image source={partyImageEx} style={styles.image} />
            </View>


            <View style={styles.interactContainer}>
              <View style = {[styles.leftTextContainer, styles.textUnderline]}>
                <Text style= {styles.text}>Outfit By: Mary</Text>
              </View>

              <View style = {styles.leftTextContainer}>
                <Text style= {styles.text}>Style: Casual</Text>
              </View>

              <View style = {styles.descTextContainer}>
                <Text style= {styles.descText}>Dance night!</Text>
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
          
    
          </ScrollView>
      </LinearGradient>
      </View>
    );
  }
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
    fontFamily: 'Tajawal',
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
    fontFamily: 'Tajawal',
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
  },
});

export default ViewPosts;