import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const sizes = [4, 6, 10, 14];

export default function BrushSelector({ brushSize, setBrushSize }) {
  return (
    <View>
      <Text style={styles.label}>Brush Size</Text>
      <View style={styles.row}>
        {sizes.map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.button, brushSize === s && styles.selected]}
            onPress={() => setBrushSize(s)}
          >
            <Text style={styles.text}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "#fff",
    marginBottom: 6,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#444",
    borderRadius: 6,
    marginRight: 10,
  },
  selected: {
    backgroundColor: "#0077b6",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
