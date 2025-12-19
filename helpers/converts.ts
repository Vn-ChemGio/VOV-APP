import {Artist, MediaContent, MusicCategory, MusicSong, Podcast, RadioChannel} from "@/types";
import appConfig from "@/configs/app.config";
import {unknownTrackImageUri} from "@/constants/images";

export const radioChannelToMediaContent = (item: RadioChannel): MediaContent => ({
  ...item,
  type: 'radio',
  image_url: item.image_url ?? 'https://picsum.photos/id/1002/500/300',
  artist: item.author,
});


export const podcastToMediaContent = (item: Podcast): MediaContent => ({
  ...item,
  type: 'podcast',
  image_url: item.image_url ?? 'https://picsum.photos/id/1002/500/300',
  artist: item.author,
});

export const musicSongToMediaContent = (item: MusicSong): MediaContent => ({
  ...item,
  type: 'music',
  artist: item.artist?.name,
});

export const cleanMusicSongs = (songs: MusicSong[]): MusicSong[] => songs.filter(song => song.source_url).map(item => ({
  ...item,
  source_url: `${appConfig.mediaHost}${item.source_url}`,
  image_url: item.image_url ? `${appConfig.mediaHost}${item.image_url}` : item.image_url ?? unknownTrackImageUri,
}))
