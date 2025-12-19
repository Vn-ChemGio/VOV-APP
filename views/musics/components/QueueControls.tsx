import {StyleSheet, TouchableOpacity, ViewProps} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {useAudio, useColor, useColorScheme} from "@/hooks";

import {View} from "@/components/ui/view";
import {Text} from "@/components/ui/text";

import {MusicSong} from "@/types";
import {musicSongToMediaContent} from "@/helpers";

type QueueControlsProps = {
  songs: MusicSong[]
} & ViewProps

export const QueueControls = ({songs, style, ...viewProps}: QueueControlsProps) => {
  const theme = useColorScheme() ?? 'light';
  const textColor = useColor('text');
  
  const isDarkMode = theme === 'dark';
  const {playContent} = useAudio()
  
  const handlePlay = async () => {
    await playContent(musicSongToMediaContent(songs[0]), songs.map((song) => musicSongToMediaContent(song)))
    
  }
  
  const handleShufflePlay = async () => {
    const shuffledTracks = [...songs].sort(() => Math.random() - 0.5)
    await playContent(musicSongToMediaContent(shuffledTracks[0]), shuffledTracks.map((song) => musicSongToMediaContent(song)))
  }
  
  return (
    <View style={[{flexDirection: 'row', columnGap: 16}, style]} {...viewProps}>
      {/* Play button */}
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={handlePlay} activeOpacity={0.8}
                          style={[isDarkMode ? styles.buttonDark : styles.buttonLight]}>
          <Ionicons name="play" size={22} color={textColor}/>
          
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      </View>
      
      {/* Shuffle button */}
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={handleShufflePlay} activeOpacity={0.8}
                          style={[isDarkMode ? styles.buttonDark : styles.buttonLight]}>
          <Ionicons name={'shuffle-sharp'} size={24} color={textColor}/>
          
          <Text style={styles.buttonText}>Shuffle</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonLight: {
    padding: 12,
    backgroundColor: 'transparent',
    borderColor: 'rgba(47, 47, 47, 0.5)',
    borderWidth: 2,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
  },
  buttonDark: {
    padding: 12,
    backgroundColor: 'rgba(47, 47, 47, 0.5)',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
})
