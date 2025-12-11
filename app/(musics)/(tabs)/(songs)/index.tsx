import { TracksList } from '@/components/TracksList'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useTracks } from '@/store/library'

import { useMemo } from 'react'
import { ScrollView, View } from 'react-native'
import {useColor} from "@/hooks/useColor";

const SongsScreen = () => {
  const backgroundColor = useColor('background');
	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in songs',
		},
	})

	const tracks = useTracks()

	const filteredTracks = useMemo(() => {
		if (!search) return tracks

		return tracks.filter(trackTitleFilter(search))
	}, [search, tracks])

	return (
		<View style={{
      flex: 1,
      backgroundColor,
    }}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: 24 }}
			>
				<TracksList
					id={generateTracksListId('songs', search)}
					tracks={filteredTracks}
					scrollEnabled={false}
				/>
			</ScrollView>
		</View>
	)
}

export default SongsScreen
