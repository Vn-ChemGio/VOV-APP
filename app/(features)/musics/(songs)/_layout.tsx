import {defaultStyles} from '@/styles'
import {Stack} from 'expo-router'
import {View} from 'react-native'
import {useColor} from "@/hooks/useColor";

const SongsScreenLayout = () => {
  const backgroundColor = useColor('background');
  const cardBackgroundColor = useColor('card');
  
  const textColor = useColor('text');
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
            headerTitle: 'Songs',
          }}
        />
      </Stack>
    </View>
  )
}

export default SongsScreenLayout
