import React from "react";
import { Animated, StatusBar, StyleSheet, } from "react-native";
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

const LOGO_HEADER_HEIGHT = 40;
const HEADER_PADDING_VERTICAL = 4;
const HEADER_PADDING_TOP = 12;
const HEADER_HEIGHT = LOGO_HEADER_HEIGHT + HEADER_PADDING_VERTICAL * 2;

const AppHeaderStickyAnimation: React.FC<Props> = ({scrollY}) => {
  
  const insets = useSafeAreaInsets();
  const borderColor = useColor('border');
  
  // Header opacity
  const opacity = scrollY.interpolate({
    inputRange: [0, HEADER_PADDING_TOP + HEADER_HEIGHT, HEADER_PADDING_TOP + HEADER_HEIGHT * 3/2],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });
  
  const translateY = scrollY.interpolate({
    inputRange: [0, HEADER_PADDING_TOP + HEADER_HEIGHT, HEADER_PADDING_TOP + HEADER_HEIGHT * 3/2],
    outputRange: [-HEADER_HEIGHT, -HEADER_HEIGHT, 0],
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
            transform: [{translateY}],
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


const AppHeaderScrollAnimation: React.FC<Props> = ({scrollY}) => {
  const mainBackgroundColor = useColor('background');
  const borderColor = useColor('border');
  
  const {top} = useSafeAreaInsets();
  
  const scrollHeaderOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_PADDING_TOP, HEADER_PADDING_TOP + HEADER_HEIGHT/2,  HEADER_PADDING_TOP + HEADER_HEIGHT],
    outputRange: [1, 1, 0.8, 0],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View style={[{
      paddingBottom: HEADER_PADDING_VERTICAL,
      paddingTop: top + HEADER_PADDING_TOP,
      paddingHorizontal: 16,
      backgroundColor: mainBackgroundColor,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
    }, {
      opacity: scrollHeaderOpacity,
    }]}
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
        }}>
          <Image
            source={require('@/assets/images/logo-square.png')}
            width={40}
            height={40}
            variant="rounded"
            containerStyle={{borderWidth: 1, borderColor: borderColor, padding: 4}}
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
});
export {AppHeaderStickyAnimation, AppHeaderScrollAnimation};