import React, { useState } from 'react';
import { Text } from '@/components/ui/text';
import { ScrollView } from '@/components/ui/scroll-view';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { View } from '@/components/ui/view';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { PauseIcon, PlayIcon } from 'lucide-react-native';
import { useColor } from '@/hooks/useColor';
import { Dimensions } from 'react-native';

export interface PodcastItem {
    id: number;
    title: string;
    description: string;
    image_url: string;
    source_url: string;
}
const {width: screenWidth} = Dimensions.get('window');

const PodCasts = ({data = []}: {data?: PodcastItem[]}) => {
  const backgroundColor = useColor('background');
  const borderColor = useColor('border');
  
  // State to track which podcast item is being played (for blur view)
  const [playingPodcastIndex, setPlayingPodcastIndex] = useState<number | null>(null);
  
  return (
    <View style={{paddingHorizontal: 16, paddingVertical: 16, gap: 12, backgroundColor}}>
      <Text variant="subtitle" style={{fontSize: 18}}>
        Podcast mới
      </Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{gap: 16}}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item, i) => (
          <Card
            key={i}
            style={{
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
            }}
          >
            <View
              style={{
                position: 'relative',
                width: '100%',
                height: screenWidth * 2 / 3 * 9 / 16,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                overflow: 'hidden',
              }}
            >
              <Image source={{uri: item.image_url}}
                     contentFit="cover"
                     variant="default"
                     containerStyle={{
                       width: '100%',
                       height: '100%',
                       borderTopLeftRadius: 12,
                       borderTopRightRadius: 12,
                       borderBottomLeftRadius: 0,
                       borderBottomRightRadius: 0,
                     }}
                     style={{
                       borderTopLeftRadius: 12,
                       borderTopRightRadius: 12,
                       borderBottomLeftRadius: 0,
                       borderBottomRightRadius: 0,
                     }}
              />
              {/* Play button centered on image */}
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  size="icon"
                  variant="outline"
                  icon={
                    playingPodcastIndex === i
                      ? () => <PauseIcon color={backgroundColor} size={32} strokeWidth={2}/>
                      : () => <PlayIcon color={backgroundColor} size={32} strokeWidth={2}/>
                  }
                  onPress={() => {
                    setPlayingPodcastIndex(playingPodcastIndex === i ? null : i);
                  }}
                  style={{
                    width: 72,
                    height: 72,
                    borderWidth: 4,
                    borderColor: borderColor,
                  }}
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
        ))}
      </ScrollView>
    </View>
  );
};

export default PodCasts;