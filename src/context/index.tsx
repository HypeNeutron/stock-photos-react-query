import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { useQueryPhotos } from '../api';
import { PhotosContextProvider } from './context.types';

const AppContext = React.createContext<PhotosContextProvider | object>({});

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState<string>();
  const [paramQuery, setParamQuery] = useState<
    | {
        name: string;
        value?: string;
      }
    | ''
  >('');

  const {
    photos,
    isLoading,
    isFetching,
    isPaused,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useQueryPhotos(query, paramQuery);

  /* Handle searching -------------------*/
  const handleSearchEnter = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const { search } = Object.fromEntries(form.entries());
    setQuery(search as string);
  }, []);

  const handleAutoSearchFc = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  const handleAutoSearch = useDebouncedCallback(handleAutoSearchFc, 1500);

  const handleFilter = useCallback((value: string, type: string) => {
    switch (type) {
      case 'color':
        setParamQuery({ name: 'color', value });
        break;
      case 'orderBy':
        setParamQuery({ name: 'order_by', value });
        break;
      case 'orientation':
        setParamQuery({ name: 'orientation', value });
        break;
      default:
        break;
    }
  }, []);

  /* Pass all function state in useMemo -------------------*/
  const passMemo = useMemo(() => {
    return {
      query,
      isFetching,
      photos,
      fetchNextPage,
      hasNextPage,
      isLoading,
      isPaused,
      isError,
      error,
      handleSearchEnter,
      handleAutoSearch,
      handleFilter,
    };
  }, [
    query,
    isFetching,
    photos,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isPaused,
    isError,
    error,
    handleSearchEnter,
    handleAutoSearch,
    handleFilter,
  ]);

  return <AppContext.Provider value={passMemo}>{children}</AppContext.Provider>;
}

const useGlobalContext = () => useContext(AppContext) as PhotosContextProvider;

export { AppContextProvider, useGlobalContext };
