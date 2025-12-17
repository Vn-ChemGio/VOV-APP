import {useMemo} from 'react'
import {StyleSheet} from 'react-native'

import {unknownArtistImageUri} from '@/constants/images'
import {fontSize} from '@/constants/tokens'
import appConfig from "@/configs/app.config";

import {trackTitleFilter} from '@/helpers/filter'
import {generateTracksListId} from '@/helpers/miscellaneous'

import {useNavigationSearch} from '@/hooks/useNavigationSearch'
import {Image} from "@/components/ui/image";
import {View} from "@/components/ui/view";
import {Text} from "@/components/ui/text";

import {QueueControls} from './QueueControls'
import {TracksList} from './TracksList'

import {Artist} from "@/types";

export const ArtistTracksList = ({artist}: { artist: Artist }) => {
  const search = useNavigationSearch({
    searchBarOptions: {
      hideWhenScrolling: true,
      placeholder: 'Find in songs',
    },
  })
  
  const filteredArtistTracks = useMemo(() => {
    if (!search) return artist.songs.map(song => ({
      ...song,
      url: `${appConfig.mediaHost}${song.source_url}`
    }))
    
    return artist.songs.filter(trackTitleFilter(search)).map(song => ({
      ...song,
      url: `${appConfig.mediaHost}${song.source_url}`
    }))
  }, [artist.songs, search])
  
  return (
    <TracksList
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
            <QueueControls tracks={artist.songs.map(song => ({
              ...song,
              url: `${appConfig.mediaHost}${song.source_url}`
            }))} style={{paddingTop: 24}}/>
          )}
        </View>
      }
      tracks={filteredArtistTracks}
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
    fontSize: fontSize.lg,
    fontWeight: '800',
  },
})
