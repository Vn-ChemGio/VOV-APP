import {StyleSheet, TouchableOpacity} from 'react-native'
import LoaderKit from 'react-native-loader-kit'
import {Track, useActiveTrack, useIsPlaying} from 'react-native-track-player'

import {Ionicons} from '@expo/vector-icons'
import {unknownTrackImageUri} from '@/constants/images'

import {colors, fontSize} from '@/constants/tokens'
import {Image} from "@/components/ui/image";
import {View} from "@/components/ui/view";
import {Text} from "@/components/ui/text";

import appConfig from "@/configs/app.config";
import {useColor} from "@/hooks/useColor";
import {MusicSong} from "@/types";

export type TracksListItemProps = {
  track: MusicSong & Track
  onTrackSelect: (track: MusicSong & Track) => void
}

export const TracksListItem = ({
                                 track,
                                 onTrackSelect: handleTrackSelect,
                               }: TracksListItemProps) => {
  const textColor = useColor('text')
  const {playing} = useIsPlaying()
  
  const isActiveTrack = useActiveTrack()?.url === track.url;
  
  return (
    <TouchableOpacity onPress={() => handleTrackSelect(track)}>
      <View style={styles.trackItemContainer}>
        <View>
          
          <Image
            source={{
              uri: track.image_url ? `${appConfig.mediaHost}${track.image_url}` : track.artwork ?? unknownTrackImageUri,
            }}
            priority={'normal'}
            style={{
              ...styles.trackArtworkImage,
              opacity: isActiveTrack ? 0.6 : 1,
            }}
          />
          
          {isActiveTrack &&
            (playing ? (
              <LoaderKit
                style={styles.trackPlayingIconIndicator}
                name="LineScaleParty"
                color={colors.icon}
              />
            ) : (
              <Ionicons
                style={styles.trackPausedIndicator}
                name="play"
                size={24}
                color={colors.icon}
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
                color: isActiveTrack ? colors.primary : textColor,
              }}
            >
              {track.title}
            </Text>
            
            {track.artist && (
              <Text numberOfLines={1} style={styles.trackArtistText}>
                {track.artist}
              </Text>
            )}
          </View>
          
          {/*<StopPropagation>
            <TrackShortcutsMenu track={track}>
              <Entypo name="dots-three-horizontal" size={18} color={colors.icon} />
            </TrackShortcutsMenu>
          </StopPropagation>*/}
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
    fontSize: fontSize.sm,
    fontWeight: '600',
    maxWidth: '90%',
  },
  trackArtistText: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
})
