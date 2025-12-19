import {useMemo} from 'react'
import {StyleSheet} from 'react-native'

import {fontSize} from '@/constants/tokens'
import {cleanMusicSongs, generateTracksListId, trackTitleFilter} from '@/helpers'
import {useNavigationSearch} from '@/hooks'

import {Image} from "@/components/ui/image";
import {View} from "@/components/ui/view";
import {Text} from "@/components/ui/text";

import {unknownArtistImageUri} from "@/constants/images";
import {QueueControls} from './QueueControls'
import {SongsList} from './SongsList'

import {MusicCategory} from "@/types";

export const CategoryTracksList = ({category}: { category: MusicCategory }) => {
  const search = useNavigationSearch({
    searchBarOptions: {
      hideWhenScrolling: true,
      placeholder: 'Find in playlist',
    },
  })
  
  const filteredCategorySongs = useMemo(() => {
    if (!search) return cleanMusicSongs(category.songs)
    return cleanMusicSongs(category.songs.filter(trackTitleFilter(search)))
  }, [category.songs, search])
  
  return (
    <SongsList
      id={generateTracksListId(`music-category-${category.id}`, search)}
      scrollEnabled={false}
      hideQueueControls={true}
      ListHeaderComponentStyle={styles.playlistHeaderContainer}
      ListHeaderComponent={
        <View>
          <View style={styles.artworkImageContainer}>
            <Image
              source={{
                uri: category.image_url ? category.image_url : unknownArtistImageUri,
              }}
              priority={'high'}
              containerStyle={styles.artworkImage}
            />
          </View>
          
          <Text numberOfLines={1} style={styles.playlistNameText}>
            {category.name}
          </Text>
          
          {search.length === 0 && (
            <QueueControls style={{paddingTop: 24}} songs={filteredCategorySongs}/>
          )}
        </View>
      }
      songs={filteredCategorySongs}
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
