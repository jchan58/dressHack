import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({value, setValue, placeholder}) => {
  //receving value from user because this is a resuable component
  return (
    <View style = {styles.container}>
      <TextInput 
      value = {value}
      //when text changes update the newly updated text 
      onChangeText={setValue}
      placeholder={placeholder} 
      style = {styles.input} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', 
    width: 300,
    height: 30,

    borderColor: '#000000', 
    borderWidth: 1, 
    //roudning the corners 
    borderRadius: 5,

    paddingHorizontal: 10, 
    marginVertical: 5, 
  },
  input: {},

})

export default CustomInput