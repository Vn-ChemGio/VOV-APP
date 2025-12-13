import React, {useMemo} from 'react'
import {ScrollView, View} from 'react-native'

import {LoadingOverlay} from "@/components/ui/spinner";

import {trackTitleFilter} from '@/helpers/filter'
import {generateTracksListId} from '@/helpers/miscellaneous'
import {useNavigationSearch} from '@/hooks/useNavigationSearch'
import {defaultStyles} from '@/styles'
import {useColor} from "@/hooks/useColor";

import {TracksList} from '../components'
import {useSongs} from "./hooks";
import appConfig from "@/configs/app.config";

export const SongsScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Find in songs',
    },
  })
  const backgroundColor = useColor('background')
  const {songs, isLoading} = useSongs()
  
  const filteredTracks = useMemo(() => {
    if (!search) return songs.map(song => ({
      ...song,
      url: `${appConfig.mediaHost}${song.source_url}`
    })).filter(track => track.source_url)
    
    return songs.filter(trackTitleFilter(search)).map(song => ({
      ...song,
      url: `${appConfig.mediaHost}${song.source_url}`
    })).filter(track => track.source_url)
  }, [search, songs])
 
  return (
    <View style={[defaultStyles.container, {backgroundColor}]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{paddingHorizontal: 16}}
      >
        {isLoading ? <LoadingOverlay visible={true}/> :
          <TracksList
            id={generateTracksListId('songs', search)}
            tracks={filteredTracks}
            scrollEnabled={false}
          />}
      </ScrollView>
    </View>
  )
}
