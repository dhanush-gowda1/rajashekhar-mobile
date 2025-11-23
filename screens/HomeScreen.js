import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rajashekhar Properties</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Buildings")}
      >
        <Text style={styles.buttonText}>View Buildings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("History")}
      >
        <Text style={styles.buttonText}>Payment History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 18,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: { color: "white", textAlign: "center", fontSize: 18 },
});
