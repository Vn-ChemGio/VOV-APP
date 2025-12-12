import {ArtistTracksList} from '@/components/ArtistTracksList'
import {screenPadding} from '@/constants/tokens'
import {useArtists} from './hooks'
import {defaultStyles} from '@/styles'
import {Redirect, useLocalSearchParams} from 'expo-router'
import {View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'

export const ArtistDetailScreen = () => {
  const {id: artistId} = useLocalSearchParams<{ id: string }>()
  
  const {artists} = useArtists()
  
  const artist = artists.find((artist) => artist.id.toString() === artistId)

  if (!artist) {
    console.warn(`Artist ${artistId} not found!`)
    
    return <Redirect href={'/musics/(tabs)/artists'}/>
  }
  
  return (
    <View style={defaultStyles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{paddingHorizontal: screenPadding.horizontal}}
      >
        <ArtistTracksList artist={artist}/>
      </ScrollView>
    </View>
  )
}
