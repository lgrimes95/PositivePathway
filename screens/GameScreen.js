import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function GameScreen({ route }) {
  const { gameName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You’re going to:</Text>
      <Text style={styles.gameName}>{gameName}</Text>
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
  text: {
    color: "white",
    fontSize: 24,
    marginBottom: 10,
  },
  gameName: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
});
