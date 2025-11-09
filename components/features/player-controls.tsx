import { FontAwesome6 } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useColor } from '@/hooks/useColor';

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
  );
};

export const PlayPauseButton = ({style, iconSize = 48}: PlayerButtonProps) => {
  const {playing} = {playing: true};
  const text = useColor('text');
  return (
    <View style={[{height: iconSize}, style]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => {
        }}
      >
        <FontAwesome6 name={playing ? 'pause' : 'play'} size={iconSize} color={text}/>
      </TouchableOpacity>
    </View>
  );
};

export const SkipToNextButton = ({iconSize = 30}: PlayerButtonProps) => {
  const text = useColor('text');
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
      <FontAwesome6 name="forward" size={iconSize} color={text}/>
    </TouchableOpacity>
  );
};

export const SkipToPreviousButton = ({iconSize = 30}: PlayerButtonProps) => {
  const text = useColor('text');
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
      <FontAwesome6 name={'backward'} size={iconSize} color={text}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
