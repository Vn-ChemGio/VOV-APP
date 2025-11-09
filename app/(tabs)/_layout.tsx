import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { PlatformPressable } from '@react-navigation/elements';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Tabs } from 'expo-router';
import { Home, Stars } from 'lucide-react-native';
import { useColor } from '@/hooks/useColor';
import { Icon } from '@/components/ui/icon';
import { FloatingPlayer } from '@/components/features/floating-player';

export default function TabLayout() {
  const primary = useColor('primary');
  const secondary = useColor('card');
  
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: primary,
          headerShown: false,
          tabBarButton: (props) => (
            <PlatformPressable
              {...props}
              onPressIn={(ev) => {
                if (process.env.EXPO_OS === 'ios') {
                  // Add a soft haptic feedback when pressing down on the tabs.
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }
                props.onPressIn?.(ev);
              }}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderTopWidth: 0,
              paddingTop: 8,
            },
            default: {
              position: 'absolute',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderTopWidth: 0,
              paddingTop: 8,
            },
          }),
          tabBarBackground: () => (
            <BlurView
              tint="systemChromeMaterial"
              intensity={95}
              style={{
                ...StyleSheet.absoluteFillObject,
                overflow: 'hidden',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({color}) => (
              <Icon name={Home} size={24} color={color}/>
            ),
          }}
        />
        
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({color}) => (
              <Icon name={Stars} size={24} color={color}/>
            ),
          }}
        />
      </Tabs>
      <FloatingPlayer
        style={{
          backgroundColor: secondary,
          position: 'absolute',
          left: 8,
          right: 8,
          bottom: 78,
        }}
      />
    </>
  );
}
