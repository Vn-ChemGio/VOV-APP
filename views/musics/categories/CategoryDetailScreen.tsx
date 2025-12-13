import {Redirect, useLocalSearchParams} from 'expo-router'
import {View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {defaultStyles} from '@/styles'
import {useColor} from "@/hooks/useColor";
import {useCategories} from './hooks'
import {CategoryTracksList} from "../components";

export const CategoryDetailScreen = () => {
  const backgroundColor = useColor('background')
  const {id: categoryId} = useLocalSearchParams<{ id: string }>()
  
  const {categories} = useCategories()
  
  const category = categories.find((category) => category.id.toString() === categoryId)
  
  if (!category) {
    console.warn(`Category ${categoryId} not found!`)
    
    return <Redirect href={'/musics/(tabs)/categories'}/>
  }
  
  return (
    <View style={[defaultStyles.container, {backgroundColor}]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{paddingHorizontal: 16}}
      >
        <CategoryTracksList category={category}/>
      </ScrollView>
    </View>
  )
}
