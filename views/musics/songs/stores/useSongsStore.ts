import {create} from 'zustand';
import {MusicSong, TableQueries} from "@/types";

type MusicSongsQueries = TableQueries & {};

export const initialQueries: MusicSongsQueries = {
  pageIndex: 1,
  pageSize: 10,
  query: '',
  sort: {
    order: '',
    key: '',
  },
};

export type MusicSongsState = {
  tableQueries: MusicSongsQueries;
  songs: MusicSong[];
  total: number;
};

type MusicSongsAction = {
  setTableQueries: (payload: MusicSongsQueries) => void;
  setOptions: (payload: [MusicSong[], number]) => void;
};

const initialState: MusicSongsState = {
  tableQueries: initialQueries,
  songs: [],
  total: 0,
};

export const useSongsStore = create<MusicSongsState & MusicSongsAction>((set) => ({
  ...initialState,
  setTableQueries: (payload) => set((state) => ({...state, tableQueries: payload})),
  setOptions: ([options, total]) => set((state) => ({...state, songs: options, total})),
}));
