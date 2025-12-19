import {LucideIcon} from "lucide-react-native";

declare module '*.png'
declare module '*.jpg'

export type TableQueries = {
  total?: number
  pageIndex?: number
  pageSize?: number
  query?: string
  status?: string
  sort?: {
    order: 'asc' | 'desc' | ''
    key: string | number
  }
}

export type Banner = {
  id: number;
  image_url: string;
  title?: string;
  description?: string;
}

export type Menu = {
  key: string;
  label: string;
  icon: LucideIcon;
}

export type Recommend = {
  key: string;
  image_url: string;
  title: string;
  description: string;
  source_url: string;
  is_liked: boolean;
  likes: number;
  comments: number;
  published_at: string;
}

export type RadioChannel = {
  id: number;
  title: string;
  description?: string;
  image_url: string;
  source_url: string;
  is_online: boolean;
  author?: string;
}

export type NewsCategory = {
  id: number;
  name?: string;
  is_active?: boolean;
  order?: number;
}
export type News = {
  key: string;
  title: string;
  description: string;
  image_url: string;
  published_at: string;
  source_url: string;
  is_liked: boolean;
  read: number;
  likes: number;
  comments: number;
  category?: NewsCategory;
}

export type PodcastCategory = {
  id: number;
  name?: string;
  is_active?: boolean;
  order?: number;
}

export type Podcast = {
  id: number;
  title: string;
  description?: string;
  image_url: string;
  source_url: string;
  author?: string;
}

export type MusicCategory = {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  songs: MusicSong[];
}
export type Artist = {
  id: number;
  name: string;
  description: string;
  avatar_url?: string;
  is_active: boolean;
  songs: MusicSong[];
}

export type MusicSong = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  source_url: string;
  artist?: Artist;
}

export type MediaContent = {
  type: 'music' | 'podcast' | 'radio',
  id: number;
  title: string;
  description?: string;
  author?: string;
  artist?: string;
  category?: string;
  image_url: string; //https://picsum.photos/id/1002/500/300
  source_url: string;
} & Record<string, any>