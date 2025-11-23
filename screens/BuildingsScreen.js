import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function BuildingsScreen({ navigation }) {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "buildings"), (snap) => {
      setBuildings(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buildings</Text>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("AddBuilding")}
      >
        <Text style={styles.addText}>+ Add Building</Text>
      </TouchableOpacity>

      <FlatList
        data={buildings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Tenants", { building: item })}
          >
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 15 },
  addBtn: {
    backgroundColor: "#28A745",
    padding: 13,
    borderRadius: 10,
    marginBottom: 20,
  },
  addText: { textAlign: "center", color: "white", fontSize: 16 },
  card: {
    backgroundColor: "#EFEFEF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 12,
  },
  name: { fontSize: 20, fontWeight: "600" },
});
