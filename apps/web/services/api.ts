import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `http://${process.env.NEXT_PUBLIC_API_HOST}/api` }),
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
    exchangeToken: builder.mutation<any, { token: string; userId: string, institutionId: string }>({
      query: ({ token, userId, institutionId }) => ({
        url: '/plaid/exchange-token',
        method: 'POST',
        body: { token, userId, institutionId }
      }),
      transformResponse: (response: { data }) => response.data
    }),
    fireWebhook: builder.mutation<any, void>({
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
