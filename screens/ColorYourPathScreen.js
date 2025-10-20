import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, StyleSheet, TouchableOpacity } from "react-native";

export default function ColorYourPathScreen({ navigation }) {
  const [phase, setPhase] = useState("Inhale");
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const cycle = () => {
      setPhase("Inhale");
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.8,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setPhase("Hold");
        setTimeout(() => {
          setPhase("Exhale");
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 4000,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 0.6,
              duration: 4000,
              useNativeDriver: true,
            }),
          ]).start(() => cycle());
        }, 2000);
      });
    };
    cycle();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: scaleAnim }],
            opacity: fadeAnim,
          },
        ]}
      />
      <Text style={styles.phaseText}>{phase}</Text>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F0FA",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 150,
    height: 150,
    backgroundColor: "#76C7C0",
    borderRadius: 100,
  },
  phaseText: {
    fontSize: 28,
    fontWeight: "600",
    marginTop: 50,
    color: "#333",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 60,
    alignItems: "center",
  },
  button: {
    borderWidth: 2,
    borderColor: "#76C7C0",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginVertical: 10,
  },
  buttonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
});
