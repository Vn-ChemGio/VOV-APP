import {FontAwesome6} from '@expo/vector-icons'
import {StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native'
import {useAudio, useColor} from "@/hooks";

type PlayerControlsProps = {
  style?: ViewStyle
}

type PlayerButtonProps = {
  style?: ViewStyle
  iconSize?: number
}

export const PlayerControls = ({style}: PlayerControlsProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <SkipToPreviousButton/>
        
        <PlayPauseButton/>
        
        <SkipToNextButton/>
      </View>
    </View>
  )
}

export const PlayPauseButton = ({style, iconSize = 48}: PlayerButtonProps) => {
  const textColor = useColor('text')
  const {isPlaying, play, pause} = useAudio();
  return (
    <View style={[{height: iconSize}, style]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={isPlaying ? pause : play}
      >
        <FontAwesome6 name={isPlaying ? 'pause' : 'play'} size={iconSize} color={textColor}/>
      </TouchableOpacity>
    </View>
  )
}

export const SkipToNextButton = ({iconSize = 30}: PlayerButtonProps) => {
  const textColor = useColor('text')
  const {next} = useAudio();
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={next}>
      <FontAwesome6 name="forward" size={iconSize} color={textColor}/>
    </TouchableOpacity>
  )
}

export const SkipToPreviousButton = ({iconSize = 30}: PlayerButtonProps) => {
  const textColor = useColor('text')
  const {prev} = useAudio();
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={prev}>
      <FontAwesome6 name={'backward'} size={iconSize} color={textColor}/>
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