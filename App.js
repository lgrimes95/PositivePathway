import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
     <Text style={styles.welcomeText}>Welcome to PositivePathways</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2fa659ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 32,         // Bigger text
    fontWeight: 'bold',   // Makes it bold
    color: 'white',       // (optional) Makes text stand out more
    textAlign: 'center',  // Centers multi-line text
  },
});