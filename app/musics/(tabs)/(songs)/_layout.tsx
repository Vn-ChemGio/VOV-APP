import {StackScreenWithSearchBar} from '@/constants/layout'
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
            ...StackScreenWithSearchBar,
            headerLargeStyle: {
              backgroundColor: cardBackgroundColor,
            },
            headerLargeTitleStyle: {
              color: textColor,
            },
            headerTintColor: textColor,
            headerTitle: 'Songs',
          }}
        />
      </Stack>
    </View>
  )
}

export default SongsScreenLayout
