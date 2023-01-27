import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback } from 'react';

const clientID = `?client_id=${import.meta.env.VITE_UNSPLASH_CLIENT_KEY}`;
const searchURL = `https://api.unsplash.com/search/photos/${clientID}`;

export function useQueryPhotos(
  query: string | undefined,
  paramQuery: { name: string; value?: string } | ''
) {
  const fetchPhotos = useCallback(
    async ({
      pageParam = 1,
    }: QueryFunctionContext<
      [string, string | undefined, { name: string; value?: string } | '']
    >) => {
      let url = `https://api.unsplash.com/photos/${clientID}`;
      if (!query && pageParam > 1) url += `&page=${pageParam}`;

      if (query) url = `${searchURL}&query=${query}`;

      if (query && pageParam > 1)
        url = `${searchURL}&page=${pageParam}&query=${query}`;

      if (query && paramQuery) {
        const { name, value } = paramQuery;
        if (value) {
          // If value exists, include it in the query
          const matchWordParam = new RegExp(`&${name}=\\w+`);
          const matchParam = new RegExp(`&${name}=`, 'ig');
          const newNameSearch = `&${name}=${value}`;
          if (matchParam.test(url)) url.replace(matchWordParam, newNameSearch);
          else url = url + newNameSearch;
        } else {
          // If value does not exist, remove it from the query
          const matchWordParam = new RegExp(`&${name}=\\w+`);
          url.replace(matchWordParam, '');
        }
      }

      const { data } = await axios(url);
      return data;
    },
    [paramQuery, query]
  );

  const {
    data: photos,
    isLoading,
    isFetching,
    isError,
    error,
    isPaused,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(['photos', query, paramQuery], fetchPhotos, {
    getNextPageParam: (lastPage, allPages): number | void => {
      if (Array.isArray(lastPage) && lastPage.length)
        return allPages.length + 1;
      if (lastPage.results.length) return allPages.length + 1;
    },

    refetchOnWindowFocus: false,
  });

  return {
    photos,
    fetchNextPage,
    isLoading,
    isFetching,
    isError,
    error,
    isPaused,
    hasNextPage,
  };
}
