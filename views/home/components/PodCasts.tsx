import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import TrackPlayer, {Track} from "react-native-track-player";
import {Text} from '@/components/ui/text';
import {ScrollView} from '@/components/ui/scroll-view';
import {View} from '@/components/ui/view';
import CardPodCast from "@/components/features/CardPodCast";
import {useColor} from '@/hooks/useColor';
import {useQueue} from "@/stores/queue";
import {Podcast} from "@/types";

export const PodCasts = ({data = [], id = 'all'}: { data?: Podcast[], id?: string }) => {
  const backgroundColor = useColor('background');
  
  const queueOffset = useRef(0)
  const {activeQueueId, setActiveQueueId} = useQueue()
  
  const tracks = data.map(item => ({...item, url: item.source_url, artwork: item.image_url}));
  
  const handleTrackSelect = async (selectedTrack: Track) => {
    
    const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.source_url)
    
    if (trackIndex === -1) return
    
    const isChangingQueue = id !== activeQueueId
    
    if (isChangingQueue) {
      const beforeTracks: Track[] = tracks.slice(0, trackIndex)
      const afterTracks: Track[] = tracks.slice(trackIndex + 1)
      
      await TrackPlayer.reset()
      
      // we construct the new queue
      await TrackPlayer.add(selectedTrack)
      await TrackPlayer.add(afterTracks)
      await TrackPlayer.add(beforeTracks)
      
      await TrackPlayer.play()
      
      queueOffset.current = trackIndex
      setActiveQueueId(id)
    } else {
      const nextTrackIndex =
        trackIndex - queueOffset.current < 0
          ? data.length + trackIndex - queueOffset.current
          : trackIndex - queueOffset.current
      
      await TrackPlayer.skip(nextTrackIndex)
      TrackPlayer.play()
    }
  }
  
  
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text variant="subtitle" style={styles.title}>Podcast mới</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
      >
        {tracks.map((item, i) => (
          <CardPodCast {...{
            ...item,
            handleTrackSelect
          }} key={`podcast-${i}`}/>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16, gap: 12
  },
  title: {
    fontSize: 18
  },
  contentContainer: {
    rowGap: 12
  }
})
