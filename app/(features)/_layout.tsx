import {SplashScreen, Stack} from 'expo-router';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync()

export default function AppsLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown: false}}/>
      <Stack.Screen name='musics' options={{headerShown: false}}/>
      <Stack.Screen name='podcast' options={{
        headerShown: false
      }}/>
      <Stack.Screen name='news' options={{
        headerShown: false
      }}/>
    </Stack>
  );
}
