import React, { useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
  Linking,
} from "react-native";
import { useData } from "../DataContext";

export default function Whatsapp() {
  const { data, loading, error } = useData();

  useEffect(() => {
    const webViewUrl =
      data?.datasettings?.whatsapp || "https://wa.me/6281349679137";

    // Membuka link WhatsApp langsung ketika halaman dimuat
    Linking.openURL(webViewUrl).catch((err) =>
      console.error("Failed to open URL", err)
    );
  }, [data]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ffd33d" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.center}>
      <Text style={styles.text}>Opening WhatsApp...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
  },
});
