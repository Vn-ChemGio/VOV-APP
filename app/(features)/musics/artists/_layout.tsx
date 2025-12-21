import {defaultStyles} from '@/styles'
import {Stack} from 'expo-router'
import {View} from 'react-native'
import {useColor} from "@/hooks/useColor";

const ArtistsScreenLayout = () => {
  const backgroundColor = useColor('background');
  const cardBackgroundColor = useColor('card');
  const textColor = useColor('text');
  const primaryColor = useColor('primary');
  
  return (
    <View style={[defaultStyles.container, {backgroundColor}]}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerLargeTitleEnabled: true,
            headerLargeStyle: {
              backgroundColor: cardBackgroundColor,
            },
            headerLargeTitleStyle: {
              color: textColor,
            },
            headerTintColor: textColor,
            headerTransparent: true,
            headerBlurEffect: 'prominent',
            headerShadowVisible: false,
            headerTitle: 'Ca sĩ',
          }}
        />
        
        <Stack.Screen
          name="[id]"
          options={{
            headerTitle: '',
            headerBackVisible: true,
            headerStyle: {
              backgroundColor: cardBackgroundColor,
            },
            headerTintColor: primaryColor,
          }}
        />
      </Stack>
    </View>
  )
}

export default ArtistsScreenLayout
