import {useCallback} from 'react'
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-reanimated';
import TrackPlayer from 'react-native-track-player'
import {SplashScreen, Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';

import {ThemeProvider} from '@/theme/theme-provider';
import {FloatingPlayer} from "@/components/features/floating-player";
import {useSetupTrackPlayer} from '@/hooks/useSetupTrackPlayer'
import {useLogTrackPlayerState} from '@/hooks/useLogTrackPlayerState'
import {playbackService} from "@/constants/playbackService";
import {AudioProvider} from "@/contexts/audio/AudioProvider";

SplashScreen.preventAutoHideAsync()
TrackPlayer.registerPlaybackService(() => playbackService)

export default function RootLayout() {
  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync()
  }, [])
  
  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  })
  
  useLogTrackPlayerState()
  
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider>
        <AudioProvider>
          <Stack>
            <Stack.Screen name='index' options={{headerShown: false}}/>
            <Stack.Screen name='profile' options={{
              presentation: 'card',
              gestureEnabled: true,
              gestureDirection: 'vertical',
              animationDuration: 400,
              headerShown: false,
              headerBackButtonDisplayMode: 'generic',
              headerTitle: 'Profile',
            }}/>
            
            <Stack.Screen name='musics' options={{headerShown: false}}/>
            <Stack.Screen name='podcast/index' options={{
              headerShown: false
            }}/>
            <Stack.Screen name='news/index' options={{
              headerShown: false
            }}/>
            <Stack.Screen name='+not-found'/>
          </Stack>
          <StatusBar style='auto'/>
          
          <FloatingPlayer
            style={{
              position: 'absolute',
              left: 8,
              right: 8,
              bottom: 78,
            }}
          />
        </AudioProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
