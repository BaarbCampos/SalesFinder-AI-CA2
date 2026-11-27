import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import { sendMessageToAI } from "../services/api";

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export default function AIAssistantScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: "Hi! I'm your SalesFinder AI beauty assistant. How can I help you today?",
      sender: "ai"
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const message = input.trim();

    if (!message || loading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "user"
    };

    setMessages(previous => [...previous, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessageToAI(message);

      setMessages(previous => [
        ...previous,
        {
          id: (Date.now() + 1).toString(),
          text: reply,
          sender: "ai"
        }
      ]);
    } catch (error) {
      setMessages(previous => [
        ...previous,
        {
          id: (Date.now() + 1).toString(),
          text: error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
          sender: "ai"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.title}>AI Beauty Assistant</Text>
        <Text style={styles.subtitle}>
          Your personal beauty shopping assistant
        </Text>
      </View>

      <ScrollView
        style={styles.chat}
        contentContainerStyle={styles.chatContent}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map(message => (
          <View
            key={message.id}
            style={[
              styles.message,
              message.sender === "user"
                ? styles.userMessage
                : styles.aiMessage
            ]}
          >
            <Text
              style={[
                styles.messageText,
                message.sender === "user"
                  ? styles.userText
                  : styles.aiText
              ]}
            >
              {message.text}
            </Text>
          </View>
        ))}

        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="small" color="#8B5E83" />
            <Text style={styles.loadingText}>SalesFinder AI is thinking...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask about skincare, makeup or perfume..."
          placeholderTextColor="#999"
          multiline
          maxLength={1000}
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.sendButton, loading && styles.disabledButton]}
          onPress={handleSend}
          disabled={loading || !input.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9FC"
  },
  header: {
    padding: 22,
    backgroundColor: "#F5E8F0"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#56384E"
  },
  subtitle: {
    marginTop: 5,
    color: "#765D70",
    fontSize: 14
  },
  chat: {
    flex: 1
  },
  chatContent: {
    padding: 16,
    gap: 12
  },
  message: {
    maxWidth: "85%",
    padding: 14,
    borderRadius: 18
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#8B5E83",
    borderBottomRightRadius: 4
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#F0E7EE",
    borderBottomLeftRadius: 4
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22
  },
  userText: {
    color: "#FFFFFF"
  },
  aiText: {
    color: "#3D303A"
  },
  loading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10
  },
  loadingText: {
    color: "#765D70",
    fontSize: 13
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEE5EB"
  },
  input: {
    flex: 1,
    minHeight: 45,
    maxHeight: 100,
    backgroundColor: "#F7F2F5",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14
  },
  sendButton: {
    backgroundColor: "#8B5E83",
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 14
  },
  disabledButton: {
    opacity: 0.5
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold"
  }
});
