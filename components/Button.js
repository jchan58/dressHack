import { StyleSheet, View, Pressable, TouchableOpacity, Text } from 'react-native';
import * as Font from 'expo-font';
import { useState } from 'react';

export default function Button({ label, theme, onPress }) {

  const [fontsLoaded, setLoaded] = useState(false);
  

  const loadFonts = async () => {
    await Font.loadAsync({
      'Handjet': require('../assets/fonts/Handjet.ttf'),
    });
    setLoaded(true);
  }

  loadFonts();




    if (theme === "choose") {
      if(fontsLoaded){
        return (
          <View
          style={[styles.buttonContainer, { borderWidth: 0, borderColor: "#ffd33d", borderRadius: 18, paddingBottom: 10 }]}
          >
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#fff" }]}
              onPress={onPress}
            >
              <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
            </TouchableOpacity>
        </View>
        );
      }
    } else if (theme === "post") {
      if(fontsLoaded){
        return (
          <View
          style={[styles.buttonContainer, { borderWidth: 0, borderColor: "#ffd33d", borderRadius: 18, paddingBottom: 10 }]}
          >
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#fff" }]}
              onPress={onPress}
            >
              <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
            </TouchableOpacity>
        </View>
        );
      }
    } else if (theme === "close") {
      if(fontsLoaded){
        return (
          <View
          style={[styles.buttonContainer, { borderWidth: 0, borderColor: "#3446eb", borderRadius: 18, paddingBottom: 10 }]}
          >
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#3446eb" }]}
              onPress={onPress}
            >
              <Text style={[styles.buttonLabel, { color: "#ffffff" }]}>{label}</Text>
            </TouchableOpacity>
        </View>
        );
      }
    }


  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => alert('You pressed a button.')}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Handjet',
  },
});