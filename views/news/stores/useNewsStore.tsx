import {create, type StateCreator} from 'zustand';
import {News, Podcast, TableQueries} from "@/types";


export type PodCastsQueries = TableQueries & {}

export const initialTablePostcastsData: PodCastsQueries = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
};

type PodcastsAction = {
    setTableData: (payload: PodCastsQueries) => void
    setOptions: (payload: [News[], number]) => void
}
export type PodcastsState = {
    tableData: PodCastsQueries,
    options: News[],
    total: number;
}

export type PodcastsStore =
    PodcastsState & PodcastsAction

const initialStatePodcast: PodcastsState = {
    tableData: initialTablePostcastsData,
    options: [],
    total: 0,
};

const createCustomizableOptionStore: StateCreator<PodcastsStore> = (
    set,
) => ({
    ...initialStatePodcast,
    setTableData: (payload) => set(() => ({tableData: payload})),
    
    setOptions: ([options, total]) => set((state) => ({...state, total, options})),
});

const buildStore = () => create<PodcastsStore>(createCustomizableOptionStore);

export const useNewsStore = buildStore();

const podcastStoresByCategoryId = new Map<
    number,
    ReturnType<typeof buildStore>
>();

export const getNewsStoreById = (customizable_id: number) => {
    if (!podcastStoresByCategoryId.has(customizable_id)) {
        podcastStoresByCategoryId.set(customizable_id, buildStore());
    }
    return podcastStoresByCategoryId.get(customizable_id)!;
};
