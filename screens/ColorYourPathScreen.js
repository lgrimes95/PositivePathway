// screens/ColorYourPathScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, PanResponder } from "react-native";
import Svg, { Path } from "react-native-svg";
import GameButtons from "../components/GameButtons";

const COLORS = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#6A4C93", "#FF9F1C"];

export default function ColorYourPathScreen({ navigation }) {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState("");
  const [color, setColor] = useState(COLORS[0]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      setCurrentPath(`M${locationX},${locationY}`);
    },
    onPanResponderMove: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      setCurrentPath((prev) => prev + ` L${locationX},${locationY}`);
    },
    onPanResponderRelease: () => {
      setPaths((prev) => [...prev, { d: currentPath, color }]);
      setCurrentPath("");
    },
  });

  const handleClear = () => {
    setPaths([]);
    setCurrentPath("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Color Your Path</Text>

      {/* Color Palette */}
      <View style={styles.palette}>
        {COLORS.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.colorButton, { backgroundColor: c, borderWidth: color === c ? 3 : 0 }]}
            onPress={() => setColor(c)}
          />
        ))}
      </View>

      {/* Drawing Area */}
      <View style={styles.canvas} {...panResponder.panHandlers}>
        <Svg style={{ flex: 1 }}>
          {paths.map((p, i) => (
            <Path key={i} d={p.d} stroke={p.color} strokeWidth={6} fill="none" strokeLinecap="round" />
          ))}
          {currentPath ? <Path d={currentPath} stroke={color} strokeWidth={6} fill="none" strokeLinecap="round" /> : null}
        </Svg>
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <GameButtons navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#2fa659ff",
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  palette: {
    flexDirection: "row",
    marginBottom: 10,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  canvas: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  clearButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#2fa659ff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
