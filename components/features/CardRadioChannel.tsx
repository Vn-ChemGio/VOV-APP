import React from 'react';
import {Dimensions, Pressable, StyleSheet} from 'react-native';
import {BlurView} from "expo-blur";
import {Ionicons} from "@expo/vector-icons";
import {Card} from "@/components/ui/card";
import {View} from "@/components/ui/view";
import {Image} from "@/components/ui/image";
import {Text} from "@/components/ui/text";

import {useAudio, useColor} from "@/hooks";

import {Hoverable} from "@/contexts/hover/HoveredContext";

import {RadioChannel} from "@/types";

const {width: screenWidth} = Dimensions.get('window');

const CardRadioChannel = (item: RadioChannel & {
  handleChannelSelect: (selectedChannel: RadioChannel) => void,
  idx: number
  image_url: string;
}) => {
  const borderColor = useColor('border');
  
  const {isPlaying, currentContent} = useAudio();
  
  const activeTrackUrl = currentContent?.source_url;
  
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
              <View style={{position: 'relative', width: '100%', height: '100%'}}>
                <Image
                  source={{uri: item.image_url}}
                  height={(screenWidth - 16 * 2 - 8 * 2) / 3}
                  contentFit="cover"
                  containerStyle={styles.contentContainer}
                />
                <View style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0.70)',
                  borderRadius: 12,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  zIndex: 20,
                }}>
                  <View style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginRight: 5,
                    backgroundColor: item.is_online ? '#2ecc40' : '#bbb' // green for online, gray for offline
                  }}/>
                  <View>
                    <Text style={{color: '#fff', fontSize: 10, fontWeight: '500'}}>
                      {item.is_online ? 'Online' : 'Offline'}
                    </Text>
                  </View>
                </View>
              </View>
              {isHovered && (
                <View style={styles.contentContainerHoveredWrapper}>
                  <BlurView style={{...StyleSheet.absoluteFillObject, zIndex: 1,}} intensity={25} tint="dark"/>
                  <View style={styles.contentContainerHovered}>
                    <Pressable
                      onPress={() => item.handleChannelSelect(item)} style={styles.onPress}
                      disabled={activeTrackUrl === item.source_url && isPlaying || !item.is_online}
                    >
                      <Ionicons
                        name={(activeTrackUrl === item.source_url) && isPlaying ? "pause-circle" : "play-circle"}
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