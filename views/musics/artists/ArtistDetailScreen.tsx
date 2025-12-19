import {View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {Redirect, useLocalSearchParams} from 'expo-router'

import {useColor} from "@/hooks";
import {useArtists} from './hooks'
import {ArtistSongsList} from '../components'

export const ArtistDetailScreen = () => {
  const backgroundColor = useColor('background')
  const {id: artistId} = useLocalSearchParams<{ id: string }>()
  
  const {artists} = useArtists()
  
  const artist = artists.find((artist) => artist.id.toString() === artistId)
  
  if (!artist) {
    console.warn(`Artist ${artistId} not found!`)
    
    return <Redirect href={'/musics/artists'}/>
  }
  
  return (
    <View style={{flex: 1, backgroundColor}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{paddingHorizontal: 16}}
      >
        <ArtistSongsList artist={artist}/>
      </ScrollView>
    </View>
  )
}
