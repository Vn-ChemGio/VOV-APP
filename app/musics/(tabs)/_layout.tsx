import {colors, fontSize} from '@/constants/tokens'
import {FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import {BlurView} from 'expo-blur'
import {Tabs} from 'expo-router'
import {StyleSheet} from 'react-native'

const TabsNavigation = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: '500',
        },
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 0,
          paddingTop: 8,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={95}
            style={{
              ...StyleSheet.absoluteFillObject,
              overflow: 'hidden',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Danh mục',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="playlist-play" size={28} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="(songs)"
        options={{
          title: 'Bài hát',
          tabBarIcon: ({color}) => (
            <Ionicons name="musical-notes-sharp" size={24} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="artists"
        options={{
          title: 'Ca sĩ',
          tabBarIcon: ({color}) => <FontAwesome6 name="users-line" size={20} color={color}/>,
        }}
      />
    </Tabs>
  )
}

export default TabsNavigation
