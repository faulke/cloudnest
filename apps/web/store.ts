import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
// import { setupListeners } from '@reduxjs/toolkit/query'
import { itemsApi } from './services/items'
import { orgsApi } from './services/organizations'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [itemsApi.reducerPath]: itemsApi.reducer,
    [orgsApi.reducerPath]: orgsApi.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      itemsApi.middleware,
      orgsApi.middleware,
      authMiddleware
    )
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)
