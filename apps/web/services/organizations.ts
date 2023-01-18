import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { query } from '../utils/auth'

export const orgsApi = createApi({
  reducerPath: 'organizations',
  baseQuery: fetchBaseQuery(query('organizations')),
  tagTypes: ['Organizations'],
  endpoints: (builder) => ({
    getOrgs: builder.query<any, void>({
      query: () => '/',
      transformResponse: (response: { data }) => response.data,
      providesTags: (result, error) => {
        if (error) {
          return []
        }
        return [
          ...result.map(({ id }) => ({ type: 'Organizations', id })),
          { type: 'Organizations', id: 'LIST' }
        ]
      }
    }),
    createOrg: builder.mutation<any, any>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data
      }),
      transformResponse: (response: { data }) => response.data,
      invalidatesTags: (result, error, id) => {
        if (error) {
          return []
        }
        return [{ type: 'Organizations', id: 'LIST' }]
      }
    }),
    getOrgById: builder.query<any, string>({
      query: (id) => `/${id}`,
      transformResponse: (response: { data }) => response.data
    })
  })
})

export const {
  useGetOrgsQuery,
  useCreateOrgMutation,
  useGetOrgByIdQuery,
  useLazyGetOrgByIdQuery
} = orgsApi
