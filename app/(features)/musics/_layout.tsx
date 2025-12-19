import React from "react";
import {Platform, StyleSheet} from 'react-native'
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {PlatformPressable} from "@react-navigation/elements";
import * as Haptics from 'expo-haptics';
import {BlurView} from 'expo-blur'
import {Tabs} from 'expo-router'

import {colors, fontSize} from '@/constants/tokens'
import {FontAwesome6, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import {AudioFloatingPlayer} from "@/views/audio-player";

const TabsNavigation = () => {
  const {bottom} = useSafeAreaInsets();
  
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarLabelStyle: {
            fontSize: fontSize.xs,
            fontWeight: '500',
          },
          headerShown: false,
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
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              borderTopWidth: 0,
            },
          }),
          tabBarBackground: () => {
            if (Platform.OS === 'ios') {
              return (
                <BlurView
                  tint='systemChromeMaterial'
                  intensity={100}
                  style={{
                    ...StyleSheet.absoluteFillObject,
                    overflow: 'hidden',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                />
              );
            }
            
            // On Android & Web: no background
            return null;
          },
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
        }}
      >
        <Tabs.Screen
          name="categories"
          options={{
            title: 'Danh mục',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="playlist-play" size={28} color={color}/>
            ),
          }}
        />
        <Tabs.Screen
          name="(songs)"
          options={{
            title: 'Bài hát',
            tabBarIcon: ({color}) => (
              <Ionicons name="musical-notes-sharp" size={24} color={color}/>
            ),
          }}
        />
        <Tabs.Screen
          name="artists"
          options={{
            title: 'Ca sĩ',
            tabBarIcon: ({color}) => <FontAwesome6 name="users-line" size={20} color={color}/>,
          }}
        />
      </Tabs>
      <AudioFloatingPlayer
        style={{
          position: 'absolute',
          left: 8,
          right: 8,
          bottom: Math.max(bottom, 72),
        }}
      />
    </>
  )
}

export default TabsNavigation
