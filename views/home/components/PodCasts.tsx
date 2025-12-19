import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from '@/components/ui/text';
import {ScrollView} from '@/components/ui/scroll-view';
import {View} from '@/components/ui/view';

import CardPodCast from "@/components/features/CardPodCast";

import {useAudio, useColor} from '@/hooks';

import {MediaContent, Podcast} from "@/types";
import {PADDING_BOTTOM} from "@/theme/globals";
import {HoveredProvider} from "@/contexts/hover/HoveredContext"
import {podcastToMediaContent} from "@/helpers";

export const PodCasts = ({data = []}: { data?: Podcast[] }) => {
  const backgroundColor = useColor('background');
  
  const {playContent} = useAudio();
  const contents: MediaContent[] = data.map(item => podcastToMediaContent(item));
  
  const handlePodcastSelect = async (selectedPodcast: Podcast) => {
    await playContent(podcastToMediaContent(selectedPodcast), contents)
  }
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text variant="subtitle" style={styles.title}>Podcast mới</Text>
      
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
      >
        <HoveredProvider>
          {data.map((item, idx) => (
            <CardPodCast {...{
              ...item,
              idx,
              handlePodcastSelect
            }} key={`podcast-${idx}`}/>
          ))}
        </HoveredProvider>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 16, gap: 12,
    paddingBottom: PADDING_BOTTOM,
  },
  title: {
    fontSize: 18, paddingHorizontal: 16
  },
  contentContainer: {
    gap: 16, paddingHorizontal: 16, paddingBottom: 12
  },
})
