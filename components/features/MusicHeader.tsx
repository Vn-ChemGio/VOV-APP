import React from "react";
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColor } from '@/hooks/useColor';
type Props = {
  scrollY: Animated.Value;
  title?: string;
};

export const MusicHeader: React.FC<Props> = ({ scrollY, title = "Library" }) => {
  const insets = useSafeAreaInsets();
  const red = useColor('red')
  const statusHeight =
    Platform.OS === "ios" ? insets.top : StatusBar.currentHeight || 0;
  
  // Transition background
  const bgColor = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: ["rgba(255,255,255,0)", red],
    extrapolate: "clamp",
  });
  
  // Border opacity
  const borderOpacity = scrollY.interpolate({
    inputRange: [0, 20, 60],
    outputRange: [0, 0.9, 1],
    extrapolate: "clamp",
  });
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingTop: statusHeight,
          backgroundColor: bgColor,
        },
      ]}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Animated.View
        style={[
          styles.borderBottom,
          {
            opacity: borderOpacity,
          },
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    height: 0, // adjust for your header height
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  borderBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#a0a0a0",
  },
});
