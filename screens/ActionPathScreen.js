import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const actions = [
  { name: "Go for a walk", points: 10 },
  { name: "Call a friend", points: 8 },
  { name: "Watch favorite show", points: 5 },
  { name: "Stay in bed", points: -5 },
  { name: "Scroll social media", points: -3 }
];

const DepressionGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds
  const [currentAction, setCurrentAction] = useState({});
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    pickAction();

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const pickAction = () => {
    const action = actions[Math.floor(Math.random() * actions.length)];
    setCurrentAction(action);
  };

  const chooseAction = (action) => {
    setScore(prev => prev + action.points);
    pickAction();
  };

  if (gameOver) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Game Over!</Text>
        <Text style={styles.subtitle}>Your mood score: {score}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.actionText}>Choose an action:</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => chooseAction(currentAction)}
      >
        <Text style={styles.buttonText}>{currentAction.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#f0f8ff',
    padding:20
  },
  timer: {
    fontSize:24,
    fontWeight:'bold',
    marginBottom:10
  },
  score: {
    fontSize:20,
    marginBottom:20
  },
  actionText: {
    fontSize:18,
    marginBottom:15
  },
  button: {
    backgroundColor:'#4CAF50',
    padding:15,
    borderRadius:10,
    marginVertical:10,
    width:'80%',
    alignItems:'center'
  },
  buttonText: {
    color:'white',
    fontSize:18
  },
  title: {
    fontSize:28,
    fontWeight:'bold',
    marginBottom:10
  },
  subtitle: {
    fontSize:20
  }
});
