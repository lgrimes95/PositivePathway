import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function WelcomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.welcomeText, { opacity: fadeAnim }]}>
        Welcome to PositivePathways
      </Animated.Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Feeling")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
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
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 60,
    alignItems: "center",
    width: "100%",
  },
  button: {
    borderWidth: 2,
    borderColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
