import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.40.192:6060/' }),
  endpoints: (builder) => ({
    getTest: builder.query<any, void>({
      query: () => '/',
      transformResponse: (response: { data }) => response.data
    }),
    getLinkToken: builder.mutation<any, string>({
      query: (userId: string) => ({
        url: '/plaid/link-token',
        method: 'POST',
        body: { userId }
      }),
      transformResponse: (response: { data }) => response.data
    }),
    exchangeToken: builder.mutation<any, { token: string; userId: string }>({
      query: ({ token, userId }) => ({
        url: '/plaid/exchange-token',
        method: 'POST',
        body: { token, userId }
      }),
      transformResponse: (response: { data }) => response.data
    }),
    fireWebhook: builder.mutation<any, any>({
      query: () => ({
        url: '/plaid/hooks/test',
        method: 'POST'
      })
    })
  })
})

export const {
  useGetTestQuery,
  useGetLinkTokenMutation,
  useExchangeTokenMutation,
  useFireWebhookMutation
} = api
