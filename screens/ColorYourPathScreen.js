// screens/MoodGarden.js
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function MoodGarden({ navigation, route }) {
  const [flowers, setFlowers] = useState([]);

  const colors = [
    "#FF9AA2", // soft pink
    "#FFB7B2", // peach
    "#FFDAC1", // light orange
    "#E2F0CB", // green
    "#B5EAD7", // teal
    "#C7CEEA", // lavender
  ];

  const addFlower = (x, y) => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const scale = new Animated.Value(0);

    const newFlower = { x, y, color, scale };
    setFlowers((prev) => [...prev, newFlower]);

    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      tension: 60,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = (e) => {
    const { locationX, locationY } = e.nativeEvent;
    addFlower(locationX, locationY);
  };

  const clearGarden = () => {
    setFlowers([]);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.gardenArea}>
          {flowers.map((f, index) => (
            <Animated.View
              key={index}
              style={[
                styles.flower,
                {
                  backgroundColor: f.color,
                  left: f.x - 15,
                  top: f.y - 15,
                  transform: [{ scale: f.scale }],
                },
              ]}
            />
          ))}
          {flowers.length === 0 && (
            <Text style={styles.instruction}>
              Tap anywhere to plant your mood 🌱
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={clearGarden}>
          <Text style={styles.buttonText}>Clear Garden</Text>
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
    backgroundColor: "#A7E9AF",
    alignItems: "center",
    justifyContent: "center",
  },
  gardenArea: {
    flex: 1,
    width: "100%",
    position: "relative",
  },
  flower: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  instruction: {
    position: "absolute",
    top: height / 2.5,
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: "#2fa659",
    fontWeight: "bold",
    fontSize: 16,
  },
});
