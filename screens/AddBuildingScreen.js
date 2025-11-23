import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function AddBuildingScreen({ navigation }) {
  const [name, setName] = useState("");

  const save = async () => {
    if (!name.trim()) return;
    await addDoc(collection(db, "buildings"), { name });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Building</Text>
      <TextInput
        style={styles.input}
        placeholder="Building name"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.btn} onPress={save}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 25 },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 14,
    borderRadius: 8,
    marginBottom: 18,
  },
  btn: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 10,
  },
  btnText: { color: "white", fontSize: 18, textAlign: "center" },
});
