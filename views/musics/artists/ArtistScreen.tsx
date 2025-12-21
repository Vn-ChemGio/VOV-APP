import React, {useMemo} from 'react'
import {FlatList, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {Link} from 'expo-router'

import {unknownArtistImageUri} from '@/constants/images'
import appConfig from "@/configs/app.config";

import {View} from "@/components/ui/view";
import {Image} from "@/components/ui/image";
import {Text} from "@/components/ui/text";
import {useColor, useNavigationSearch} from "@/hooks";
import {artistNameFilter} from "@/helpers";
import {useArtists} from './hooks'
import LoadingScreen from "@/components/features/loading-screen";
import {useHeaderHeight} from "@react-navigation/elements";

export const ArtistsScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Find in artists',
    },
  })
  const backgroundColor = useColor('background')
  const textColor = useColor('text')
  const textMutedColor = useColor('textMuted')
  const top = useHeaderHeight();
  
  const {artists, isLoading} = useArtists()
  
  const filteredArtists = useMemo(() => {
    if (!search) return artists
    
    return artists.filter(artistNameFilter(search))
  }, [artists, search])
  
  return (
    <View style={{flex: 1, backgroundColor, paddingTop: top}}>
      <ScrollView
        style={{paddingHorizontal: 16}}
        contentInsetAdjustmentBehavior="automatic"
      >
        {isLoading ? <LoadingScreen/> :
          <FlatList
            contentContainerStyle={{paddingTop: 10, paddingBottom: 120}}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View
              style={{
                borderColor: textMutedColor,
                borderWidth: StyleSheet.hairlineWidth,
                opacity: 0.3,
                marginLeft: filteredArtists.length ? 50 : 0,
                marginVertical: 12
              }}/>
            }
            ListFooterComponent={() => <View
              style={{
                borderColor: textMutedColor,
                borderWidth: StyleSheet.hairlineWidth,
                opacity: 0.3,
                marginLeft: filteredArtists.length ? 50 : 0,
                marginVertical: 12
              }}/>}
            ListEmptyComponent={
              <View>
                <Text style={{
                  fontSize: 16,
                  color: textMutedColor,
                  textAlign: 'center',
                  marginTop: 20,
                }}>Không tìm thấy dữ liệu</Text>
                
                <Image
                  source={{
                    uri: unknownArtistImageUri,
                  }}
                  priority={'normal'}
                  containerStyle={{
                    width: 200,
                    height: 200,
                    alignSelf: 'center',
                    marginTop: 40,
                    opacity: 0.3,
                  }}
                />
              </View>
            }
            data={filteredArtists}
            renderItem={({item: artist}) => {
              return (
                <Link href={`/musics/artists/${artist.id}`} asChild>
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
    fontSize: 17,
    maxWidth: '80%',
  },
})
