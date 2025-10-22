import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import GameButtons from "../components/GameButtons"; // 👈 keep this

export default function PatternPathwaysScreen({ navigation }) {
const [pattern, setPattern] = useState(generatePattern());
  const [userInput, setUserInput] = useState([]);


 function generatePattern(length = 4) {
    const options = ['🔵', '🟢', '🔴'];
    let result = [];
    for (let i = 0; i < length; i++) {
      result.push(options[Math.floor(Math.random() * options.length)]);
    }
    return result;
  }

  const handleSelect = (color) => {
    const updatedInput = [...userInput, color];
    setUserInput(updatedInput);

    if (updatedInput.length === pattern.length) {
      if (JSON.stringify(updatedInput) === JSON.stringify(pattern)) {
        Alert.alert("🎉 Great job!", "You matched the pattern!", [
          { text: "Play Again", onPress: resetGame },
        ]);
      } else {
        Alert.alert("❌ Try again", "That pattern was incorrect.", [
          { text: "Try Again", onPress: resetGame },
        ]);
      }
    }
  };

  const resetGame = () => {
    setPattern(generatePattern());
    setUserInput([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pattern Pathways</Text>
      <Text style={styles.subtitle}>Repeat the pattern:</Text>

      <View style={styles.patternRow}>
        {pattern.map((icon, index) => (
          <Text key={index} style={styles.patternIcon}>
            {icon}
          </Text>
        ))}
      </View>

      <Text style={styles.instruction}>Tap to match:</Text>

      <View style={styles.buttonRow}>
        {['🔵', '🟢', '🔴'].map((color) => (
          <TouchableOpacity
            key={color}
            onPress={() => handleSelect(color)}
            style={styles.choiceButton}
          >
            <Text style={styles.choiceIcon}>{color}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <GameButtons navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: {['#4facfe', '#00f2fe']}
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
  },
  patternRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  patternIcon: {
    fontSize: 32,
    marginHorizontal: 10,
  },
  instruction: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    marginBottom: 30,
  },
  choiceButton: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  choiceIcon: {
    fontSize: 24,
  },
});
