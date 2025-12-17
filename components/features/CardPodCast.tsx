import React from 'react';
import {Dimensions, Pressable, StyleProp, StyleSheet, ViewStyle} from "react-native";
import {BlurView} from "expo-blur";
import {Ionicons} from "@expo/vector-icons";
import {View} from "@/components/ui/view";
import {Image} from "@/components/ui/image";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Podcast, Track} from "@/types";
import {Hoverable} from "@/contexts/hover/HoveredContext";

const {width: screenWidth} = Dimensions.get('window');

const CardPodCast = (item: Podcast & Track & {
  handleTrackSelect: (selectedTrack: Track) => void;
  idx: number;
} & { style?: StyleProp<ViewStyle> }) => {
  return (
    <Card style={[styles.card, item.style]}>
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
            <View style={styles.cardImageWrapper}>
              <Pressable
                style={{flex: 1, width: '100%', height: '100%'}}
                onPress={() => setHovered(true)}
              >
                <Image source={{uri: item.image_url}}
                       contentFit="cover"
                       variant="default"
                       containerStyle={styles.cardImageContainer}
                       style={styles.cardImage}
                />
                {isHovered && (
                  <View style={styles.contentContainerHoveredWrapper}>
                    <View style={{
                      position: 'absolute',
                      zIndex: 1,
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      overflow: 'hidden',
                      inset: 0
                    }}>
                      <BlurView
                        style={{flex: 1}}
                        intensity={5}
                        tint="dark"
                      />
                    </View>
                    <View style={styles.contentContainerHovered}>
                      <Pressable
                        onPress={() => item.handleTrackSelect(item)} style={styles.onPress}
                        //disabled={activeTrackUrl === item.url && playing}
                      >
                        <Ionicons name={true ? "pause-circle" : "play-circle"}
                                  size={48} color="#fff" style={{opacity: 0.9}}/>
                        
                        {/*   <Ionicons name={(activeTrackUrl === item.url) && playing ? "pause-circle" : "play-circle"}
                                  size={48} color="#fff" style={{opacity: 0.9}}/>*/}
                      </Pressable>
                    </View>
                  </View>
                )}
              </Pressable>
            </View>
            <CardHeader style={{paddingHorizontal: 12, flex: 1, paddingTop: 0, paddingBottom: 12}}>
              <CardTitle numberOfLines={2}>{item.title}</CardTitle>
              <CardDescription
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {item.description}
              </CardDescription>
            </CardHeader>
          </>
        )}
      </Hoverable>
    </Card>
  );
};


const styles = StyleSheet.create({
  card: {
    width: screenWidth * 2 / 3,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 12,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  cardImageWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: 16 / 9,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  cardImageContainer: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardImage: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardHeader: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardTitle: {fontSize: 14},
  cardDescription: {fontSize: 12},
  cardFooter: {
    paddingHorizontal: 12,
    marginTop: 0,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  badgeWrapper: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  
  contentContainerHoveredWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
    borderRadius: 12
  },
  onPress: {
    borderRadius: 9999, overflow: 'hidden'
  }
})

export default CardPodCast;