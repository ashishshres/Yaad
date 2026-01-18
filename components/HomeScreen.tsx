import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useFocusEffect } from "@react-navigation/native";
import ConfettiCannon from "react-native-confetti-cannon";
import appContent from "../data/appContent.json";
import { playBackgroundMusic } from "../utils/backgroundMusic";

const { width } = Dimensions.get("window");

const BirthdayWish = () => {
  const insets = useSafeAreaInsets();
  const { home } = appContent;

  const [fontsLoaded] = useFonts({
    Nunito_400Regular: require("../assets/fonts/Nunito-Regular.ttf"),
    Nunito_SemiBold: require("../assets/fonts/Nunito-SemiBold.ttf"),
    Nunito_700Bold: require("../assets/fonts/Nunito-Bold.ttf"),
    Nunito_800ExtraBold: require("../assets/fonts/Nunito-ExtraBold.ttf"),
    Nunito_BoldItalic: require("../assets/fonts/Nunito-BoldItalic.ttf"),
  });

  const [fireConfetti, setFireConfetti] = useState(false);

  const data = [
    { id: "image", type: "image" },
    { id: "note", type: "note" },
  ];

  const fadeHeader = useRef(new Animated.Value(0)).current;
  const fadeImage = useRef(new Animated.Value(0)).current;
  const fadeNote = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setFireConfetti(true);

    Animated.sequence([
      Animated.timing(fadeHeader, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.delay(200),
      Animated.timing(fadeImage, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.delay(200),
      Animated.timing(fadeNote, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      playBackgroundMusic();
      return () => {};
    }, []),
  );

  if (!fontsLoaded) return <View style={styles.loader} />;

  const renderItem = ({ item }: { item: { id: string; type: string } }) => {
    if (item.type === "image") {
      return (
        <Animated.View
          style={[
            styles.imageCard,
            {
              opacity: fadeImage,
              transform: [
                {
                  translateY: fadeImage.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Image
            source={require("../assets/images/home-image.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.imageBadge}>
            <MaterialIcons name="volunteer-activism" size={16} color="#fff" />
            <Text
              style={[styles.imageBadgeText, { fontFamily: "Nunito_700Bold" }]}
            >
              {home.imageBadge}
            </Text>
          </View>
        </Animated.View>
      );
    }

    if (item.type === "note") {
      return (
        <Animated.View
          style={[
            styles.noteCard,
            {
              opacity: fadeNote,
              transform: [
                {
                  translateY: fadeNote.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <MaterialIcons
            name="format-quote"
            size={120}
            color="rgba(255,146,165,0.08)"
            style={styles.quoteIcon}
          />

          <View style={styles.noteContent}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="favorite" size={26} color="#FF92A5" />
            </View>

            <Text style={[styles.noteTitle, { fontFamily: "Nunito_700Bold" }]}>
              {home.noteTitle}
            </Text>

            {home.noteLines.map((line, index) => (
              <Text
                key={index}
                style={[styles.noteText, { fontFamily: "Nunito_SemiBold" }]}
              >
                {line}
              </Text>
            ))}

            <View
              style={{
                height: 1,
                backgroundColor: "#FFF4F6",
                marginVertical: 0.8,
              }}
            />

            <View style={styles.noteFooter}>
              <Text
                style={[
                  styles.noteFooterText,
                  { fontFamily: "Nunito_700Bold" },
                ]}
              >
                {home.noteFooter}
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Text
                  style={[
                    styles.noteFooterSignature,
                    { fontFamily: "Nunito_BoldItalic" },
                  ]}
                >
                  {home.noteSignature}
                </Text>
                <MaterialCommunityIcons
                  name="heart-plus"
                  size={16}
                  color="#FF92A5"
                />
              </View>
            </View>
          </View>
        </Animated.View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFE0E7" }}>
      <StatusBar backgroundColor="#FFE0E7" barStyle="dark-content" />

      {fireConfetti && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
          }}
        >
          <ConfettiCannon
            count={150}
            origin={{ x: width / 2, y: insets.top }}
            fallSpeed={2500}
            fadeOut
            autoStartDelay={300}
            colors={["#FF92A5", "#FFB3C6", "#FECDD3", "#FF69B4", "#FFFFFF"]}
          />
        </View>
      )}

      <LinearGradient
        colors={["#FFE0E7", "#FFEEF4"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <Animated.View
          style={[
            styles.header,
            {
              paddingTop: insets.top - 20,
              paddingBottom: 14,
              paddingHorizontal: 20,
              opacity: fadeHeader,
              transform: [
                {
                  translateY: fadeHeader.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View>
            <Text style={[styles.dateBadge, { fontFamily: "Nunito_700Bold" }]}>
              {home.dateBadge}
            </Text>
            <Text style={[styles.title, { fontFamily: "Nunito_800ExtraBold" }]}>
              {home.greeting}
            </Text>
            <Text
              style={[
                styles.titleHighlight,
                { fontFamily: "Nunito_800ExtraBold" },
              ]}
            >
              {home.name}
            </Text>
          </View>

          <View style={styles.cakeIcon}>
            <MaterialIcons name="cake" size={26} color="#FF92A5" />
          </View>
        </Animated.View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={1}
          windowSize={5}
          initialNumToRender={1}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: "#FFE0E7",
    justifyContent: "center",
    alignItems: "center",
  },
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateBadge: {
    maxWidth: 100,
    textAlign: "center",
    fontSize: 12,
    color: "#FF92A5",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 6,
  },
  title: { fontSize: 28, color: "#5D2E36" },
  titleHighlight: { fontSize: 28, color: "#FF92A5" },
  cakeIcon: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 999,
    shadowColor: "#FF92A5",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 60 },
  imageCard: {
    width: width - 40,
    height: 192,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 8,
    position: "relative",
  },
  image: { width: "100%", height: "100%", borderRadius: 24 },
  imageBadge: {
    position: "absolute",
    bottom: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  imageBadgeText: { color: "#fff", marginLeft: 4, fontSize: 12 },
  noteCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#FF92A5",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    position: "relative",
  },
  quoteIcon: { position: "absolute", bottom: -20, right: -20 },
  noteContent: { zIndex: 10 },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,146,165,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  noteTitle: { fontSize: 20, color: "#5D2E36", marginBottom: 8 },
  noteText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9F7880",
    marginBottom: 8,
    lineHeight: 24,
  },
  noteFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  noteFooterText: {
    fontSize: 10,
    color: "#FF92A5",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  noteFooterSignature: { fontSize: 12, color: "#5D2E36" },
});

export default BirthdayWish;
