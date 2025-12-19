import {useMemo} from 'react'
import {StyleSheet} from 'react-native'

import {unknownArtistImageUri} from '@/constants/images'

import {cleanMusicSongs, generateTracksListId, trackTitleFilter} from '@/helpers'

import {useNavigationSearch} from '@/hooks'
import {Image} from "@/components/ui/image";
import {View} from "@/components/ui/view";
import {Text} from "@/components/ui/text";

import {QueueControls} from './QueueControls'
import {SongsList} from './SongsList'

import {Artist} from "@/types";

export const ArtistSongsList = ({artist}: { artist: Artist }) => {
  const search = useNavigationSearch({
    searchBarOptions: {
      hideWhenScrolling: true,
      placeholder: 'Find in songs',
    },
  })
  
  const filteredArtistSongs = useMemo(() => {
    if (!search) return cleanMusicSongs(artist.songs)
    
    return cleanMusicSongs(artist.songs.filter(trackTitleFilter(search)));
  }, [artist.songs, search])
  
  return (
    <SongsList
      id={generateTracksListId(`music-artist-${artist.id}`, search)}
      scrollEnabled={false}
      hideQueueControls={true}
      ListHeaderComponentStyle={styles.artistHeaderContainer}
      ListHeaderComponent={
        <View>
          <View style={styles.artistImageContainer}>
            <Image
              source={{
                uri: artist.avatar_url ? `https://picsum.photos/200` : unknownArtistImageUri,
              }}
              containerStyle={styles.artistImage}
              priority={'high'}
            />
          </View>
          
          <Text numberOfLines={1} style={styles.artistNameText}>
            {artist.name}
          </Text>
          
          {search.length === 0 && (
            <QueueControls songs={filteredArtistSongs} style={{paddingTop: 24}}/>
          )}
        </View>
      }
      songs={filteredArtistSongs}
    />
  )
}

const styles = StyleSheet.create({
  artistHeaderContainer: {
    flex: 1,
    marginBottom: 32,
  },
  artistImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 48,
    paddingVertical: 24,
  },
  artistImage: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 999,
    aspectRatio: 1
  },
  artistNameText: {
    marginTop: 22,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
  },
})
