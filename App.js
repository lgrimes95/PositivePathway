import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleGetStarted = () => {
    console.log("Get Started pressed!");
    // In the future, you can navigate here (e.g., navigation.navigate('Home'))
  };

  return (
    <LinearGradient
      colors={["#0072ff", "#00c6a7"]} // blue to green gradient
      style={styles.background}
    >
      <View style={styles.container}>
        <Animated.Text style={[styles.welcomeText, { opacity: fadeAnim }]}>
          Welcome to PositivePathways
        </Animated.Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    fontFamily: Platform.select({
      ios: "Georgia",
      android: "serif",
    }),
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    alignItems: "center",
    paddingBottom: 60, // distance from bottom of screen
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
