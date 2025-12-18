import React from 'react';
import {View} from '@/components/ui/view';
import CardPodCast from "@/components/features/CardPodCast";
import LoadingScreen from "@/components/features/loading-screen";
import {HoveredProvider} from "@/contexts/hover/HoveredContext";
import {useAudio} from "@/contexts/audio/AudioProvider";
import {usePodcasts} from "../hooks";
import {Track} from "@/types";

export const Podcasts = ({category_id}: { category_id: number }) => {
  const {isLoading, options} = usePodcasts(category_id);
  const {playTrack} = useAudio();
  
  const tracks = options.map(item => ({
    ...item,
    id: item.id.toString(),
    uri: item.source_url,
    artwork: item.image_url
  }));
  
  const handleTrackSelect = async (selectedTrack: Track) => {
    await playTrack(selectedTrack, tracks)
  }
  
  return isLoading ? <LoadingScreen/> : (
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