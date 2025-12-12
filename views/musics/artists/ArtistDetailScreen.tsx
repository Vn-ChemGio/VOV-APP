import {ArtistTracksList} from '@/components/ArtistTracksList'
import {useArtists} from './hooks'
import {defaultStyles} from '@/styles'
import {Redirect, useLocalSearchParams} from 'expo-router'
import {View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {useColor} from "@/hooks/useColor";

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
    <View style={[defaultStyles.container, { backgroundColor }]}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{paddingHorizontal: 12}}
      >
        <ArtistTracksList artist={artist}/>
      </ScrollView>
    </View>
  )
}
