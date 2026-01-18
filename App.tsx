import React, { useState, useEffect } from "react";
import { Platform, View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

import SplashScreen from "./components/SplashScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import HomeScreen from "./components/HomeScreen";
import MemoriesScreen from "./components/MemoriesScreen";

const Tab = createBottomTabNavigator();

/* ---------------- TAB ICON ---------------- */

const TabBarIcon = ({ iconName, color, size, focused }: any) => {
  return (
    <View
      style={{
        backgroundColor: focused ? "#FF92A5" : "transparent",
        borderRadius: 25,
        minWidth: 72,
        minHeight: 34,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MaterialIcons
        name={iconName}
        size={size}
        color={focused ? "#FFFFFF" : color}
      />
    </View>
  );
};

/* ---------------- TAB NAVIGATOR ---------------- */

const TabNavigator = () => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular: require("./assets/fonts/Nunito-Regular.ttf"),
    Nunito_700Bold: require("./assets/fonts/Nunito-Bold.ttf"),
    Nunito_800ExtraBold: require("./assets/fonts/Nunito-ExtraBold.ttf"),
  });

  const insets = useSafeAreaInsets();

  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF92A5" />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#FF92A5",
        tabBarInactiveTintColor: "rgba(209,182,187,0.6)",
        tabBarStyle: {
          position: "absolute",
          height: 72 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 6,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: "rgba(255,255,255,1)",
          borderTopColor: "rgba(0,0,0,0.05)",
        },
        tabBarItemStyle: {
          paddingVertical: 6,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            fontFamily: "Nunito_700Bold",
            fontSize: 12,
            marginTop: 4,
          },
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              iconName="home"
              color={color}
              size={22}
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Memories"
        component={MemoriesScreen}
        options={{
          tabBarLabel: "Memories",
          tabBarLabelStyle: {
            fontFamily: "Nunito_700Bold",
            fontSize: 12,
            marginTop: 4,
          },
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              iconName="photo-library"
              color={color}
              size={22}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

/* ---------------- APP ROOT ---------------- */

export default function App() {
  const [stage, setStage] = useState<"splash" | "welcome" | "app">("splash");

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setPositionAsync("absolute");
      NavigationBar.setBackgroundColorAsync("transparent");
      NavigationBar.setButtonStyleAsync("dark");
      NavigationBar.setVisibilityAsync("visible");
    }
  }, []);

  if (stage === "splash") {
    return <SplashScreen onComplete={() => setStage("welcome")} />;
  }

  if (stage === "welcome") {
    return <WelcomeScreen onOpenGift={() => setStage("app")} />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" translucent />
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: "#FFE0E7",
    justifyContent: "center",
    alignItems: "center",
  },
});
