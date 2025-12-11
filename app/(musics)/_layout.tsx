import {Stack} from 'expo-router'
import {useColor} from "@/hooks/useColor";

const MusicNavigation = () => {
  const backgroundColor = useColor('background');
  const textColor = useColor('text');
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
      
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
      
      {/*<Stack.Screen
        name="(modals)/addToPlaylist"
        options={{
          presentation: 'modal',
          headerStyle: {
            backgroundColor,
          },
          headerTitle: 'Add to playlist',
          headerTitleStyle: {
            color: textColor,
          },
        }}
      />*/}
    </Stack>
  )
}

export default MusicNavigation
