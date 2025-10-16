// screens/FeelingScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

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
    setSelected((prev) =>
      prev.includes(feeling) ? prev.filter((f) => f !== feeling) : [...prev, feeling]
    );
  };

  const handleNext = () => {
    if (selected.length === 0) return;

    // Count category selections
    const counts = { Anxiety: 0, Depression: 0, OCD: 0 };
    selected.forEach((f) => {
      const category = feelingsMap[f];
      if (category && counts.hasOwnProperty(category)) {
        counts[category]++;
      } else {
        console.warn(`No category mapping for feeling: "${f}"`);
      }
    });

    // Debug logging — inspect these in Metro / device logs
    console.log("Selected feelings:", selected);
    console.log("Category counts:", counts);

    // Determine winners
    const maxCount = Math.max(...Object.values(counts));
    const topCategories = Object.keys(counts).filter((k) => counts[k] === maxCount);

    let topCategory = null;

    if (topCategories.length === 1) {
      topCategory = topCategories[0];
    } else {
      // Tie: use the category of the most recently selected feeling as tiebreaker
      const lastSelected = selected[selected.length - 1];
      topCategory = feelingsMap[lastSelected];

      // If for some reason that mapping is undefined or not part of topCategories, pick first topCategory
      if (!topCategory || !topCategories.includes(topCategory)) {
        topCategory = topCategories[0];
      }
    }

    // Map category to exact screen name registered in your navigator
    const gameMap = {
      OCD: "PatternPathways",      // make sure this matches the screen name in App.js
      Depression: "ActionPath",    // make sure this matches the screen name in App.js
      Anxiety: "ColorYourPath",    // make sure this matches the screen name in App.js
    };

    const gameName = gameMap[topCategory];

    console.log("Top category:", topCategory, "-> gameName:", gameName);

    if (!gameName) {
      // Defensive fallback: show an error so you know something is wrong
      Alert.alert(
        "Navigation error",
        `Couldn't determine which game to open. topCategory=${topCategory}`
      );
      return;
    }

    // Show an alert (so you see the chosen game) then navigate
    Alert.alert("Selected Game", `Opening ${gameName}`, [
      {
        text: "OK",
        onPress: () => navigation.navigate(gameName),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>How are you feeling?</Text>

      <ScrollView contentContainerStyle={styles.feelingsContainer}>
        {Object.keys(feelingsMap).map((feeling) => {
          const isSelected = selected.includes(feeling);
          return (
            <TouchableOpacity
              key={feeling}
              style={[styles.feelingButton, isSelected && styles.selectedFeeling]}
              onPress={() => toggleFeeling(feeling)}
            >
              <Text style={[styles.feelingText, isSelected && styles.selectedFeelingText]}>
                {feeling}
              </Text>
            </TouchableOpacity>
          );
        })}
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
