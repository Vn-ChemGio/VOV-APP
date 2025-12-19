import {StyleSheet, TouchableOpacity, View, ViewProps} from 'react-native';
import {useRouter} from "expo-router";
import {BlurView} from "expo-blur";
import {Image} from 'expo-image';

import {useAudio, useColorScheme} from "@/hooks";
import {unknownTrackImageUri} from '@/constants/images';

import {MovingText} from '@/views/audio-player/components/moving-text';
import {PlayPauseButton, SkipToNextButton, SkipToPreviousButton,} from '@/views/audio-player/components/player-controls';

export const AudioFloatingPlayer = ({style}: ViewProps) => {
  const theme = useColorScheme() ?? 'light';
  
  const {currentContent} = useAudio();
  
  const router = useRouter()
  
  const handlePress = () => {
    router.navigate('/player')
  }
  // Không có track → không render (Spotify behavior)
  if (!currentContent) return null
  
  return (
    
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9} style={[styles.container, {
      left: 8,
      right: 8,
      // Add shadow for iOS and elevation for Android
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.18,
      shadowRadius: 6,
      elevation: 8,
    }, style]}>
      <>
        <View style={{borderRadius: 12, overflow: 'hidden', ...StyleSheet.absoluteFillObject}}>
          <BlurView
            tint={theme}
            intensity={80}
            style={{flex: 1}}
          />
        </View>
        <Image
          source={{
            uri: currentContent?.image_url ?? unknownTrackImageUri,
          }}
          style={styles.trackArtworkImage}
        />
        
        <View style={styles.trackTitleContainer}>
          <MovingText
            style={styles.trackTitle}
            text={currentContent.title ?? ''}
            animationThreshold={25}
          />
        </View>
        
        <View style={styles.trackControlsContainer}>
          <SkipToPreviousButton iconSize={22}/>
          <PlayPauseButton iconSize={24}/>
          <SkipToNextButton iconSize={22}/>
        </View>
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    paddingVertical: 10,
  },
  trackArtworkImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: 'hidden',
    marginLeft: 10,
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingLeft: 10,
  },
  trackControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
    marginRight: 16,
    paddingLeft: 16,
  },
});
