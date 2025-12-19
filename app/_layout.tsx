import {useEffect} from "react";
import {SplashScreen, Stack} from 'expo-router'
import {StatusBar} from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AudioProvider } from "@/contexts/audio/AudioProvider";
import { ThemeProvider } from "@/theme/theme-provider";

export const unstable_settings = {
  // Ensure any route can link back to the specified name
  initialRouteName: 'index',
};


export default function RootLayout() {
  useEffect(() => {
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