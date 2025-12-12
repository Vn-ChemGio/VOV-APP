import useSWR from "swr";
import {apiGetMusicCategories} from "@/services/AppService";
import {MusicCategory, MusicSong} from "@/types";
import {useCategoriesStore} from "../stores";

export const useCategories = () => {
  const {categories, total, setOptions} = useCategoriesStore()
  const {isLoading, isValidating} = useSWR<[(Omit<MusicCategory, 'songs'> & {
    song_categories: { song: MusicSong }[]
  })[], number]>(
    ['music-categories'],
    apiGetMusicCategories,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      onSuccess: (data) => {
        setOptions([data[0].map(({song_categories, ...rest}) => ({
          ...rest,
          songs: song_categories.map(({song}) => song)
        })), data[1]])
        
        
      }
    })
  
  return {categories, total, isLoading: isLoading || isValidating}
}