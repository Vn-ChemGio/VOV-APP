import {colors, fontSize} from '@/constants/tokens'
import {FontAwesome6, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import {BlurView} from 'expo-blur'
import {Tabs} from 'expo-router'
import {StyleSheet} from 'react-native'
import {AudioFloatingPlayer} from "@/views/audio-player";
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";

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
          tabBarStyle: {
            position: 'absolute',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 0,
            paddingTop: 8,
          },
          tabBarBackground: () => (
            <BlurView
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
