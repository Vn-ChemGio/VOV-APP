import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from '@/components/ui/text';
import {ScrollView} from '@/components/ui/scroll-view';
import {View} from '@/components/ui/view';
import CardPodCast from "@/components/features/CardPodCast";
import {useColor} from '@/hooks/useColor';
import {Podcast, Track} from "@/types";
import {PADDING_BOTTOM} from "@/theme/globals";
import {HoveredProvider} from "@/contexts/hover/HoveredContext";
import {useAudio} from "@/contexts/audio/AudioProvider";

export const PodCasts = ({data = [], id = 'all'}: { data?: Podcast[], id?: string }) => {
  const backgroundColor = useColor('background');
  
  const {playTrack} = useAudio();
  const tracks = data.map(item => ({...item, id: item.id.toString(), uri: item.source_url, artwork: item.image_url}));
  
  const handleTrackSelect = async (selectedTrack: Track) => {
    await playTrack(selectedTrack, tracks)
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
          {tracks.map((item, idx) => (
            <CardPodCast {...{
              ...item,
              idx,
              handleTrackSelect
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
