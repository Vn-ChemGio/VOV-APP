import {useRef} from 'react'
import {FlatList, FlatListProps} from 'react-native'
import {useQueue} from '@/store/queue'
import {utilsStyles} from '@/styles'
import {View} from "@/components/ui/view";
import {Text} from "@/components/ui/text";

import {QueueControls} from './QueueControls'
import {TracksListItem} from './TracksListItem'

import {Track} from "@/types";
import {useAudio} from "@/contexts/audio/AudioProvider";

export type TracksListProps = Partial<FlatListProps<Track>> & {
  id: string
  tracks: Track[]
  hideQueueControls?: boolean
}

export const TracksList = ({
                             id,
                             tracks,
                             hideQueueControls = false,
                             ...flatlistProps
                           }: TracksListProps) => {
  const queueOffset = useRef(0)
  const {activeQueueId, setActiveQueueId} = useQueue()
  const {playTrack} = useAudio()
  const handleTrackSelect = async (selectedTrack: Track) => {
    const trackIndex = tracks.findIndex((track) => track.uri === selectedTrack.uri)
    
    if (trackIndex === -1) return
    
    const isChangingQueue = id !== activeQueueId
    
    if (isChangingQueue) {
      const beforeTracks = tracks.slice(0, trackIndex)
      const afterTracks = tracks.slice(trackIndex + 1)
      await playTrack(selectedTrack, [selectedTrack].concat(afterTracks).concat(beforeTracks))
      
      queueOffset.current = trackIndex
      setActiveQueueId(id)
    } else {
      /* const nextTrackIndex =
         trackIndex - queueOffset.current < 0
           ? tracks.length + trackIndex - queueOffset.current
           : trackIndex - queueOffset.current
       
       await TrackPlayer.skip(nextTrackIndex)
       TrackPlayer.play()*/
    }
  }
  
  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{paddingTop: 10}}
      ListHeaderComponent={
        !hideQueueControls ? (
          <QueueControls tracks={tracks} style={{paddingBottom: 20}}/>
        ) : undefined
      }
      ListFooterComponent={() => (
        <View style={{...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: tracks.length ? 60 : 0}}/>
      )}
      ItemSeparatorComponent={() => (
        <View style={{...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: tracks.length ? 60 : 0}}/>
      )}
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles.emptyContentText}>No songs found</Text>
        </View>
      }
      renderItem={({item: track}) => (
        <TracksListItem track={track} onTrackSelect={handleTrackSelect}/>
      )}
      {...flatlistProps}
    />
  )
}
