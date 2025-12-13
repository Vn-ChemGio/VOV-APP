import React, {useMemo} from 'react'
import {FlatList, StyleSheet, TouchableWithoutFeedback, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {Link} from 'expo-router'

import {unknownArtistImageUri} from '@/constants/images'
import {screenPadding} from '@/constants/tokens'
import appConfig from "@/configs/app.config";

import {defaultStyles, utilsStyles} from '@/styles'
import {Image} from "@/components/ui/image";
import {Text} from "@/components/ui/text";
import {LoadingOverlay} from "@/components/ui/spinner";
import {useNavigationSearch} from "@/hooks/useNavigationSearch";

import {useColor} from "@/hooks/useColor";
import {artistNameFilter} from "@/helpers/filter";
import {useArtists} from './hooks'

export const ArtistsScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Find in artists',
    },
  })
  const backgroundColor = useColor('background')
  const textColor = useColor('text')
  const {artists, isLoading} = useArtists()
  
  const filteredArtists = useMemo(() => {
    if (!search) return artists
    
    return artists.filter(artistNameFilter(search))
  }, [artists, search])
  
  return (
    <View style={[defaultStyles.container, {backgroundColor}]}>
      <ScrollView
        style={{paddingHorizontal: 16}}
        contentInsetAdjustmentBehavior="automatic"
      >
        {isLoading ? <LoadingOverlay visible={true}/> :
          <FlatList
            contentContainerStyle={{paddingTop: 10, paddingBottom: 120}}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View
              style={{
                ...utilsStyles.itemSeparator,
                marginLeft: filteredArtists.length ? 50 : 0,
                marginVertical: 12
              }}/>
            }
            ListFooterComponent={() => <View
              style={{
                ...utilsStyles.itemSeparator,
                marginLeft: filteredArtists.length ? 50 : 0,
                marginVertical: 12
              }}/>}
            ListEmptyComponent={
              <View>
                <Text style={utilsStyles.emptyContentText}>Không tìm thấy dữ liệu</Text>
                
                <Image
                  source={{
                    uri: unknownArtistImageUri,
                  }}
                  priority={'normal'}
                  containerStyle={utilsStyles.emptyContentImage}
                />
              </View>
            }
            data={filteredArtists}
            renderItem={({item: artist}) => {
              return (
                <Link href={`/musics/(tabs)/artists/${artist.id}`} asChild>
                  <TouchableWithoutFeedback>
                    <View style={styles.artistItemContainer}>
                      <View>
                        <Image
                          source={{
                            uri: artist.avatar_url ? `${appConfig.apiPrefix}${artist.avatar_url}` : unknownArtistImageUri,
                          }}
                          priority={'normal'}
                          containerStyle={styles.artistImage}
                        />
                      </View>
                      
                      <View style={{width: '100%'}}>
                        <Text numberOfLines={1} style={[styles.artistNameText, {color: textColor}]}>
                          {artist.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Link>
              )
            }}
          />}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  artistItemContainer: {
    flexDirection: 'row',
    columnGap: 14,
    alignItems: 'center',
    maxHeight: 50,
  },
  artistImage: {
    borderRadius: 32,
    width: 40,
    height: 40,
  },
  artistNameText: {
    ...defaultStyles.text,
    fontSize: 17,
    maxWidth: '80%',
  },
})
