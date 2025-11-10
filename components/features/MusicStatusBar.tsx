import React from "react";
import {
  View,
  StatusBar,
  Animated,
  Platform,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  scrollY: Animated.Value;
};

export const MusicStatusBar: React.FC<Props> = ({ scrollY }) => {
  const insets = useSafeAreaInsets();
  const height = Platform.OS === "ios" ? insets.top : StatusBar.currentHeight || 0;
  
  // Interpolate background color and border opacity
  const bgColor = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: ["rgba(255,255,255,0)", "#c2c2c2"],
    extrapolate: "clamp",
  });
  
  const borderOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          height,
          backgroundColor: bgColor,
          borderBottomColor: "#b3b3b3",
          borderBottomWidth: StyleSheet.hairlineWidth,
          opacity: 1,
        },
      ]}
    >
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: StyleSheet.hairlineWidth,
          backgroundColor: "#999",
          opacity: borderOpacity,
        }}
      />
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});
