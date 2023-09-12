import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Button({ label, theme, onPress }) {
    if (theme === "choose") {
        return (
          <View
          style={[styles.buttonContainer, { borderWidth: 0, borderColor: "#ffd33d", borderRadius: 18, paddingBottom: 10 }]}
          >
            <Pressable
              style={[styles.button, { backgroundColor: "#fff" }]}
              onPress={onPress}
            >
              <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
            </Pressable>
        </View>
        );
    } else if (theme === "post") {
      return (
        <View
        style={[styles.buttonContainer, { borderWidth: 0, borderColor: "#ffd33d", borderRadius: 18, paddingBottom: 10 }]}
        >
          <Pressable
            style={[styles.button, { backgroundColor: "#fff" }]}
            onPress={() => alert('You pressed a button.')}
          >
            <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
          </Pressable>
      </View>
      );
    }


  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
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
    fontSize: 16,
  },
});