import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native'
import React, {useState} from 'react';
import * as Font from 'expo-font';
//receive the press event through props to now it's customizable
//default is primary style
const CustomButton = ({onPress, text, type = "PRIMARY", bgColor, fgColor}) => {

  const [fontsLoaded, setLoaded] = useState(false);
  

  const loadFonts = async () => {
    await Font.loadAsync({
      'Handjet': require('../assets/fonts/Handjet.ttf'),
    });
    setLoaded(true);
  }

  loadFonts();
  if(fontsLoaded) {
  return (
    //pressable is similr to view but you can add your press event! 
    //notaiton allows us to apply different style if user enters differne style from primary
    <Pressable onPress={onPress} style={[styles.container, 
    styles[`container_${type}`],
    bgColor ? {backgroundColor: bgColor} : {}
    ]}>
      <Text style = 
      {[styles.text, 
      styles[`text_${type}`],
      fgColor ? {color: fgColor} : {}
      
      ]}>{text}</Text>
    </Pressable>
  )
  }
}

const styles = StyleSheet.create({
    container: {
        width: 350,
        padding: 15,
        marginVertical: 5, 
        alignItems: 'center', 
        borderRadius: 5,
    },

    container_PRIMARY: {
        backgroundColor: '#3B71F3',
    }, 

    //add in custom styles here
    container_TERTIARY: {
    }, 

    text_PRIMARY: {
        fontWeight: 'bold', 
        color: 'white'
    },

    //add in custom styles here
    text_TERTIARY: {
        color: 'gray'
    },
    text_HANDJET: {
        fontFamily: 'Handjet',
        fontSize: 17,
    },
    container_HANDJET: {
      backgroundColor: '#3B71F3',
    }

});

export default CustomButton