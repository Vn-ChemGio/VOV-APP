import {useEffect} from "react";
import {SplashScreen, Stack} from 'expo-router'
import {StatusBar} from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AudioProvider } from "@/contexts/audio/AudioProvider";
import { ThemeProvider } from "@/theme/theme-provider";
import {setAudioModeAsync} from "expo-audio";

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

export const unstable_settings = {
  // Ensure any route can link back to the specified name
  initialRouteName: 'index',
};


// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

export default function RootLayout() {
  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: 'doNotMix', // string for expo-audio (see expo docs)
    }).then();
    
    SplashScreen.hideAsync()
  },[])
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