import React, {useRef} from 'react';
import {StyleSheet} from 'react-native';
import TrackPlayer, {Track} from "react-native-track-player";
import {View} from '@/components/ui/view';
import {Text} from '@/components/ui/text';
import {useColor} from '@/hooks/useColor';
import CardRadioChannel from "@/components/features/CardRadioChannel";
import {HoveredProvider} from '@/contexts/hover/HoveredContext';
import {RadioChannel} from "@/types";
import {useQueue} from "@/stores/queue";
import appConfig from "@/configs/app.config";

export const RadioChannels = ({data = []}: { data?: RadioChannel[] }) => {
  const backgroundColor = useColor('background');
  
  const {activeQueueId, setActiveQueueId} = useQueue()
  const queueOffset = useRef(0)
  const tracks: Track[] = data.map(item => ({...item, url: item.source_url, artwork: `${appConfig.apiPrefix}${item.image_url}`, title: item.name}));
  
  const handleTrackSelect = async (selectedTrack: Track) => {
    const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.source_url)
    
    if (trackIndex === -1) return
    
    const isChangingQueue = `radio-home` !== activeQueueId
    
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
      setActiveQueueId(`radio-home`)
    } else {
      const nextTrackIndex =
        trackIndex - queueOffset.current < 0
          ? tracks.length + trackIndex - queueOffset.current
          : trackIndex - queueOffset.current
      
      await TrackPlayer.skip(nextTrackIndex)
      TrackPlayer.play()
    }
  }
  return (
    <HoveredProvider>
      <View style={[styles.container, {backgroundColor}]}>
        <Text variant="subtitle" style={styles.title}>Chương trình Radio</Text>
        <View style={styles.contentContainer}>
          <HoveredProvider>
            {tracks.map((item, idx) => (
              <CardRadioChannel id={0} name={""} image_url={""} source_url={""} {...{
                ...item,
                idx,
                handleTrackSelect
              }} key={`radio-${idx}`}/>
            ))}
          </HoveredProvider>
        </View>
      </View>
    </HoveredProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  title: {fontSize: 18},
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  }
})