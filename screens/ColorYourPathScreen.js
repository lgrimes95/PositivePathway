import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native";
import GameButtons from "../components/GameButtons";

// Grid configuration
const GRID_SIZE = 5;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CELL_SIZE = SCREEN_WIDTH / GRID_SIZE - 12;

// Calming color palette
const COLORS = [
  "#A8DADC", // Light Teal
  "#F4A261", // Soft Orange
  "#E76F51", // Warm Coral
  "#2A9D8F", // Deep Teal
  "#E9C46A", // Muted Yellow
  "#8ECAE6", // Soft Blue
  "#B5E48C", // Light Green
  "#FFDDD2", // Peach
];

export default function ColorYourPathScreen({ navigation }) {
  const [cellColors, setCellColors] = useState(Array(TOTAL_CELLS).fill(null));

  const handlePress = (index) => {
    setCellColors((prev) => {
      const newColors = [...prev];
      // Only set a color if not already set
      if (!newColors[index]) {
        const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        newColors[index] = randomColor;
      }
      return newColors;
    });
  };

  const renderCell = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.cell,
        {
          backgroundColor: cellColors[index]
            ? cellColors[index]
            : "#ffffff33", // Default light background
        },
      ]}
      onPress={() => handlePress(index)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Color Your Path</Text>
      <Text style={styles.subtitle}>Game for Anxiety</Text>

      <FlatList
        data={cellColors}
        renderItem={renderCell}
        keyExtractor={(_, index) => index.toString()}
        numColumns={GRID_SIZE}
        contentContainerStyle={styles.grid}
      />

      <GameButtons navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2fa659ff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    color: "white",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  grid: {
    marginBottom: 40,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    margin: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffffff55",
  },
});

