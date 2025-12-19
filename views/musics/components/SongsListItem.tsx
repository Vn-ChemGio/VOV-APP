import {StyleSheet, TouchableOpacity} from 'react-native'
import LoaderKit from 'react-native-loader-kit'

import {Entypo, Ionicons} from '@expo/vector-icons'

import {Image} from "@/components/ui/image";
import {View} from "@/components/ui/view";
import {Text} from "@/components/ui/text";

import {useAudio, useColor} from "@/hooks";
import {MusicSong} from "@/types";
import {StopPropagation} from "./StopPropagation";
import { SongShortcutsMenu } from "./SongShortcutsMenu";

export type SongsListItemProps = {
  song: MusicSong
  onSongSelect: (track: MusicSong) => void
}

export const SongsListItem = ({
                                 song,
                                 onSongSelect: handleSongSelect,
                               }: SongsListItemProps) => {
  const textColor = useColor('text')
  const primaryColor = useColor('primary')
  const textMutedColor = useColor('textMuted')
  const {isPlaying, currentContent} = useAudio()
  
  const isActiveTrack = currentContent?.source_url === song?.source_url;
  
  return (
    <TouchableOpacity onPress={() => handleSongSelect(song)}>
      <View style={styles.trackItemContainer}>
        <View>
          
          <Image
            source={{
              uri: song.image_url,
            }}
            priority={'normal'}
            style={{
              ...styles.trackArtworkImage,
              opacity: isActiveTrack ? 0.6 : 1,
            }}
          />
          
          {isActiveTrack &&
            (isPlaying ? (
              <LoaderKit
                style={styles.trackPlayingIconIndicator}
                name="LineScaleParty"
                color={textColor}
              />
            ) : (
              <Ionicons
                style={styles.trackPausedIndicator}
                name="play"
                size={24}
                color={textColor}
              />
            ))}
        </View>
        
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Track title + artist */}
          <View style={{width: '100%'}}>
            <Text
              numberOfLines={1}
              style={{
                ...styles.trackTitleText,
                color: isActiveTrack ? primaryColor : textColor,
              }}
            >
              {song.title}
            </Text>
            
            {song.artist?.name && (
              <Text numberOfLines={1} style={{...styles.trackArtistText, color: textMutedColor}}>
                {song.artist?.name}
              </Text>
            )}
          </View>
          
          <StopPropagation>
            <SongShortcutsMenu song={song}>
              <Entypo name="dots-three-horizontal" size={18} color={textColor} />
            </SongShortcutsMenu>
          </StopPropagation>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  trackItemContainer: {
    flexDirection: 'row',
    columnGap: 14,
    alignItems: 'center',
    paddingRight: 20,
    maxHeight: 50
  },
  trackPlayingIconIndicator: {
    position: 'absolute',
    top: 18,
    left: 16,
    width: 16,
    height: 16,
  },
  trackPausedIndicator: {
    position: 'absolute',
    top: 14,
    left: 14,
  },
  trackArtworkImage: {
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  trackTitleText: {
    fontSize: 16,
    fontWeight: '600',
    maxWidth: '90%',
  },
  trackArtistText: {
    fontSize: 14,
    marginTop: 4,
  },
})
