import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import AIAssistantScreen from "./src/screens/AIAssistantScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<"home" | "assistant">("home");

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {currentScreen === "home" ? (
        <HomeScreen onOpenAssistant={() => setCurrentScreen("assistant")} />
      ) : (
        <>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentScreen("home")}
          >
            <Text style={styles.backText}>← Back to Home</Text>
          </TouchableOpacity>
          <AIAssistantScreen />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF8F5",
  },
  backButton: {
    padding: 14,
    backgroundColor: "#F5E8F0",
  },
  backText: {
    color: "#65483F",
    fontWeight: "bold",
    fontSize: 15,
  },
});
