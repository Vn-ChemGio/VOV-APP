import useSWR from "swr";
import {useSongsStore} from "../stores";
import {MusicSong} from "@/types";
import {apiGetMusicSongs} from "@/services/AppService";

export const useSongs = () => {
  const {songs, total, setOptions} = useSongsStore()
  const {isLoading, isValidating} = useSWR<[MusicSong[], number]>(
    ['music-songs'],
    apiGetMusicSongs,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      onSuccess: (data) => {
        setOptions(data)
      }
    })
  
  return {songs, total, isLoading: isLoading || isValidating}
}