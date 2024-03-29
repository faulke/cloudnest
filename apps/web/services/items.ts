import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { auth0Client } from '../utils/auth'

export const itemsApi = createApi({
  reducerPath: 'items',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${process.env.NEXT_PUBLIC_API_HOST}/api/items`,
    prepareHeaders: async (headers) => {
      const token = await auth0Client.getTokenSilently()
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    }
  }),
  tagTypes: ['Items'],
  endpoints: (builder) => ({
    getItems: builder.query<any, void>({
      query: () => '/',
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
        url: '/link-token',
        method: 'POST',
        body: { userId }
      }),
      transformResponse: (response: { data }) => response.data
    }),
    exchangeToken: builder.mutation<any, { token: string; userId: string, institutionId: string }>({
      query: ({ token, userId, institutionId }) => ({
        url: '/exchange-token',
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
        url: '/hooks/test',
        method: 'POST',
        body: { token }
      })
    }),
    removeItem: builder.mutation<any, string>({
      query: (id: string) => ({
        url: `/${id}`,
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
} = itemsApi
