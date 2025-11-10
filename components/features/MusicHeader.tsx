import React from "react";
import { Animated, Platform, StatusBar, StyleSheet, } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from 'expo-blur';

type Props = {
  scrollY: Animated.Value;
  title?: string;
};

export const MusicHeader: React.FC<Props> = ({scrollY, title = "Library"}) => {
  const insets = useSafeAreaInsets();
  const statusHeight =
    Platform.OS === "ios" ? insets.top : StatusBar.currentHeight || 0;
  
  // Border opacity
  const borderOpacity = scrollY.interpolate({
    inputRange: [0, 20, 60],
    outputRange: [0, 0.5, 1],
    extrapolate: "clamp",
  });
  
  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingTop: statusHeight,
          opacity: borderOpacity,
        },
      ]}
    >
      <StatusBar translucent backgroundColor="black" barStyle="default"/>
      <BlurView tint="systemChromeMaterial"
                intensity={70}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  overflow: 'hidden',
                }}
      />
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
