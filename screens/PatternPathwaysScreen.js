import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import GameButtons from "../components/GameButtons";

const COLORS = ["#FF6B6B", "#4ECDC4", "#FFD93D"]; // red, teal, yellow

// Generate a random color grid
function generateTargetGrid(size = 3) {
  const grid = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
    }
    grid.push(row);
  }
  return grid;
}

function cloneGrid(grid) {
  return grid.map((row) => [...row]);
}

export default function PatternPathwaysScreen({ navigation }) {
  const puzzles = [
    { id: 1, size: 3 },
    { id: 2, size: 4 },
    { id: 3, size: 5 },
  ];

  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [targetGrid, setTargetGrid] = useState(
    generateTargetGrid(puzzles[0].size)
  );
  const [playerGrid, setPlayerGrid] = useState(
    Array(puzzles[0].size)
      .fill(null)
      .map(() => Array(puzzles[0].size).fill(COLORS[0]))
  );

  const handleTilePress = (row, col) => {
    setPlayerGrid((prevGrid) => {
      const newGrid = cloneGrid(prevGrid);
      const currentColorIndex = COLORS.indexOf(newGrid[row][col]);
      newGrid[row][col] = COLORS[(currentColorIndex + 1) % COLORS.length];
      return newGrid;
    });
  };

  const checkPuzzle = () => {
    for (let i = 0; i < targetGrid.length; i++) {
      for (let j = 0; j < targetGrid.length; j++) {
        if (playerGrid[i][j] !== targetGrid[i][j]) return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (checkPuzzle()) {
      if (currentPuzzleIndex < puzzles.length - 1) {
        Alert.alert("🎉 Great job!", "You solved the puzzle!", [
          {
            text: "Next Puzzle",
            onPress: () => {
              const nextIndex = currentPuzzleIndex + 1;
              const nextSize = puzzles[nextIndex].size;
              setCurrentPuzzleIndex(nextIndex);
              setTargetGrid(generateTargetGrid(nextSize));
              setPlayerGrid(
                Array(nextSize)
                  .fill(null)
                  .map(() => Array(nextSize).fill(COLORS[0]))
              );
            },
          },
        ]);
      } else {
        Alert.alert(
          "🏆 Amazing!",
          "You completed all color puzzles!",
          [
            {
              text: "Play Again",
              onPress: () => {
                setCurrentPuzzleIndex(0);
                setTargetGrid(generateTargetGrid(puzzles[0].size));
                setPlayerGrid(
                  Array(puzzles[0].size)
                    .fill(null)
                    .map(() => Array(puzzles[0].size).fill(COLORS[0]))
                );
              },
            },
          ]
        );
      }
    } else {
      Alert.alert("❌ Not quite", "Try again!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pattern Pathways</Text>
      <Text style={styles.instruction}>
        Puzzle {currentPuzzleIndex + 1} of {puzzles.length}
      </Text>

      <Text style={styles.instruction}>Match the target colors:</Text>

      {/* Target Preview */}
      <View style={styles.grid}>
        {targetGrid.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((color, j) => (
              <View
                key={j}
                style={[styles.previewTile, { backgroundColor: color }]}
              />
            ))}
          </View>
        ))}
      </View>

      <Text style={styles.instruction}>Your grid:</Text>

      {/* Player Grid */}
      <View style={styles.grid}>
        {playerGrid.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((color, j) => (
              <TouchableOpacity
                key={j}
                style={[styles.tile, { backgroundColor: color }]}
                onPress={() => handleTilePress(i, j)}
              />
            ))}
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Check Puzzle</Text>
      </TouchableOpacity>

      <GameButtons navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#2fa659ff",
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  instruction: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  grid: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  previewTile: {
    width: 30,
    height: 30,
    margin: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "white",
  },
  tile: {
    width: 60,
    height: 60,
    margin: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
  },
  submitButton: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
  },
  submitText: {
    color: "#2fa659ff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
