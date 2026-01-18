import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
  Pressable,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import appContent from "../data/appContent.json";

interface WelcomeScreenProps {
  onOpenGift: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onOpenGift }) => {
  const { welcome } = appContent;

  const [fontsLoaded] = useFonts({
    Nunito_400Regular: require("../assets/fonts/Nunito-Regular.ttf"),
    Nunito_700Bold: require("../assets/fonts/Nunito-Bold.ttf"),
    Nunito_800ExtraBold: require("../assets/fonts/Nunito-ExtraBold.ttf"),
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const heartAnim = useRef(new Animated.Value(1)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (fontsLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.bezier(0.2, 0.8, 0.2, 1),
        useNativeDriver: true,
      }).start();

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

      Animated.loop(
        Animated.sequence([
          Animated.timing(heartAnim, {
            toValue: 1.1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(heartAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return <View style={styles.loader} />;

  const fadeTransform = {
    opacity: fadeAnim,
    transform: [
      {
        translateY: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  };

  const pulseScale = { transform: [{ scale: pulseAnim }] };
  const heartTransform = { transform: [{ scale: heartAnim }] };
  const buttonPress = buttonScale.interpolate({
    inputRange: [0.96, 1, 1.03],
    outputRange: [0.96, 1, 1.03],
  });

  return (
    <LinearGradient
      colors={["#fbebf5", "#feedf4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Animated.View style={[styles.content, fadeTransform]}>
        <View style={styles.imageSection}>
          <Animated.View style={[styles.imageContainer, pulseScale]}>
            <View style={styles.imageInner} />
            <ImageBackground
              source={require("../assets/images/welcome-image.jpg")}
              style={styles.imageOverlay}
              resizeMode="cover"
              fadeDuration={0}
              imageStyle={{ borderRadius: 100 }}
            />
          </Animated.View>
          <Animated.View style={[styles.heartIcon, heartTransform]}>
            <MaterialIcons name="favorite" size={24} color="#FF8FA3" />
          </Animated.View>
        </View>

        <Animated.View style={[styles.textContainer, fadeTransform]}>
          <Text style={styles.title}>{welcome.title}</Text>
          <Text style={styles.titleSpan}>
            <Text style={styles.gradientText}>{welcome.name}</Text>
          </Text>
          <Text style={styles.subtitle}>{welcome.subtitle}</Text>
        </Animated.View>
      </Animated.View>

      <Animated.View style={[styles.buttonContainer, fadeTransform]}>
        <Pressable
          onPressIn={() =>
            Animated.spring(buttonScale, {
              toValue: 0.96,
              useNativeDriver: true,
            }).start()
          }
          onPressOut={() =>
            Animated.spring(buttonScale, {
              toValue: 1.03,
              useNativeDriver: true,
              tension: 100,
            }).start()
          }
          onPress={onOpenGift}
        >
          <Animated.View
            style={[styles.button, { transform: [{ scale: buttonPress }] }]}
          >
            <LinearGradient
              colors={["#FF9AA2", "#FECFEF"]}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>{welcome.buttonText}</Text>
            </LinearGradient>
          </Animated.View>
        </Pressable>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  loader: { flex: 1, backgroundColor: "#fbebf5" },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
    padding: 20,
    maxWidth: 320,
    width: "100%",
  },
  imageSection: { position: "relative" },
  imageContainer: {
    position: "relative",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: "#FFFFFF",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 12,
  },
  imageInner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
  },
  imageOverlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 },
  heartIcon: {
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    height: 42,
    width: 42,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 192, 203, 0.1)",
  },
  textContainer: { alignItems: "center", gap: 12, paddingHorizontal: 8 },
  title: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 36,
    color: "#4A304D",
    textAlign: "center",
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  titleSpan: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 36,
    color: "#4A304D",
    textAlign: "center",
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  gradientText: {
    color: "#FF69B4",
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 36,
  },
  subtitle: {
    fontFamily: "Nunito_700Bold",
    fontSize: 18,
    color: "#7D6D80",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 280,
    marginTop: 8,
    letterSpacing: 0.5,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 48,
    left: 0,
    right: 0,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  button: {
    width: "100%",
    maxWidth: 300,
    borderRadius: 9999,
    overflow: "hidden",
    marginBottom: 28,
  },
  buttonGradient: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 35,
    elevation: 5,
  },
  buttonText: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 20,
    color: "#5D4037",
    letterSpacing: 0.5,
  },
});

export default WelcomeScreen;
