import React from "react";
import useSWR from "swr";
import {apiGetPodcastCategories, apiGetPodcasts} from "@/services/AppService";
import {Podcast, PodcastCategory} from "@/types"
import {getPodcastsStoreById, usePodcastCategoriesStore} from "../stores";

export const usePodcastCategories = () => {
    const {categories, setOptions, selectedCategoryId, setSelectedCategoryId} = usePodcastCategoriesStore()
    
    const {error, isLoading, isValidating, mutate} = useSWR<PodcastCategory[]>(
        [`/podcast-categories`],
        apiGetPodcastCategories,
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            suspense: true,
            onSuccess: (data) => {
                setOptions([{id: 0, name: 'Tất cả', order: 0} as PodcastCategory].concat(data));
            }
        },
    );
    return {
        categories,
        error,
        isLoading: isLoading || isValidating,
        selectedCategoryId,
        setSelectedCategoryId,
        mutate,
    }
}

export const usePodcast = (category_id: number) => {
    const customizableOptionStore = React.useMemo(
        () => getPodcastsStoreById(category_id),
        [category_id],
    );
    
    const {tableData, setTableData, setOptions, options, total} =
        customizableOptionStore();
    
    const {error, isLoading, mutate, isValidating} = useSWR<[Podcast[], number]>(
        [`/podcasts`, category_id, tableData],
        apiGetPodcasts,
        {
            revalidateOnFocus: false,
            revalidateIfStale: true,
            onSuccess: (data) => {
                setOptions(data);
            }
        },
    );
    
    return {
        error,
        isLoading: isLoading || isValidating,
        mutate,
        options,
        total,
        tableData,
        setTableData,
    }
};