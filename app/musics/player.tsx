import {MovingText} from '@/components/MovingText'
import {PlayerControls} from '@/components/features/player-controls'
// import {PlayerProgressBar} from '@/components/PlayerProgressbar'
// import {PlayerRepeatToggle} from '@/components/PlayerRepeatToggle'
// import {PlayerVolumeBar} from '@/components/PlayerVolumeBar'
import {unknownTrackImageUri} from '@/constants/images'
import {defaultStyles} from '@/styles'
import {fontSize, screenPadding} from '@/constants/tokens'

import {usePlayerBackground} from '@/hooks/usePlayerBackground'
//import {useTrackPlayerFavorite} from '@/hooks/useTrackPlayerFavorite'
import {FontAwesome} from '@expo/vector-icons'
import {LinearGradient} from 'expo-linear-gradient'
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useColor} from "@/hooks/useColor";
import {Image} from "@/components/ui/image";
import {useAudio} from "@/contexts/audio/AudioProvider";
import {Progress} from "@/components/ui/progress";
import {PlayerProgressBar} from "@/components/PlayerProgressbar";

const PlayerScreen = () => {
  const backgroundColor = useColor('background');
  const textColor = useColor('text');
  
  const {currentTrack} = useAudio()
  const {imageColors} = usePlayerBackground(currentTrack?.image_url ?? unknownTrackImageUri)
  
  const {top, bottom} = useSafeAreaInsets()

  //const {isFavorite, toggleFavorite} = useTrackPlayerFavorite()
  if (!currentTrack) {
    return (
      <View style={[styles.container, {justifyContent: 'center', backgroundColor}]}>
        <ActivityIndicator color={textColor}/>
      </View>
    )
  }
  
  return (
    <LinearGradient
      style={{flex: 1}}
      colors={imageColors ? [imageColors.background, imageColors.primary] : [backgroundColor, backgroundColor]}
    >
      <View style={styles.overlayContainer}>
        <DismissPlayerSymbol/>
        
        <View style={{flex: 1, marginTop: top + 70, marginBottom: bottom}}>
          <View style={styles.artworkImageContainer}>
            <Image
              source={{uri: currentTrack.image_url ?? unknownTrackImageUri}}
              priority="high"
              containerStyle={styles.artworkImage}
            />
          </View>
          
          <View style={{flex: 1}}>
            <View>
              <View style={{paddingVertical: 24}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {/* Track title */}
                  <View style={styles.trackTitleContainer}>
                    <MovingText
                      text={currentTrack.title ?? ''}
                      animationThreshold={30}
                      style={styles.trackTitleText}
                    />
                  </View>
                  
                  {/* Favorite button icon */}
                  <FontAwesome
                    name={'times'}
                    size={20}
                    color={textColor}
                    style={{marginHorizontal: 14}}
                    onPress={() => {
                    }}
                  />
                </View>
                
                {/* Track artist */}
                {currentTrack.artist && (
                  <Text numberOfLines={1}
                        style={[styles.trackArtistText, {color: textColor, marginTop: 6, fontSize: 20}]}>
                    {currentTrack.artist}
                  </Text>
                )}
              </View>
              
               <PlayerProgressBar style={{marginTop: 16}}/>
              
              <PlayerControls style={{marginTop: 40}}/>
            </View>
            
            {/* <PlayerVolumeBar style={{marginTop: 'auto', marginBottom: 30}}/>
           */}
            <View style={styles.centeredRow}>
              {/*<PlayerRepeatToggle size={30} style={{marginBottom: 6}}/>*/}
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

const DismissPlayerSymbol = () => {
  const {top} = useSafeAreaInsets()
  
  return (
    <View
      style={{
        position: 'absolute',
        top: top + 8,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <View
        accessible={false}
        style={{
          width: 50,
          height: 8,
          borderRadius: 8,
          backgroundColor: '#fff',
          opacity: 0.7,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayContainer: {
    ...defaultStyles.container,
    paddingHorizontal: screenPadding.horizontal,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  artworkImageContainer: {
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 11.0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 48,
    paddingVertical: 24,
  },
  artworkImage: {
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
    aspectRatio: 1
  },
  trackTitleContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  trackTitleText: {
    ...defaultStyles.text,
    fontSize: 22,
    fontWeight: '700',
  },
  trackArtistText: {
    ...defaultStyles.text,
    fontSize: fontSize.base,
    opacity: 0.8,
    maxWidth: '90%',
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default PlayerScreen
