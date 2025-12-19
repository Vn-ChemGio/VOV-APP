import {Redirect, useLocalSearchParams} from 'expo-router'
import {ScrollView} from 'react-native-gesture-handler'

import {View} from '@/components/ui/view'

import {useColor} from "@/hooks";
import {useCategories} from './hooks'
import {CategoryTracksList} from "../components";

export const CategoryDetailScreen = () => {
  const backgroundColor = useColor('background')
  const {id: categoryId} = useLocalSearchParams<{ id: string }>()
  
  const {categories} = useCategories()
  
  const category = categories.find((category) => category.id.toString() === categoryId)
  
  if (!category) {
    console.warn(`Category ${categoryId} not found!`)
    
    return <Redirect href={'/musics/categories'}/>
  }
  
  return (
    <View style={{flex: 1, backgroundColor}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{paddingHorizontal: 16}}
      >
        <CategoryTracksList category={category}/>
      </ScrollView>
    </View>
  )
}
