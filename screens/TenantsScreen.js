import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function TenantsScreen({ route, navigation }) {
  const { building } = route.params;
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "tenants"),
      where("buildingId", "==", building.id)
    );
    const unsub = onSnapshot(q, (snap) => {
      setTenants(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{building.name}</Text>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate("AddTenant", { building })}
      >
        <Text style={styles.addText}>+ Add Tenant</Text>
      </TouchableOpacity>

      <FlatList
        data={tenants}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("EditTenant", { tenant: item })}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.sub}>Rent ₹{item.rent}/month</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  addBtn: {
    backgroundColor: "#28A745",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  addText: { color: "white", textAlign: "center", fontSize: 16 },
  card: {
    backgroundColor: "#F1F1F1",
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
  },
  name: { fontSize: 20, fontWeight: "600" },
  sub: { fontSize: 14, color: "#666", marginTop: 3 },
});
