import React, { useRef, useEffect, useCallback, memo } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  ImageBackground,
  NativeSyntheticEvent,
  Animated,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { NativeScrollEvent } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import slideData from "../data/slideData.json";
import { useFonts } from "expo-font";

const { width, height } = Dimensions.get("window");
const ITEM_WIDTH = width;
const ITEM_HEIGHT = height;
const SLIDE_DURATION = 3500;

const images = [
  require("../assets/images/carousel/c1.jpg"),
  require("../assets/images/carousel/c2.jpg"),
  require("../assets/images/carousel/c3.jpg"),
  require("../assets/images/carousel/c4.jpg"),
  require("../assets/images/carousel/c5.jpg"),
];

interface Slide {
  text: string;
  originalIndex: number;
}

const rawData = slideData.slides;
// We only need one clone at the end to bridge the gap back to the start
const infiniteData: Slide[] = [
  ...rawData.map((item, index) => ({ ...item, originalIndex: index })),
  { ...rawData[0], originalIndex: 0 }, // Only one clone at the end
];

const SlideItem = memo(({ text, image }: { text: string; image: any }) => (
  <View style={styles.itemContainer}>
    <ImageBackground source={image} style={styles.image} resizeMode="cover">
      <LinearGradient
        colors={["rgba(255,226,233,0)", "rgba(255,194,204,0.65)"]}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>&quot;{text}&quot;</Text>
      </View>
    </ImageBackground>
  </View>
));

const MemoriesScreen: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const currentIndex = useRef(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const isFocused = useIsFocused();

  const [fontsLoaded] = useFonts({
    Nunito_700Bold: require("../assets/fonts/Nunito-Bold.ttf"),
  });

  const startAnimation = useCallback(() => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: SLIDE_DURATION,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && isFocused) {
        const isAtLastItem = currentIndex.current === rawData.length - 1;

        if (isAtLastItem) {
          // 1. Scroll to the clone (visual continuation)
          flatListRef.current?.scrollToIndex({
            index: rawData.length,
            animated: true,
          });

          // 2. Mid-animation silent reset to actual index 0
          // We wait for the scroll animation to be nearly done, then snap to start
          setTimeout(() => {
            flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
            currentIndex.current = 0;
            startAnimation();
          }, 500); // This matches the default scroll animation duration
        } else {
          const nextIndex = currentIndex.current + 1;
          currentIndex.current = nextIndex;
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          startAnimation();
        }
      }
    });
  }, [isFocused]);

  useEffect(() => {
    if (isFocused && fontsLoaded) {
      startAnimation();
    } else {
      progressAnim.stopAnimation();
    }
    return () => progressAnim.stopAnimation();
  }, [isFocused, fontsLoaded, startAnimation]);

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / ITEM_WIDTH);

    // If user swiped to the clone, snap them back to index 0
    if (index >= rawData.length) {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
      currentIndex.current = 0;
    } else {
      currentIndex.current = index;
    }

    startAnimation();
  };

  if (!fontsLoaded) return <View style={styles.loader} />;

  return (
    <View style={styles.container}>
      <View style={styles.progressTrack}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>

      <FlatList
        ref={flatListRef}
        data={infiniteData}
        renderItem={({ item }) => (
          <SlideItem text={item.text} image={images[item.originalIndex]} />
        )}
        keyExtractor={(_, index) => `item-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollBeginDrag={() => progressAnim.stopAnimation()}
        scrollEventThrottle={16}
        removeClippedSubviews={Platform.OS === "android"}
        // This is key: allow the list to be slightly bouncy to hide the snap
        bounces={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  loader: {
    flex: 1,
    backgroundColor: "#FFE0E7",
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: { width: ITEM_WIDTH, height: ITEM_HEIGHT },
  image: { width: "100%", height: "100%", justifyContent: "flex-end" },
  textContainer: {
    marginBottom: 150,
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "rgba(250,246,248,0.9)",
    alignItems: "center",
    zIndex: 10,
  },
  text: {
    color: "#61313c",
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
    textAlign: "center",
    lineHeight: 24,
  },
  progressTrack: {
    position: "absolute",
    top: 60,
    left: 24,
    right: 24,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    zIndex: 100,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FC8EAC",
    borderRadius: 10,
  },
});

export default MemoriesScreen;
