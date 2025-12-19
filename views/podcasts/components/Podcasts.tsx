import React from 'react';

import {View} from '@/components/ui/view';

import CardPodCast from "@/components/features/CardPodCast";
import LoadingScreen from "@/components/features/loading-screen";

import {HoveredProvider} from "@/contexts/hover/HoveredContext";

import {useAudio} from "@/hooks";
import {podcastToMediaContent} from "@/helpers";

import {usePodcasts} from "../hooks";

import {Podcast, MediaContent} from "@/types";

export const Podcasts = ({category_id}: { category_id: number }) => {
  const {isLoading, options} = usePodcasts(category_id);
  const {playContent} = useAudio();
  
  const contents: MediaContent[] = options.map(item => podcastToMediaContent(item));
  
  const handlePodcastSelect = async (selectedPodcast: Podcast) => {
    await playContent(podcastToMediaContent(selectedPodcast), contents)
  }
  return isLoading ? <LoadingScreen/> : (
    <View style={{paddingHorizontal: 16, paddingBottom: 120, gap: 16}}>
      <HoveredProvider>
        {(contents || [])?.map((item, idx) => (
          <CardPodCast {...{
            ...item,
            idx,
            handlePodcastSelect,
            style: {width: '100%'}
          }} key={`podcast-${idx}`}/>
        ))}
      </HoveredProvider>
    </View>
  )
}