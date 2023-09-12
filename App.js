import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//importing login screen
import Login from './Screens/Login';

export default function App() {
  return (
    <View style={styles.container}>
      <Login />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //change entire background of app here (changed to gray for now)
    backgroundColor: '#00008b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});