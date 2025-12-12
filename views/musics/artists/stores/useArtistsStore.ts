import {create} from 'zustand';
import {Artist, TableQueries} from "@/types";

type ArtistsQueries = TableQueries & {};

export const initialQueries: ArtistsQueries = {
  pageIndex: 1,
  pageSize: 10,
  query: '',
  sort: {
    order: '',
    key: '',
  },
};

export type ArtistsState = {
  tableQueries: ArtistsQueries;
  artists: Artist[];
  total: number;
};

type ArtistsAction = {
  setTableQueries: (payload: ArtistsQueries) => void;
  setOptions: (payload: [Artist[], number]) => void;
};

const initialState: ArtistsState = {
  tableQueries: initialQueries,
  artists: [],
  total: 0,
};

export const useArtistsStore = create<ArtistsState & ArtistsAction>((set) => ({
  ...initialState,
  setTableQueries: (payload) => set((state) => ({...state, tableQueries: payload})),
  setOptions: ([options, total]) => set((state) => ({...state, artists: options, total})),
}));
