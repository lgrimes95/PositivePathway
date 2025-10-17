// screens/ActionPathScreen.js
import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import GameButtons from "../components/GameButtons";

const situations = [
  {
    situation: "You wake up feeling low and have no motivation.",
    options: [
      { text: "Stay in bed all morning", points: -2 },
      { text: "Get up and take a shower", points: 2 },
    ],
  },
  {
    situation: "You have plans with a friend but don’t feel like going.",
    options: [
      { text: "Cancel and stay home", points: -3 },
      { text: "Go anyway, maybe you’ll feel better", points: 3 },
    ],
  },
  {
    situation: "You’re overwhelmed by chores piling up.",
    options: [
      { text: "Do one small thing to start", points: 2 },
      { text: "Avoid them completely", points: -2 },
    ],
  },
  {
    situation: "You’re feeling lonely this evening.",
    options: [
      { text: "Scroll social media", points: -1 },
      { text: "Call or text someone you trust", points: 3 },
    ],
  },
];

const CONTENT_TOP_PADDING = "20%"; // <-- increase this number to push the content lower

export default function ActionPathScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const current = situations[index];

  const handleChoice = (option) => {
    setScore((s) => s + option.points);
    setFeedback(
      option.points > 0
        ? "That was a positive step forward! 🌟"
        : "That might not help your mood — try a different approach next time."
    );

    setTimeout(() => {
      if (index < situations.length - 1) {
        setIndex((i) => i + 1);
        setFeedback("");
      } else {
        setFeedback(`Game Over! Your mood score: ${score + option.points}`);
      }
    }, 1300);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Centered question and options with extra top padding */}
        <View style={[styles.content, { paddingTop: CONTENT_TOP_PADDING }]}>
          <Text style={styles.situation}>{current.situation}</Text>

          {current.options.map((option, i) => (
            <TouchableOpacity
              key={i}
              style={styles.button}
              onPress={() => handleChoice(option)}
            >
              <Text style={styles.buttonText}>{option.text}</Text>
            </TouchableOpacity>
          ))}

          {feedback !== "" && <Text style={styles.feedback}>{feedback}</Text>}
        </View>

        {/* Navigation buttons pinned to bottom */}
        <View style={styles.bottomButtons}>
          <GameButtons navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#1b263b",
  },
  container: {
    flex: 1,
    backgroundColor: "#1b263b",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  situation: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#415a77",
    paddingVertical: 14,
    borderRadius: 10,
    marginVertical: 8,
    width: "85%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  feedback: {
    color: "#e0e1dd",
    fontStyle: "italic",
    marginTop: 20,
    textAlign: "center",
  },
  bottomButtons: {
    alignItems: "center",
    marginBottom: 8,
  },
});
