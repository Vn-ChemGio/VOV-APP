import {colors} from '@/constants/tokens'
import {defaultStyles} from '@/styles'
import {Ionicons} from '@expo/vector-icons'
import {StyleSheet, Text, View, ViewProps} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import TrackPlayer, {Track} from 'react-native-track-player'
import {MusicSong} from "@/types";
import {useColorScheme} from "@/hooks/useColorScheme";
import {useColor} from "@/hooks/useColor";

type QueueControlsProps = {
  tracks: (MusicSong & Track)[]
} & ViewProps

export const QueueControls = ({tracks, style, ...viewProps}: QueueControlsProps) => {
  const theme = useColorScheme() ?? 'light';
  
  console.log(theme)
  const isDarkMode = theme === 'dark';
  const textColor = useColor('text');
  const handlePlay = async () => {
    await TrackPlayer.setQueue(tracks)
    await TrackPlayer.play()
  }
  
  const handleShufflePlay = async () => {
    const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5)
    
    await TrackPlayer.setQueue(shuffledTracks)
    await TrackPlayer.play()
  }
  
  return (
    <View style={[{flexDirection: 'row', columnGap: 16}, style]} {...viewProps}>
      {/* Play button */}
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={handlePlay} activeOpacity={0.8}
                          style={[isDarkMode ? styles.buttonDark : styles.buttonLight]}>
          <Ionicons name="play" size={22} color={textColor}/>
          
          <Text style={[styles.buttonText, {color: textColor}]}>Play</Text>
        </TouchableOpacity>
      </View>
      
      {/* Shuffle button */}
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={handleShufflePlay} activeOpacity={0.8}
                          style={[isDarkMode ? styles.buttonDark : styles.buttonLight]}>
          <Ionicons name={'shuffle-sharp'} size={24} color={textColor}/>
          
          <Text style={[styles.buttonText, {color: textColor}]}>Shuffle</Text>
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
    ...defaultStyles.text,
    color: colors.primary,
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
})
