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
    is_liked: boolean;
    likes: number;
    comments: number;
}

export type RadioChannel = {
    image_url: string;
    source_url: string;
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
    description: string;
    image_url: string;
    source_url: string;
}