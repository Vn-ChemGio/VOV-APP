import useSWR from "swr";
import {useArtistsStore} from "../stores";
import {Artist} from "@/types";
import {apiGetMusicArtists} from "@/services/AppService";

export const useArtists = () => {
  const {artists, total, setOptions} = useArtistsStore()
  const {isLoading, isValidating} = useSWR<[Artist[], number]>(
    ['music-artists'],
    apiGetMusicArtists,
    {
      revalidateOnFocus: false,
      revalidateIfStale:false,
      onSuccess: (data) => {
        setOptions(data)
      }
    })
  
  return {artists, total, isLoading: isLoading || isValidating}
}