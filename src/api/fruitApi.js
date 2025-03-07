import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fruitApi = createApi({
  reducerPath: 'fruitApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.fruityvice.com/api/fruit/' }), // Base URL debe ser '/api/fruit/'
  endpoints: (builder) => ({
    getFruits: builder.query({
      query: () => 'all', // Endpoint correcto
    }),
  }),
});

export const { useGetFruitsQuery } = fruitApi;