import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Test } from '@lib/interfaces'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.40.192:6060/' }),
  endpoints: (builder) => ({
    getTest: builder.query<Test, void>({
      query: () => '/',
      transformResponse: (response: { data: Test }) => response.data
    })
  })
})

export const { useGetTestQuery } = api
