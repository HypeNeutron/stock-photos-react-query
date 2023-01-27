import { z } from 'zod';

const photoContextProvider = z.object({
  isTouch: z.boolean(),
  isFetching: z.boolean(),
  isPaused: z.boolean(),
  query: z.string(),
  isLoading: z.boolean(),
  isError: z.boolean(),
  error: z.any(),
  photos: z.any(),
  handleSearchEnter: z.function().returns(z.void()),
  handleAutoSearch: z.function().returns(z.void()),
  handleFilter: z.function().returns(z.void()),
  fetchNextPage: z.any(),
  hasNextPage: z.boolean(),
});

export type PhotosContextProvider = z.infer<typeof photoContextProvider>;
