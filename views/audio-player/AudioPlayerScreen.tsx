import {ActivityIndicator, Platform, StyleSheet} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {LinearGradient} from 'expo-linear-gradient'

import {unknownTrackImageUri} from '@/constants/images'
import {useAudio, useColor, useColorScheme, usePlayerBackground} from '@/hooks'
import {Image} from "@/components/ui/image";
import {Text} from "@/components/ui/text";
import {View} from "@/components/ui/view";

import {MovingText, PlayerControls, PlayerProgressbar, PlayerVolumeBar, SheetRadioSchedules} from './components';
import {useHeaderHeight} from "@react-navigation/elements";
import {
  ArrowBigDownIcon,
  ArrowLeftIcon,
  ChevronDownCircleIcon,
  ClosedCaptionIcon,
  PanelBottomCloseIcon
} from "lucide-react-native";
import {Button} from "@/components/ui/button";
import React from "react";
import {useNavigation} from "expo-router";


export const AudioPlayerScreen = () => {
  const theme = useColorScheme() ?? 'light';
  const backgroundColor = useColor('background');
  const mutedColor = useColor('muted');
  const mutedForegroundColor = useColor('mutedForeground');
  const textColor = useColor('text');
  const {currentContent} = useAudio()
  const {imageColors} = usePlayerBackground(currentContent?.image_url ?? unknownTrackImageUri)
  
  const {top, bottom} = useSafeAreaInsets()
  //const {isFavorite, toggleFavorite} = useTrackPlayerFavorite()
  if (!currentContent) {
    return (
      <View style={[styles.container, {justifyContent: 'center', backgroundColor}]}>
        <ActivityIndicator color={textColor}/>
      </View>
    )
  }
  
  return (
    <LinearGradient
      style={{flex: 1}}
      colors={imageColors ?
        (
          imageColors.platform == 'ios'
            ? [imageColors.background, imageColors.primary] :
            theme == 'light'
              ? [imageColors.muted, imageColors.lightMuted]
              : [imageColors.muted, imageColors.darkMuted]
        )
        : [mutedColor, mutedForegroundColor]
      }
    >
      <View style={{
        ...styles.overlayContainer,
        backgroundColor: theme === 'light' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)'
      }}>
        <DismissPlayerSymbol/>
        
        <View style={{flex: 1, marginTop: top + 20, marginBottom: bottom}}>
          <View style={styles.artworkImageContainer}>
            <Image
              source={{uri: currentContent.image_url ?? unknownTrackImageUri}}
              priority="high"
              containerStyle={styles.artworkImage}
            />
          </View>
          
          <View style={{flex: 1, gap: 30}}>
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
                      text={currentContent.title ?? ''}
                      animationThreshold={30}
                      style={styles.trackTitleText}
                    />
                  </View>
                  
                  {/* Favorite button icon */}
                  {currentContent.type === 'radio' ? <SheetRadioSchedules/> : null}
                </View>
                
                {/* Track artist */}
                {currentContent.artist && (
                  <Text numberOfLines={1}
                        style={[styles.trackArtistText, {marginTop: 6, fontSize: 20}]}>
                    {currentContent.artist}
                  </Text>
                )}
              </View>
              
              <PlayerProgressbar style={{marginTop: 16}}/>
              
              <PlayerControls style={{marginTop: 40}}/>
            </View>
            
            <PlayerVolumeBar style={{marginTop: 'auto', marginBottom: 30}}/>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}

const DismissPlayerSymbol = () => {
  const {top} = useSafeAreaInsets()
  const navigation = useNavigation()
  return (
    <View
      style={{
        position: 'absolute',
        top: top + 8,
        left: 12,
        right: 12,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}
    >
      
          <Button size='icon' variant='link'
                  icon={ChevronDownCircleIcon}
                  onPress={() => {
                    if (navigation.canGoBack()) {
                      navigation.goBack();
                    }
                  }}
                  animation={true}
                  style={{
                    height: 32,
                    width: 32,
                    padding: 8,
                    flexDirection: 'row-reverse',
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
    paddingHorizontal: 16,
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
    fontSize: 22,
    fontWeight: '700',
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
