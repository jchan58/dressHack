import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({value, setValue, placeholder, secureTextEntry }) => {
  //receving value from user because this is a resuable component
  return (
    <View style = {styles.container}>
      <TextInput 
      value = {value}
      //when text changes update the newly updated text 
      onChangeText={setValue}
      placeholder={placeholder} 
      style = {styles.input}
      secureTextEntry ={secureTextEntry}
       />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', 
    width: 350,
    height: 45,

    justifyContent: "center",

    borderColor: '#000000', 
    borderWidth: 1, 
    //roudning the corners 
    borderRadius: 5,

    paddingHorizontal: 10, 
    marginVertical: 5, 
  },
  input: {
  },

})

export default CustomInput