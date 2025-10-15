import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const feelingsMap = {
  Anxious: "Anxiety",
  Stressed: "OCD",
  Shame: "Depression",
  Irritable: "Anxiety",
  Overwhelmed: "Anxiety",
  Jittery: "OCD",
  Sad: "Depression",
  Angry: "Depression",
  Trapped: "OCD",
  Tired: "Anxiety",
  Guilt: "Depression",
  Unfocused: "OCD",
};

export default function FeelingScreen({ navigation }) {
  const [selected, setSelected] = useState([]);

  const toggleFeeling = (feeling) => {
    if (selected.includes(feeling)) {
      setSelected(selected.filter((item) => item !== feeling));
    } else {
      setSelected([...selected, feeling]);
    }
  };

  const handleNext = () => {
    if (selected.length === 0) return;

    // Count category selections
    const counts = { Anxiety: 0, Depression: 0, OCD: 0 };

    selected.forEach((f) => {
      const category = feelingsMap[f];
      counts[category]++;
    });

    // Determine the dominant category
    const topCategory = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];

    // Map category to game name
    const gameMap = {
      OCD: "PatternPathways",
      Depression: "ActionPath",
      Anxiety: "Color Your Path",
    };

    const gameName = gameMap[topCategory];

    // Navigate to the game screen and pass the name
    navigation.navigate("Game", { gameName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>How are you feeling?</Text>

      <ScrollView contentContainerStyle={styles.feelingsContainer}>
        {Object.keys(feelingsMap).map((feeling) => (
          <TouchableOpacity
            key={feeling}
            style={[
              styles.feelingButton,
              selected.includes(feeling) && styles.selectedFeeling,
            ]}
            onPress={() => toggleFeeling(feeling)}
          >
            <Text
              style={[
                styles.feelingText,
                selected.includes(feeling) && styles.selectedFeelingText,
              ]}
            >
              {feeling}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.nextButton, { opacity: selected.length ? 1 : 0.5 }]}
        onPress={handleNext}
        disabled={selected.length === 0}
      >
        <Text style={styles.nextText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2fa659ff",
    alignItems: "center",
    paddingTop: 100,
  },
  question: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },
  feelingsContainer: {
    alignItems: "center",
    paddingBottom: 100,
  },
  feelingButton: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginVertical: 8,
  },
  selectedFeeling: {
    backgroundColor: "white",
  },
  feelingText: {
    color: "white",
    fontSize: 18,
  },
  selectedFeelingText: {
    color: "#2fa659ff",
    fontWeight: "bold",
  },
  nextButton: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  nextText: {
    color: "#2fa659ff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
