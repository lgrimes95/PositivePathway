// screens/FeelingScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  Platform,
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
      prev.includes(feeling)
        ? prev.filter((f) => f !== feeling)
        : [...prev, feeling]
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
      }
    });

    // Determine top category
    const maxCount = Math.max(...Object.values(counts));
    const topCategories = Object.keys(counts).filter(
      (k) => counts[k] === maxCount
    );

    let topCategory = null;
    if (topCategories.length === 1) {
      topCategory = topCategories[0];
    } else {
      const lastSelected = selected[selected.length - 1];
      topCategory = feelingsMap[lastSelected] || topCategories[0];
    }

    // Map category to screen name
    const gameMap = {
      OCD: "PatternPathways",
      Depression: "ActionPath",
      Anxiety: "ColorYourPath",
    };

    const gameName = gameMap[topCategory];

    if (!gameName) {
      Alert.alert(
        "Navigation error",
        `Couldn't determine which game to open. topCategory=${topCategory}`
      );
      return;
    }

    // Navigate differently for web vs mobile
    if (Platform.OS === "web") {
      navigation.navigate(gameName);
    } else {
      Alert.alert("Selected Game", `Opening ${gameName}`, [
        {
          text: "OK",
          onPress: () => navigation.navigate(gameName),
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.question}>How are you feeling?</Text>

        <ScrollView
          contentContainerStyle={styles.feelingsContainer}
          showsVerticalScrollIndicator={false}
        >
          {Object.keys(feelingsMap).map((feeling) => {
            const isSelected = selected.includes(feeling);
            return (
              <TouchableOpacity
                key={feeling}
                style={[
                  styles.feelingButton,
                  isSelected && styles.selectedFeeling,
                ]}
                onPress={() => toggleFeeling(feeling)}
              >
                <Text
                  style={[
                    styles.feelingText,
                    isSelected && styles.selectedFeelingText,
                  ]}
                >
                  {feeling}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              { opacity: selected.length ? 1 : 0.5 },
            ]}
            onPress={handleNext}
            disabled={selected.length === 0}
          >
            <Text style={styles.nextText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#2fa659ff",
  },
  container: {
    flex: 1,
    backgroundColor: "#2fa659ff",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginVertical: 30,
    textAlign: "center",
  },
  feelingsContainer: {
    alignItems: "center",
    paddingBottom: 60,
  },
  feelingButton: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginVertical: 6,
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
  buttonContainer: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButton: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  nextText: {
    color: "#2fa659ff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
