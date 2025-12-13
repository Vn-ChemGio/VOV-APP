import {fontSize} from '@/constants/tokens'
import {trackTitleFilter} from '@/helpers/filter'
import {generateTracksListId} from '@/helpers/miscellaneous'
import {useNavigationSearch} from '@/hooks/useNavigationSearch'
import {useMemo} from 'react'
import {StyleSheet, Text, View} from 'react-native'

import {QueueControls} from './QueueControls'
import {TracksList} from './TracksList'
import {Image} from "@/components/ui/image";
import {MusicCategory} from "@/types";
import {unknownArtistImageUri} from "@/constants/images";
import appConfig from "@/configs/app.config";
import {useColor} from "@/hooks/useColor";

export const CategoryTracksList = ({category}: { category: MusicCategory }) => {
  const textColor = useColor('text')
  const search = useNavigationSearch({
    searchBarOptions: {
      hideWhenScrolling: true,
      placeholder: 'Find in playlist',
    },
  })
  
  const filteredPlaylistTracks = useMemo(() => {
    return category.songs.filter(trackTitleFilter(search)).map(song => ({
      ...song,
      url: `${appConfig.mediaHost}${song.source_url}`
    }))
  }, [category.songs, search])
  
  return (
    <TracksList
      id={generateTracksListId(`music-category-${category.id}`, search)}
      scrollEnabled={false}
      hideQueueControls={true}
      ListHeaderComponentStyle={styles.playlistHeaderContainer}
      ListHeaderComponent={
        <View>
          <View style={styles.artworkImageContainer}>
            <Image
              source={{
                uri: category.image_url ? `${appConfig.mediaHost}${category.image_url}` : unknownArtistImageUri,
              }}
              priority={'high'}
              containerStyle={styles.artworkImage}
            />
          </View>
          
          <Text numberOfLines={1} style={[styles.playlistNameText, {color: textColor}]}>
            {category.name}
          </Text>
          
          {search.length === 0 && (
            <QueueControls style={{paddingTop: 24}} tracks={category.songs.map(song => ({
              ...song,
              url: `${appConfig.mediaHost}${song.source_url}`
            }))}/>
          )}
        </View>
      }
      tracks={filteredPlaylistTracks}
    />
  )
}

const styles = StyleSheet.create({
  playlistHeaderContainer: {
    flex: 1,
    marginBottom: 32,
  },
  artworkImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 48,
    paddingVertical: 24,
  },
  artworkImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  playlistNameText: {
    marginTop: 22,
    textAlign: 'center',
    fontSize: fontSize.lg,
    fontWeight: '800',
  },
})
