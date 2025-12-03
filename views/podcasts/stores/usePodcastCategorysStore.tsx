import {create} from 'zustand';
import {PodcastCategory, TableQueries} from "@/types";


export type PodCastCategoriesQueries = TableQueries & {}

export const initialTablePodcastCategoriesData: PodCastCategoriesQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
};

type PodcastCategoriesAction = {
    setTableData: (payload: PodCastCategoriesQueries) => void
    setOptions: (payload: PodcastCategory[]) => void
    setSelectedCategoryId: (payload: PodcastCategory['id']) => void
}
export type PodcastCategoriesState = {
    tableData: PodCastCategoriesQueries,
    categories: PodcastCategory[],
    selectedCategoryId: PodcastCategory['id'],
}

export type PodcastCategoriesStore =
    PodcastCategoriesState & PodcastCategoriesAction

const initialStateCategories: PodcastCategoriesState = {
    tableData: initialTablePodcastCategoriesData,
    categories: [],
    selectedCategoryId: 0,
};

export const usePodcastCategoriesStore = create<PodcastCategoriesStore>((set) => ({
    ...initialStateCategories,
    setTableData: (payload) => set((state) => ({...state, tableQueries: payload})),
    setOptions: (payload) => set((state) => ({...state, categories: payload, selectedCategoryId: 0})),
    setSelectedCategoryId: (payload) => set((state) => ({...state, selectedCategoryId: payload})),
}));
