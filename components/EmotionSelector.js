import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const emotions = ["stormy", "flat", "buzzing", "hopeful", "numb", "joyful"];

export default function EmotionSelector({ emotion, setEmotion }) {
  return (
    <View>
      <Text style={styles.label}>How do you feel?</Text>
      <View style={styles.row}>
        {emotions.map((e) => (
          <TouchableOpacity
            key={e}
            style={[styles.button, emotion === e && styles.selected]}
            onPress={() => setEmotion(e)}
          >
            <Text style={styles.text}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { color: "#fff", marginBottom: 6, fontWeight: "bold" },
  row: { flexDirection: "row", flexWrap: "wrap" },
  button: {
    padding: 8,
    backgroundColor: "#444",
    borderRadius: 6,
    margin: 4,
  },
  selected: { backgroundColor: "#0077b6" },
  text: { color: "#fff" },
});
