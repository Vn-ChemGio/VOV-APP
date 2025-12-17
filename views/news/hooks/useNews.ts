import React from "react";
import useSWR from "swr";
import {apiGetNews, apiGetNewsCategories} from "@/services/AppService";
import {News, NewsCategory} from "@/types"
import {getNewsStoreById, useNewsCategoriesStore} from "../stores";

export const useNewsCategories = () => {
  const {categories, setOptions, selectedCategoryId, setSelectedCategoryId} = useNewsCategoriesStore()
  
  const {error, isLoading, isValidating, mutate} = useSWR<NewsCategory[]>(
    [`/news-categories`],
    apiGetNewsCategories,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      suspense: true,
      onSuccess: (data) => {
        setOptions([{id: 0, name: 'Tin mới nhất', order: 0} as NewsCategory].concat(data));
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

export const useNews = (category_id: number) => {
  const newsStore = React.useMemo(
    () => getNewsStoreById(category_id),
    [category_id],
  );
  
  const {tableData, setTableData, setOptions, options, total} =
    newsStore();
  
  const {error, isLoading, mutate, isValidating} = useSWR<[News[], number]>(
    [`/news`, category_id, tableData],
    apiGetNews,
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