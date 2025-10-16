import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native";
import GameButtons from "../components/GameButtons";

const GRID_SIZE = 5; // 5x5 grid
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;
const SCREEN_WIDTH = Dimensions.get("window").width;
const CELL_SIZE = SCREEN_WIDTH / GRID_SIZE - 12;

export default function ColorYourPathScreen({ navigation }) {
  const [filledCells, setFilledCells] = useState(Array(TOTAL_CELLS).fill(false));

  const handlePress = (index) => {
    setFilledCells((prev) => {
      const newCells = [...prev];
      newCells[index] = true;
      return newCells;
    });
  };

  const renderCell = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.cell,
        { backgroundColor: filledCells[index] ? "#ffffffaa" : "#ffffff33" },
      ]}
      onPress={() => handlePress(index)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Color Your Path</Text>
      <Text style={styles.subtitle}>Game for Anxiety</Text>

      <FlatList
        data={filledCells}
        renderItem={renderCell}
        keyExtractor={(_, index) => index.toString()}
        numColumns={GRID_SIZE}
        contentContainerStyle={styles.grid}
      />

      {/* Shared Buttons */}
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

