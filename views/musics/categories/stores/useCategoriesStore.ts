import {create} from 'zustand';
import {Artist, MusicCategory, TableQueries} from "@/types";

type CategoriesQueries = TableQueries & {};

export const initialQueries: CategoriesQueries = {
  pageIndex: 1,
  pageSize: 10,
  query: '',
  sort: {
    order: '',
    key: '',
  },
};

export type CategoriesState = {
  tableQueries: CategoriesQueries;
  categories: MusicCategory[];
  total: number;
};

type CategoriesAction = {
  setTableQueries: (payload: CategoriesQueries) => void;
  setOptions: (payload: [MusicCategory[], number]) => void;
};

const initialState: CategoriesState = {
  tableQueries: initialQueries,
  categories: [],
  total: 0,
};

export const useCategoriesStore = create<CategoriesState & CategoriesAction>((set) => ({
  ...initialState,
  setTableQueries: (payload) => set((state) => ({...state, tableQueries: payload})),
  setOptions: ([options, total]) => set((state) => ({...state, categories: options, total})),
}));
