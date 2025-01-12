import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Animated, Text } from "react-native";
import { DataProvider } from "../DataContext";

export default function TabLayout() {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = new Animated.Value(-500);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: menuVisible ? 0 : -500,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [menuVisible]);

  const toggleMenu = (tabName) => {
    if (tabName === "menu") {
      setMenuVisible(!menuVisible);
    } else {
      setMenuVisible(false);
    }
  };

  return (
    <DataProvider>
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#a0c334",
            tabBarInactiveTintColor: "#a0c334",
            tabBarStyle: {
              backgroundColor: "#384148",
              zIndex: 100,
              height: 60,
            },
          }}
        >
          <Tabs.Screen
            name="menu"
            options={{
              tabBarButton: (props) => (
                <View
                  {...props}
                  onTouchStart={() => toggleMenu("menu")}
                  style={styles.tabButton}
                >
                  <Ionicons
                    name="grid-sharp"
                    size={22}
                    color="#fff"
                    style={styles.iconMenu}
                  />
                  <Text style={styles.tabLabel}>Menu</Text>
                </View>
              ),
            }}
          />
          <Tabs.Screen
            name="promosi"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={"gift"} color={color} size={24} />
              ),
            }}
          />
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: "#384148" },
                    styles.shadow,
                  ]}
                >
                  <Image
                    source={require("../../assets/images/logo.png")}
                    style={styles.iconImage}
                  />
                </View>
              ),
              tabBarLabel: "Home",
              tabBarLabelStyle: {
                marginTop: -10,
                color: "#fff",
              },
            }}
          />
          <Tabs.Screen
            name="whatsapp"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={"logo-whatsapp"} color={color} size={24} />
              ),
            }}
          />
          <Tabs.Screen
            name="livechat"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={"chatbubble-sharp"} color={color} size={24} />
              ),
            }}
          />
        </Tabs>

        {/* Menu Samping */}
        <Animated.View
          style={[
            styles.sideMenu,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <View style={styles.menuItem}>
            <Ionicons name="gift" size={14} color="#fff" />
            <Text style={styles.menuText}>Hadiah</Text>
          </View>
          <View style={styles.menuItem}>
            <Ionicons name="timer" size={14} color="#fff" />
            <Text style={styles.menuText}>Jadwal</Text>
          </View>
          <View style={styles.menuItem}>
            <Ionicons name="stats-chart" size={14} color="#fff" />
            <Text style={styles.menuText}>RTP</Text>
          </View>
          <View style={styles.menuItem}>
            <Ionicons name="book" size={14} color="#fff" />
            <Text style={styles.menuText}>Syair</Text>
          </View>
          <View style={styles.menuItem}>
            <Ionicons name="link" size={14} color="#fff" />
            <Text style={styles.menuText}>Link Alternatif</Text>
          </View>
          <View style={styles.menuItem}>
            <Ionicons name="notifications" size={14} color="#fff" />
            <Text style={styles.menuText}>Pemberitahuan</Text>
          </View>
          <View style={styles.menuItem}>
            <Ionicons name="call" size={14} color="#fff" />
            <Text style={styles.menuText}>Hubungi Kami</Text>
          </View>
        </Animated.View>
      </View>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 65,
    height: 65,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "#000a21",
    paddingBottom: 5,
  },
  iconImage: {
    width: 40,
    height: 40,
    marginBottom: 7,
    borderRadius: 15,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  sideMenu: {
    position: "absolute",
    bottom: 40,
    left: 0,
    width: 150,
    backgroundColor: "rgba(56, 65, 72, 0.95)",
    borderRadius: 8,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 20,
    zIndex: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  menuText: {
    fontSize: 12,
    marginLeft: 10,
    color: "#fff",
  },
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingVertical: 5,
  },
  tabLabel: {
    fontSize: 9,
    marginTop: 2,
    color: "#a0c334",
  },
  iconMenu: {
    marginTop: 5,
    color: "#a0c334",
  },
});
