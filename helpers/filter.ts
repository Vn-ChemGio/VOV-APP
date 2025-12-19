import {Artist, MusicCategory} from "@/types";

export const trackTitleFilter = (title: string) => (track: any) =>
	track.name?.toLowerCase().includes(title.toLowerCase())

export const artistNameFilter = (name: string) => (artist: Artist) =>
	artist.name.toLowerCase().includes(name.toLowerCase())

export const categoryNameFilter = (name: string) => (category: MusicCategory) =>
	category.name.toLowerCase().includes(name.toLowerCase())
