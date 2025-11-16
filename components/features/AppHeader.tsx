import React from "react";
import { Animated, Platform, StatusBar, StyleSheet, } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from 'expo-blur';
import { useColor } from '@/hooks/useColor';
import { View } from '@/components/ui/view';
import { Image } from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { ModeToggle } from '@/components/ui/mode-toggle';

type Props = {
  scrollY: Animated.Value;
  title?: string;
};


const AppHeader: React.FC<Props> = ({scrollY}) => {
  const insets = useSafeAreaInsets();
  const borderColor = useColor('border');
  
  // Header opacity
  const opacity = scrollY.interpolate({
    inputRange: [0, 24, 32],
    outputRange: [0, 0.05, 1],
    extrapolate: "clamp",
  });
  
  return (
    <>
      <Animated.View
        style={[
          styles.container,
          {height: insets.top + 48 + 8},
          {
            paddingTop: insets.top,
            opacity,
          },
        ]}
      >
        <StatusBar translucent backgroundColor="auto" barStyle="default"/>
        <BlurView tint="systemChromeMaterial"
                  intensity={90}
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    overflow: 'hidden',
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: borderColor,
                    paddingTop: insets.top
                  }}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 8,
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 12
            }}
            
            >
              <Image
                source={require('@/assets/images/logo-square.png')}
                width={40}
                height={40}
                variant="rounded"
                containerStyle={{borderWidth: 1, borderColor, padding: 4}}
              />
              <View style={{gap: 2}}>
                <Text style={{fontSize: 16}}>
                  VOV - Đài Tiếng nói Việt Nam
                </Text>
                <Text variant="caption" style={{fontSize: 12}}>
                  Welcome, Wind Blade!
                </Text>
              </View>
            </View>
            <ModeToggle/>
          </View>
        </BlurView>
      </Animated.View>
    
    </>
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
});
export default AppHeader;