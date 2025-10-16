import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Canvas, Path, Skia, useTouchHandler, useValue, Group } from "@shopify/react-native-skia";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EmotionSelector from "../components/EmotionSelector";
import PalettePicker from "../components/PalettePicker";
import BrushSelector from "../components/BrushSelector";
import { getPromptForEmotion } from "../utils/prompts";

export default function ColorYourPathScreen() {
  const [emotion, setEmotion] = useState("stormy");
  const [color, setColor] = useState("#ffffff");
  const [brushSize, setBrushSize] = useState(6);
  const [paths, setPaths] = useState([]);
  const [prompt, setPrompt] = useState("");
  const pathRef = useValue(null);

  const onTouch = useTouchHandler({
    onStart: ({ x, y }) => {
      const path = Skia.Path.Make();
      path.moveTo(x, y);
      pathRef.current = { path, color, brushSize };
      setPaths((prev) => [...prev, { path, color, brushSize }]);
    },
    onActive: ({ x, y }) => {
      if (pathRef.current) {
        pathRef.current.path.lineTo(x, y);
      }
    },
  });

  const saveToArchive = async () => {
    const data = {
      id: Date.now(),
      emotion,
      prompt,
      date: new Date().toLocaleString(),
    };
    try {
      const existing = await AsyncStorage.getItem("@archive");
      const archive = existing ? JSON.parse(existing) : [];
      archive.push(data);
      await AsyncStorage.setItem("@archive", JSON.stringify(archive));
      Alert.alert("Saved!", "Your emotional painting was saved to your archive.");
    } catch (error) {
      Alert.alert("Error", "Could not save.");
    }
  };

  const handleReflect = () => {
    const newPrompt = getPromptForEmotion(emotion);
    setPrompt(newPrompt);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Color Your Path</Text>

        <EmotionSelector emotion={emotion} setEmotion={setEmotion} />
        <PalettePicker color={color} setColor={setColor} />
        <BrushSelector brushSize={brushSize} setBrushSize={setBrushSize} />

        <Canvas style={styles.canvas} onTouch={onTouch}>
          <Group>
            {paths.map((p, i) => (
              <Path
                key={i}
                path={p.path}
                color={p.color}
                style="stroke"
                strokeWidth={p.brushSize}
              />
            ))}
          </Group>
        </Canvas>

        {prompt !== "" && (
          <View style={styles.promptBox}>
            <Text style={styles.promptText}>{prompt}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleReflect}>
          <Text style={styles.buttonText}>Reflect with Insight</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: "#6a994e" }]} onPress={saveToArchive}>
          <Text style={styles.buttonText}>Save to Archive</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: "#bc4749" }]} onPress={() => setPaths([])}>
          <Text style={styles.buttonText}>Clear Canvas</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1e1e1e", padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  canvas: {
    height: 400,
    backgroundColor: "#333",
    borderRadius: 12,
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#0077b6",
    padding: 14,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  promptBox: {
    backgroundColor: "#264653",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  promptText: {
    color: "#f1faee",
    fontStyle: "italic",
  },
});
