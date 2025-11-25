import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function AddTenantScreen({ route, navigation }) {
  const { building } = route.params;
  const [name, setName] = useState("");
  const [rent, setRent] = useState("");

  const save = async () => {
    if (!name.trim() || !rent.trim()) return;

    await addDoc(collection(db, "tenants"), {
      name,
      rent: Number(rent),
      buildingId: building.id,
      paid: false,
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Tenant</Text>

      <TextInput
        style={styles.input}
        placeholder="Tenant Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Monthly Rent (₹)"
        keyboardType="numeric"
        value={rent}
        onChangeText={setRent}
      />

      <TouchableOpacity style={styles.btn} onPress={save}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 14,
    marginBottom: 15,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
  },
  btnText: { color: "white", textAlign: "center", fontSize: 18 },
});
