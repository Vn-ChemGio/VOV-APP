import React, {useMemo} from 'react'
import {FlatList, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {BlurView} from 'expo-blur'
import {Link} from 'expo-router'
import {ScrollView} from 'react-native-gesture-handler'

import {unknownArtistImageUri, unknownTrackImageUri} from '@/constants/images'

import {useColor, useNavigationSearch} from "@/hooks";

import {Image} from "@/components/ui/image";
import {View} from "@/components/ui/view";
import {Text} from "@/components/ui/text";

import LoadingScreen from "@/components/features/loading-screen";

import {categoryNameFilter} from "@/helpers";

import {useCategories} from './hooks'


export const CategoriesScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Find in categories, ex: Pop, Rap, Hip-Hop, ...',
    },
  })
  
  const {categories, isLoading} = useCategories()
  const backgroundColor = useColor('background')
  const textMutedColor = useColor('textMuted')
  
  const filteredCategories = useMemo(() => {
    if (!search) return categories
    
    return categories.filter(categoryNameFilter(search))
  }, [categories, search])
  
  return (
    <View style={{flex: 1, backgroundColor}}>
      <ScrollView
        style={{paddingHorizontal: 16}}
        contentInsetAdjustmentBehavior="automatic"
      >
        {isLoading ? <LoadingScreen/> :
          <FlatList
            contentContainerStyle={{paddingTop: 10, paddingBottom: 128}}
            columnWrapperStyle={{gap: 12}}
            ListEmptyComponent={
              <View>
                <Text style={{
                  fontSize: 16,
                  color: textMutedColor,
                  textAlign: 'center',
                  marginTop: 20,
                }}>Không tìm thấy dữ liệu</Text>
                
                <Image
                  source={{uri: unknownTrackImageUri}}
                  containerStyle={{
                    width: 200,
                    height: 200,
                    alignSelf: 'center',
                    marginTop: 40,
                    opacity: 0.3,
                  }}
                  priority="normal"
                />
              </View>
            }
            numColumns={2}
            data={filteredCategories}
            renderItem={({item: category}) => (
              <Link href={`/musics/categories/${category.id}`} asChild>
                <TouchableWithoutFeedback>
                  <View style={[styles.categoryContainer, {
                    backgroundImage: category.image_url,
                  }]}>
                    <View style={[styles.categoryImage, {position: 'relative'}]}>
                      <Image
                        source={{
                          uri: category.image_url ? category.image_url : unknownArtistImageUri,
                        }}
                        priority="low"
                        containerStyle={styles.categoryImage}
                      />
                      <View
                        style={[
                          StyleSheet.absoluteFill,
                          {
                            backgroundColor: 'rgba(0,0,0,0.2)', // dark overlay
                            borderRadius: styles.categoryImage?.borderRadius ?? 8,
                            overflow: 'hidden',
                          },
                        ]}
                      />
                      <BlurView
                        intensity={5}
                        tint="dark"
                        style={[
                          StyleSheet.absoluteFill,
                          {
                            borderRadius: styles.categoryImage?.borderRadius ?? 8,
                            overflow: 'hidden',
                          },
                        ]}
                      />
                    </View>
                    <Text numberOfLines={2} style={styles.categoryNameText}>
                      {category.name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </Link>
            )}
            scrollEnabled={false}
          />
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1, // Ensures items in a row share space equally
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: '#f9c2ff',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 4 / 3,
  },
  categoryImage: {
    borderRadius: 12,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    backgroundPosition: 'center',
  },
  categoryNameText: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    fontSize: 16,
    fontWeight: '800',
    color: 'white',
  },
})
