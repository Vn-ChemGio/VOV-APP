import React, {useMemo} from 'react'
import {ScrollView} from 'react-native'

import {View} from '@/components/ui/view';

import {cleanMusicSongs, generateTracksListId, trackTitleFilter} from '@/helpers'
import {useColor, useNavigationSearch} from "@/hooks";

import LoadingScreen from "@/components/features/loading-screen";

import {SongsList} from '../components'

import {useSongs} from "./hooks";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useHeaderHeight} from "@react-navigation/elements";

export const SongsScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Find in songs',
    },
  })
  const backgroundColor = useColor('background')
  const {songs, isLoading} = useSongs()
  const top = useHeaderHeight();
  
  const filteredTracks = useMemo(() => {
    if (!search) return cleanMusicSongs(songs)
    
    return cleanMusicSongs(songs.filter(trackTitleFilter(search)))
  }, [search, songs])
  
  return (
    <View style={{flex: 1, backgroundColor, paddingTop: top}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{paddingHorizontal: 16}}
      >
        {isLoading ? <LoadingScreen/> :
          <SongsList
            id={generateTracksListId('songs', search)}
            songs={filteredTracks}
            scrollEnabled={false}
          />}
      </ScrollView>
    </View>
  )
}
