import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function AccessDeniedScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/lock.png")}
        style={{ width: 110, height: 110 }}
      />
      <Text style={styles.title}>Access Restricted</Text>
      <Text style={styles.sub}>You do not have permission to view this page.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginTop: 20 },
  sub: { fontSize: 16, color: "#666", textAlign: "center", marginTop: 8 },
});
