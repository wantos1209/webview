import React from "react";
import { WebView } from "react-native-webview";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useData } from "../DataContext";

export default function Livechat() {
  const { data, loading, error } = useData();
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

  const webViewUrl =
    data?.datasettings?.livechat ||
    "https://secure.livechatenterprise.com/licence/7760411/v2/open_chat.cgi";

  return <WebView style={styles.container} source={{ uri: webViewUrl }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
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
