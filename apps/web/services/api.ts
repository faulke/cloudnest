import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.40.192:6060/' }),
  endpoints: (builder) => ({
    getTest: builder.query<any, void>({
      query: () => '/',
      transformResponse: (response: { data }) => response.data
    }),
    getLinkToken: builder.query<any, void>({
      query: () => '/plaid/link-token',
      transformResponse: (response: { data }) => response.data
    })
  })
})

export const { useGetTestQuery, useGetLinkTokenQuery } = api
