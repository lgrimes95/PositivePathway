import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const colors = ["#ffffff", "#fca311", "#e63946", "#a8dadc", "#ff6b6b", "#8338ec"];

export default function PalettePicker({ color, setColor }) {
  return (
    <View style={styles.row}>
      {colors.map((c) => (
        <TouchableOpacity
          key={c}
          style={[
            styles.circle,
            { backgroundColor: c },
            color === c && styles.selected,
          ]}
          onPress={() => setColor(c)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", marginVertical: 10 },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: "#222",
  },
  selected: {
    borderColor: "#fff",
    borderWidth: 3,
  },
});
