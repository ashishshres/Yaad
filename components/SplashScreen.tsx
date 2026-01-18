import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
  Easing,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import appContent from "../data/appContent.json";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const { splash } = appContent;

  const [fontsLoaded] = useFonts({
    Nunito_400Regular: require("../assets/fonts/Nunito-Regular.ttf"),
    Nunito_700Bold: require("../assets/fonts/Nunito-Bold.ttf"),
    Nunito_800ExtraBold: require("../assets/fonts/Nunito-ExtraBold.ttf"),
  });

  const progressAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!fontsLoaded) return;

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 4000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [fontsLoaded, onComplete]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const bounceTransform = {
    transform: [
      {
        translateY: bounceAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
  };

  const pulseScale = { transform: [{ scale: pulseAnim }] };

  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ff8fa3" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#fff4f6", "#ffe7ed"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Animated.View style={[styles.circleContainer, pulseScale]}>
          <View style={styles.circleInner} />
          <ImageBackground
            source={require("../assets/images/splash-image.jpg")}
            style={styles.circleImage}
            resizeMode="cover"
            imageStyle={{ opacity: 0.9 }}
          />
        </Animated.View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{splash.title}</Text>
          <Text style={styles.subtitle}>{splash.subtitle}</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBg}>
            <Animated.View
              style={[styles.progressFill, { width: progressWidth }]}
            >
              <LinearGradient
                colors={["#ff8fa3", "#ffb3c1"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.progressGradient}
              />
            </Animated.View>
          </View>
        </View>
      </View>

      <Animated.View style={[styles.heartContainer, bounceTransform]}>
        <MaterialIcons name="favorite" size={32} color="#ff8fa3" />
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "#fff4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    padding: 24,
    maxWidth: 320,
    width: "100%",
  },
  circleContainer: { alignItems: "center", justifyContent: "center" },
  circleInner: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#ffffff",
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.8)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 10,
  },
  circleImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: "hidden",
  },
  textContainer: { alignItems: "center", gap: 16 },
  title: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 36,
    color: "#4a3b40",
    textAlign: "center",
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: "Nunito_700Bold",
    fontSize: 14,
    color: "#e0576e",
    letterSpacing: 2,
    textTransform: "uppercase",
    opacity: 0.9,
  },
  progressContainer: { width: 128, marginTop: 16 },
  progressBg: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 3, overflow: "hidden" },
  progressGradient: { flex: 1 },
  heartContainer: {
    position: "absolute",
    bottom: 75,
    alignSelf: "center",
    opacity: 0.6,
  },
});

export default SplashScreen;
