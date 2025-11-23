import { ThemeProvider } from '@/theme/theme-provider';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false }}/>
          <Stack.Screen name='profile' options={{
            presentation: 'card',
            gestureEnabled: true,
            gestureDirection: 'vertical',
            animationDuration: 400,
            headerShown: false,
            headerBackButtonDisplayMode: 'generic',
            headerTitle: 'Profile',
          }}/>
          
          <Stack.Screen name='(musics)' options={{ headerShown: false }} />
          <Stack.Screen name='podcast/index' options={{
            headerShown: false
          }}/>
          <Stack.Screen name='+not-found' />
        </Stack>
        <StatusBar style='auto' />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
