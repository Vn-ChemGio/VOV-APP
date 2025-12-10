import React from 'react';
import {Dimensions, Pressable, StyleSheet} from 'react-native';
import {BlurView} from "expo-blur";
import {Ionicons} from "@expo/vector-icons";
import {Card} from "@/components/ui/card";
import {View} from "@/components/ui/view";
import {Image} from "@/components/ui/image";
import {useColor} from "@/hooks/useColor";
import {Hoverable} from "@/contexts/hover/HoveredContext";
import {RadioChannel} from "@/types";
import {Track, useActiveTrack, useIsPlaying} from "react-native-track-player";
import appConfig from "@/configs/app.config";

const {width: screenWidth} = Dimensions.get('window');

const CardRadioChannel = (item: RadioChannel & Track & {
  handleTrackSelect: (selectedTrack: Track) => void,
  idx: number
}) => {
  const borderColor = useColor('border');
  
  const {playing} = useIsPlaying()
  
  const activeTrackUrl = useActiveTrack()?.url;
  
  return (
    <Card style={[styles.card, {borderColor}]}>
      <Hoverable hoveredValue={item.idx}>
        {(isHovered, setHovered) => (
          <>
            {/* Overlay to dismiss hover when isHovered */}
            {isHovered && (
              <Pressable
                onPress={() => setHovered(false)}
                style={{position: 'absolute', inset: 0, zIndex: 10}}
                pointerEvents="box-none"   // <-- change this line
              >
                {/* empty overlay */}
              </Pressable>
            )}
            <Pressable
              style={{flex: 1, width: '100%', height: '100%'}}
              onPress={() => setHovered(true)}
            >
              <Image
                source={{uri: `${appConfig.apiPrefix}${item.image_url}`}}
                height={(screenWidth - 16 * 2 - 8 * 2) / 3}
                contentFit="cover"
                style={styles.contentContainer}
              />
              {isHovered && (
                <View style={styles.contentContainerHoveredWrapper}>
                  <BlurView style={{...StyleSheet.absoluteFillObject, zIndex: 1,}} intensity={25} tint="dark"/>
                  <View style={styles.contentContainerHovered}>
                    <Pressable
                      onPress={() => item.handleTrackSelect(item)} style={styles.onPress}
                      disabled={activeTrackUrl === item.url && playing}
                    >
                      <Ionicons name={(activeTrackUrl === item.url) && playing ? "pause-circle" : "play-circle"}
                                size={48} color="#fff" style={{opacity: 0.9}}/>
                    </Pressable>
                  </View>
                </View>
              )}
            </Pressable>
          </>
        )}
      </Hoverable>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: (screenWidth - 16 * 2 - 8 * 2) / 3,
    height: (screenWidth - 16 * 2 - 8 * 2) / 3,
    padding: 0,
    overflow: 'hidden',
    borderWidth: 1,
    aspectRatio: 1,
    position: 'relative',
  },
  contentContainer: {aspectRatio: 1, width: '100%', height: '100%'},
  contentContainerHoveredWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    pointerEvents: 'auto',
    zIndex: 11,
  },
  contentContainerHovered: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  onPress: {
    borderRadius: 9999, overflow: 'hidden'
  }
})
export default CardRadioChannel;