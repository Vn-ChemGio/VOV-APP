import {useRef} from 'react'
import {FlatList, FlatListProps} from 'react-native'
import {useQueue} from '@/store/queue'
import {utilsStyles} from '@/styles'
import {View} from "@/components/ui/view";
import {Text} from "@/components/ui/text";

import {QueueControls} from './QueueControls'
import {SongsListItem} from './SongsListItem'

import {MusicSong} from "@/types";
import {useAudio} from "@/hooks";
import {musicSongToMediaContent} from "@/helpers";

export type SongsListProps = Partial<FlatListProps<MusicSong>> & {
  id: string
  songs: MusicSong[]
  hideQueueControls?: boolean
}

export const SongsList = ({
                             id,
                             songs,
                             hideQueueControls = false,
                             ...flatlistProps
                           }: SongsListProps) => {
  const queueOffset = useRef(0)
  const {activeQueueId, setActiveQueueId} = useQueue()
  const {playContent} = useAudio();
  
  const handleSongSelect = async (selectedSong: MusicSong) => {
    const trackIndex = songs.findIndex((song) => song.source_url === selectedSong.source_url)
    
    if (trackIndex === -1) return
    
    const isChangingQueue = id !== activeQueueId
    
    if (isChangingQueue) {
      const beforeTracks = songs.slice(0, trackIndex)
      const afterTracks = songs.slice(trackIndex + 1)
      await playContent(musicSongToMediaContent(selectedSong), ([selectedSong].concat(afterTracks).concat(beforeTracks)).map(song => musicSongToMediaContent(song)))
      
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
      data={songs}
      contentContainerStyle={{paddingTop: 10}}
      ListHeaderComponent={
        !hideQueueControls ? (
          <QueueControls songs={songs} style={{paddingBottom: 20}}/>
        ) : undefined
      }
      ListFooterComponent={() => (
        <View style={{...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: songs.length ? 60 : 0}}/>
      )}
      ItemSeparatorComponent={() => (
        <View style={{...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: songs.length ? 60 : 0}}/>
      )}
      ListEmptyComponent={
        <View>
          <Text style={utilsStyles.emptyContentText}>No songs found</Text>
        </View>
      }
      renderItem={({item: song}) => (
        <SongsListItem song={song} onSongSelect={handleSongSelect}/>
      )}
      {...flatlistProps}
    />
  )
}
