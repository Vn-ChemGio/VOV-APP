import React from 'react';
import {Dimensions, StyleSheet} from "react-native";
import {PauseIcon, PlayIcon} from "lucide-react-native";
import {Track, useActiveTrack, useIsPlaying} from "react-native-track-player";
import {View} from "@/components/ui/view";
import {Image} from "@/components/ui/image";
import {Button} from "@/components/ui/button";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useColor} from "@/hooks/useColor";
import {Podcast} from "@/types";

const {width: screenWidth} = Dimensions.get('window');

const CardPodCast = (item: Podcast & Track & {
  handleTrackSelect: (selectedTrack: Track) => void;
}) => {
  const backgroundColor = useColor('background');
  const {playing} = useIsPlaying()
  
  const activeTrackUrl = useActiveTrack()?.url;
  
  
  return (
    <Card style={styles.card}>
      <View style={styles.cardImageWrapper}>
        <Image source={{uri: item.image_url}}
               contentFit="cover"
               variant="default"
               containerStyle={styles.cardImageContainer}
               style={styles.cardImage}
        />
        {/* Play button centered on image */}
        <View style={styles.cardCTAWrapper}>
          <Button
            size="icon"
            variant="outline"
            icon={
              ((activeTrackUrl === item.url) && playing) ? () => <PauseIcon
                  color={backgroundColor} size={32}
                  strokeWidth={2}/>
                : () => <PlayIcon color={backgroundColor} size={32} strokeWidth={2}/>
            }
            onPress={() => item.handleTrackSelect(item)}
            disabled={activeTrackUrl === item.url && playing}
            style={[styles.cardCTAButton, {borderColor: backgroundColor}]}
          />
        </View>
      
      </View>
      <CardHeader style={{paddingHorizontal: 12, flex: 1, paddingVertical: 0}}>
        <CardTitle style={{fontSize: 14}}>{item.title}</CardTitle>
        <CardDescription style={{fontSize: 12}}>
          {item.description}
        </CardDescription>
      </CardHeader>
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
    height: screenWidth * 2 / 3 * 9 / 16,
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
  
  cardCTAWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardCTAButton: {
    width: 72,
    height: 72,
    borderWidth: 4,
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
  }
})

export default CardPodCast;