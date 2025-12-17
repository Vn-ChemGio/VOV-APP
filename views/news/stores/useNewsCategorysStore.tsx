import {create} from 'zustand';
import {NewsCategory, TableQueries} from "@/types";


export type NewsCategoriesQueries = TableQueries & {}

export const initialTableNewsCategoriesData: NewsCategoriesQueries = {
  pageIndex: 1,
  pageSize: 10,
  query: '',
  sort: {
    order: '',
    key: '',
  },
};

type NewsCategoriesAction = {
  setTableData: (payload: NewsCategoriesQueries) => void
  setOptions: (payload: NewsCategory[]) => void
  setSelectedCategoryId: (payload: NewsCategory['id']) => void
}
export type NewsCategoriesState = {
  tableData: NewsCategoriesQueries,
  categories: NewsCategory[],
  selectedCategoryId: NewsCategory['id'],
}

export type NewsCategoriesStore =
  NewsCategoriesState & NewsCategoriesAction

const initialStateCategories: NewsCategoriesState = {
  tableData: initialTableNewsCategoriesData,
  categories: [],
  selectedCategoryId: 0,
};

export const useNewsCategoriesStore = create<NewsCategoriesStore>((set) => ({
  ...initialStateCategories,
  setTableData: (payload) => set((state) => ({...state, tableQueries: payload})),
  setOptions: (payload) => set((state) => ({...state, categories: payload, selectedCategoryId: 0})),
  setSelectedCategoryId: (payload) => set((state) => ({...state, selectedCategoryId: payload})),
}));
