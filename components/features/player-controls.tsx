import { FontAwesome6 } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'
import {useColor} from "@/hooks/useColor";

type PlayerControlsProps = {
  style?: ViewStyle
}

type PlayerButtonProps = {
  style?: ViewStyle
  iconSize?: number
}

export const PlayerControls = ({ style }: PlayerControlsProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <SkipToPreviousButton />
        
        <PlayPauseButton />
        
        <SkipToNextButton />
      </View>
    </View>
  )
}

export const PlayPauseButton = ({ style, iconSize = 48 }: PlayerButtonProps) => {
  const { playing } = useIsPlaying()
  const  textColor= useColor('text')
  return (
    <View style={[{ height: iconSize }, style]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
      >
        <FontAwesome6 name={playing ? 'pause' : 'play'} size={iconSize} color={textColor} />
      </TouchableOpacity>
    </View>
  )
}

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  const  textColor= useColor('text')
  
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToNext()}>
      <FontAwesome6 name="forward" size={iconSize} color={textColor} />
    </TouchableOpacity>
  )
}

export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
  const  textColor= useColor('text')
  
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToPrevious()}>
      <FontAwesome6 name={'backward'} size={iconSize} color={textColor} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
})