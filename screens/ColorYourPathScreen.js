import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ColorYourPath() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Color Your Path</Text>
      <Text style={styles.subtitle}>Game for Anxiety</Text>
      {/* Your game code will go here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2fa659ff",
    alignItems: "center",
    justifyContent: "center",
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
  },
});
