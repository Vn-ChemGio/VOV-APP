import {useEffect} from "react";
import {SplashScreen, Stack} from 'expo-router'
import {StatusBar} from "expo-status-bar";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import TrackPlayer from "react-native-track-player";

import {AudioProvider, setupTrackPlayer, trackPlayerService} from "@/contexts/audio";
import {ThemeProvider} from "@/theme/theme-provider";

export const unstable_settings = {
  // Ensure any route can link back to the specified name
  initialRouteName: 'index',
};

TrackPlayer.registerPlaybackService(() => trackPlayerService);

export default function RootLayout() {
  useEffect(() => {
    setupTrackPlayer();
    SplashScreen.hideAsync()
  }, [])
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider>
        <AudioProvider>
          <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="(features)" options={{headerShown: false}}/>
            <Stack.Screen
              name="profile"
              options={{
                presentation: 'card',
                gestureEnabled: true,
                gestureDirection: 'vertical',
                animationDuration: 400,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="player"
              options={{
                presentation: 'card',
                gestureEnabled: true,
                gestureDirection: 'vertical',
                animationDuration: 400,
                headerShown: false,
              }}
            />
            <Stack.Screen name='+not-found'/>
          </Stack>
          <StatusBar style='auto'/>
        </AudioProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}