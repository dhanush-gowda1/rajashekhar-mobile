import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function EditTenantScreen({ route, navigation }) {
  const { tenant } = route.params;
  const [name, setName] = useState(tenant.name);
  const [rent, setRent] = useState(String(tenant.rent));

  const update = async () => {
    await updateDoc(doc(db, "tenants", tenant.id), {
      name,
      rent: Number(rent),
    });
    navigation.goBack();
  };

  const remove = async () => {
    Alert.alert("Delete Tenant?", "This cannot be undone", [
      { text: "Cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteDoc(doc(db, "tenants", tenant.id));
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Tenant</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        value={rent}
        onChangeText={setRent}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.saveBtn} onPress={update}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteBtn} onPress={remove}>
        <Text style={styles.deleteText}>Delete Tenant</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  saveBtn: {
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  saveText: { color: "white", textAlign: "center", fontSize: 18 },
  deleteBtn: {
    backgroundColor: "#D9534F",
    padding: 15,
    borderRadius: 10,
  },
  deleteText: { color: "white", textAlign: "center", fontSize: 18 },
});
