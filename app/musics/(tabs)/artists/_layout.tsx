import {StackScreenWithSearchBar} from '@/constants/layout'
import {defaultStyles} from '@/styles'
import {Stack} from 'expo-router'
import {View} from 'react-native'
import {useColor} from "@/hooks/useColor";

const ArtistsScreenLayout = () => {
  const backgroundColor = useColor('card');
  const textColor = useColor('text');
  const primaryColor = useColor('primary');
  
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            ...StackScreenWithSearchBar,
            headerLargeStyle: {
              backgroundColor,
            },
            headerLargeTitleStyle: {
              color: textColor,
            },
            headerTintColor: textColor,
            headerTitle: 'Artists',
          }}
        />
        
        <Stack.Screen
          name="[id]"
          options={{
            headerTitle: '',
            headerBackVisible: true,
            headerStyle: {
              backgroundColor,
            },
            headerTintColor: primaryColor,
          }}
        />
      </Stack>
    </View>
  )
}

export default ArtistsScreenLayout
