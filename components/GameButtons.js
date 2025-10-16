// components/GameButtons.js
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function GameButtons({ navigation }) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Feeling")}
      >
        <Text style={styles.buttonText}>Back to Feelings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Welcome")}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
