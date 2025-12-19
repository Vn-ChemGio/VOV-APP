import {MediaContent, Podcast, RadioChannel} from "@/types";

export const radioChannelToMediaContent = (item: RadioChannel): MediaContent => ({
  ...item,
  type: 'radio',
  image_url: item.image_url ?? 'https://picsum.photos/id/1002/500/300',
});


export const podcastToMediaContent = (item: Podcast): MediaContent => ({
  ...item,
  type: 'podcast',
  image_url: item.image_url ?? 'https://picsum.photos/id/1002/500/300',
});