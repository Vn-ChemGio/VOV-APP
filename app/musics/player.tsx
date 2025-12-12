import {MovingText} from '@/components/MovingText'
import {PlayerControls} from '@/components/PlayerControls'
import {PlayerProgressBar} from '@/components/PlayerProgressbar'
// import {PlayerRepeatToggle} from '@/components/PlayerRepeatToggle'
import {PlayerVolumeBar} from '@/components/PlayerVolumeBar'
import {unknownTrackImageUri} from '@/constants/images'

import {usePlayerBackground} from '@/hooks/usePlayerBackground'
import {useTrackPlayerFavorite} from '@/hooks/useTrackPlayerFavorite'
import {FontAwesome} from '@expo/vector-icons'
import {LinearGradient} from 'expo-linear-gradient'
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useActiveTrack} from 'react-native-track-player'
import {useColor} from "@/hooks/useColor";
import {Image} from "@/components/ui/image";

const PlayerScreen = () => {
  const backgroundColor = useColor('background');
  const textColor = useColor('text');
  const primaryColor = useColor('primary');
  
  const activeTrack = useActiveTrack()
  const {imageColors} = usePlayerBackground(activeTrack?.artwork ?? unknownTrackImageUri)
  
  const {top, bottom} = useSafeAreaInsets()
  
  const {isFavorite, toggleFavorite} = useTrackPlayerFavorite()
  
  if (!activeTrack) {
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
      <View style={[styles.overlayContainer, {
        backgroundColor,
        opacity: 0.95,
      }]}>
        <DismissPlayerSymbol/>
        
        <View style={{flex: 1, marginTop: top + 70, marginBottom: bottom}}>
          <View style={styles.artworkImageContainer}>
            <Image source={{uri: activeTrack.artwork ?? unknownTrackImageUri}} priority="high"/>
          </View>
          
          <View style={{flex: 1}}>
            <View style={{marginTop: 'auto'}}>
              <View style={{height: 60}}>
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
                      text={activeTrack.title ?? ''}
                      animationThreshold={30}
                      style={{
                        color: textColor, fontSize: 22,
                        fontWeight: '700'
                      }}
                    />
                  </View>
                  
                  {/* Favorite button icon */}
                  <FontAwesome
                    name={isFavorite ? 'heart' : 'heart-o'}
                    size={20}
                    color={isFavorite ? primaryColor : textColor}
                    style={{marginHorizontal: 14}}
                    onPress={toggleFavorite}
                  />
                </View>
                
                {/* Track artist */}
                {activeTrack.artist && (
                  <Text numberOfLines={1}
                        style={[styles.trackArtistText, {color: textColor, marginTop: 6, fontSize: 20}]}>
                    {activeTrack.artist}
                  </Text>
                )}
              </View>
              
              <PlayerProgressBar style={{marginTop: 32}}/>
              
              <PlayerControls style={{marginTop: 40}}/>
            </View>
            
            <PlayerVolumeBar style={{marginTop: 'auto', marginBottom: 30}}/>
            
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
    flex: 1,
    paddingHorizontal: 24,
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
    height: '45%',
  },
  artworkImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
  },
  trackTitleContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  
  trackArtistText: {
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
