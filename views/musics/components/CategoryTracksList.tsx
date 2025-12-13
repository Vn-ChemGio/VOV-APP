import {useMemo} from 'react'
import {StyleSheet} from 'react-native'

import {fontSize} from '@/constants/tokens'
import appConfig from "@/configs/app.config";
import {trackTitleFilter} from '@/helpers/filter'
import {generateTracksListId} from '@/helpers/miscellaneous'
import {useNavigationSearch} from '@/hooks/useNavigationSearch'

import {Image} from "@/components/ui/image";
import {View} from "@/components/ui/view";
import {Text} from "@/components/ui/text";
import {unknownArtistImageUri} from "@/constants/images";
import {QueueControls} from './QueueControls'

import {TracksList} from './TracksList'
import {MusicCategory} from "@/types";

export const CategoryTracksList = ({category}: { category: MusicCategory }) => {
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
          
          <Text numberOfLines={1} style={styles.playlistNameText}>
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
    resizeMode: 'cover',
    borderRadius: 12,
    aspectRatio: 1
  },
  playlistNameText: {
    textAlign: 'center',
    fontSize: fontSize.lg,
    fontWeight: '800',
  },
})
