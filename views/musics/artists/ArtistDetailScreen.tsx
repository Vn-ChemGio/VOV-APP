import {View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {Redirect, useLocalSearchParams} from 'expo-router'

import {defaultStyles} from '@/styles'
import {useColor} from "@/hooks/useColor";
import {useArtists} from './hooks'
import {ArtistTracksList} from '../components'

export const ArtistDetailScreen = () => {
  const backgroundColor = useColor('background')
  const {id: artistId} = useLocalSearchParams<{ id: string }>()
  
  const {artists} = useArtists()
  
  const artist = artists.find((artist) => artist.id.toString() === artistId)
  
  if (!artist) {
    console.warn(`Artist ${artistId} not found!`)
    
    return <Redirect href={'/musics/(tabs)/artists'}/>
  }
  
  return (
    <View style={[defaultStyles.container, {backgroundColor}]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{paddingHorizontal: 16}}
      >
        <ArtistTracksList artist={artist}/>
      </ScrollView>
    </View>
  )
}
