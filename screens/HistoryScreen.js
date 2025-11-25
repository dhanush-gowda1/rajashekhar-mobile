import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function HistoryScreen() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "history"),
      orderBy("date", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setList(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment History</Text>

      <FlatList
        data={list}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.tenantName}</Text>
            <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
            <Text style={styles.amount}>₹{item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 22 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  name: { fontSize: 18, fontWeight: "600" },
  date: { fontSize: 14, color: "#666" },
  amount: { fontSize: 18, fontWeight: "700", marginTop: 5 },
});
