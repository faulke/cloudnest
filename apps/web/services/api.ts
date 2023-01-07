import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `http://${process.env.NEXT_PUBLIC_API_HOST}/api` }),
  tagTypes: ['Items'],
  endpoints: (builder) => ({
    getItems: builder.query<any, void>({
      query: () => '/items',
      transformResponse: (response: { data }) => response.data,
      providesTags: (result) => {
        return [
          ...result.map(({ id }) => ({ type: 'Items', id })),
          { type: 'Items', id: 'LIST' }
        ]
      }
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
      transformResponse: (response: { data }) => response.data,
      invalidatesTags: (result, error, id) => {
        return [{ type: 'Items', id: 'LIST' }]
      }
    }),
    fireWebhook: builder.mutation<any, string>({
      query: (token: string) => ({
        url: '/plaid/hooks/test',
        method: 'POST',
        body: { token }
      })
    }),
    removeItem: builder.mutation<any, string>({
      query: (id: string) => ({
        url: `/items/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, id) => {
        return [{ type: 'Items', id: 'LIST' }]
      }
    })
  })
})

export const {
  useGetItemsQuery,
  useGetLinkTokenMutation,
  useExchangeTokenMutation,
  useFireWebhookMutation,
  useRemoveItemMutation
} = api
