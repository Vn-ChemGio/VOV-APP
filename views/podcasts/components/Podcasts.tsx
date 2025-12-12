import React, {useRef} from 'react';
import {View} from '@/components/ui/view';
import {LoadingOverlay} from "@/components/ui/spinner";
import TrackPlayer, {Track} from "react-native-track-player";
import {useQueue} from "@/stores/queue";
import {usePodcasts} from "../hooks";
import CardPodCast from "@/components/features/CardPodCast";
import {HoveredProvider} from "@/contexts/hover/HoveredContext";

export const Podcasts = ({category_id}: { category_id: number }) => {
  const {isLoading, options} = usePodcasts(category_id);
  
  const {activeQueueId, setActiveQueueId} = useQueue()
  const queueOffset = useRef(0)
  
  const tracks = options.map(item => ({...item, url: item.source_url, artwork: item.image_url}));
  
  const handleTrackSelect = async (selectedTrack: Track) => {
    const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.source_url)
    
    if (trackIndex === -1) return
    
    const isChangingQueue = `podcast-${category_id}` !== activeQueueId
    
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
      setActiveQueueId(`podcast-${category_id}`)
    } else {
      const nextTrackIndex =
        trackIndex - queueOffset.current < 0
          ? tracks.length + trackIndex - queueOffset.current
          : trackIndex - queueOffset.current
      
      await TrackPlayer.skip(nextTrackIndex)
      TrackPlayer.play()
    }
  }
  
  return isLoading ? <LoadingOverlay visible={true}/> : (
    <View style={{paddingHorizontal: 16, paddingBottom: 120, gap: 16}}>
      <HoveredProvider>
        {(tracks || [])?.map((item, idx) => (
          <CardPodCast {...{
            ...item,
            idx,
            handleTrackSelect,
            style: {width: '100%'}
          }} key={`podcast-${idx}`}/>
        ))}
      </HoveredProvider>
    </View>
  )
}