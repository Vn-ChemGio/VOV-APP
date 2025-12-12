import {unknownArtistImageUri, unknownTrackImageUri} from '@/constants/images'
import {screenPadding} from '@/constants/tokens'
import {useCategories} from './hooks'
import {defaultStyles, utilsStyles} from '@/styles'
import {Link} from 'expo-router'
import React, {useMemo} from 'react'
import {FlatList, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {Image} from "@/components/ui/image";
import {LoadingOverlay} from "@/components/ui/spinner";
import {useNavigationSearch} from "@/hooks/useNavigationSearch";
import {categoryNameFilter} from "@/helpers/filter";
import appConfig from "@/configs/app.config";
import {useColor} from "@/hooks/useColor";


export const CategoriesScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Find in categories, ex: Pop, Rap, Hip-Hop, ...',
    },
  })
  
  const {categories, isLoading} = useCategories()
  const backgroundColor = useColor('background')
  const textColor = useColor('text')
  
  const filteredCategories = useMemo(() => {
    if (!search) return categories
    
    return categories.filter(categoryNameFilter(search))
  }, [categories, search])
  
  return (
    <View style={[defaultStyles.container, { backgroundColor }]}>
      <ScrollView
        style={{paddingHorizontal: screenPadding.horizontal}}
        contentInsetAdjustmentBehavior="automatic"
      >
        {isLoading ? <LoadingOverlay visible={true}/> :
          <FlatList
            contentContainerStyle={{paddingTop: 10, paddingBottom: 128}}
            ItemSeparatorComponent={() => <View
              style={{
                ...utilsStyles.itemSeparator,
                marginLeft: filteredCategories.length ? 80 : 0,
                marginVertical: 12
              }}/>}
            ListFooterComponent={
              () => <View
                style={{
                  ...utilsStyles.itemSeparator,
                  marginLeft: filteredCategories.length ? 80 : 0,
                  marginVertical: 12
                }}/>
            }
            ListEmptyComponent={
              <View>
                <Text style={utilsStyles.emptyContentText}>Không tìm thấy dữ liệu</Text>
                
                <Image
                  source={{uri: unknownTrackImageUri}}
                  containerStyle={utilsStyles.emptyContentImage}
                  priority="normal"
                />
              </View>
            }
            data={filteredCategories}
            renderItem={({item: category}) => (
              <Link href={`/musics/(tabs)/categories/${category.id}`} asChild>
                <TouchableWithoutFeedback>
                  <View style={styles.categoryContainer}>
                    <View>
                      <Image
                        source={{
                          uri: category.image_url ? `${appConfig.mediaHost}${category.image_url}` : unknownArtistImageUri,
                        }}
                        priority="low"
                        containerStyle={styles.categoryImage}
                      />
                    </View>
                    
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <Text numberOfLines={1} style={[styles.categoryNameText, {color: textColor}]}>
                        {category.name}
                      </Text>
                    </View>
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
    flexDirection: 'row',
    columnGap: 14,
    alignItems: 'center',
    paddingRight: 90,
  },
  categoryImage: {
    borderRadius: 8,
    width: 70,
    height: 70,
  },
  categoryNameText: {
    ...defaultStyles.text,
    fontSize: 17,
    fontWeight: '600',
    maxWidth: '80%',
  },
})
