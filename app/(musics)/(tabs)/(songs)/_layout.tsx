import { Stack } from 'expo-router'
import { View } from 'react-native'
import {useColor} from "@/hooks/useColor";

const SongsScreenLayout = () => {
  const backgroundColor = useColor('background');
  const textColor = useColor('text');
	return (
		<View style={{
      flex: 1,
      backgroundColor,
    }}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
            headerLargeTitle: true,
            headerLargeStyle: {
              backgroundColor,
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
