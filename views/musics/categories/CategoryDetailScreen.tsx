import {screenPadding} from '@/constants/tokens'
import {useCategories} from './hooks'
import {defaultStyles} from '@/styles'
import {Redirect, useLocalSearchParams} from 'expo-router'
import {View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {CategoryTracksList} from "@/components/CategoryTracksList";

export const CategoryDetailScreen = () => {
  const {id: categoryId} = useLocalSearchParams<{ id: string }>()
  
  const {categories} = useCategories()
  
  const category = categories.find((category) => category.id.toString() === categoryId)
  
  if (!category) {
    console.warn(`Category ${categoryId} not found!`)
    
    return <Redirect href={'/musics/(tabs)/categories'}/>
  }
  
  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{paddingHorizontal: screenPadding.horizontal}}
      >
        <CategoryTracksList category={category} />
      </ScrollView>
    </View>
  )
}
