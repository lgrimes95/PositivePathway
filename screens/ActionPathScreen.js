import React from "react";
import { View, Text, StyleSheet } from "react-native";
import GameButtons from "../components/GameButtons"; // 👈 import here

export default function ActionPathScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Action Path</Text>
      <Text style={styles.subtitle}>Game for Depression</Text>

      {/* Use shared buttons */}
      <GameButtons navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2fa659ff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    color: "white",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 50,
  },
});
