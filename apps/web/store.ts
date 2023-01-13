import { configureStore } from '@reduxjs/toolkit'
import authMiddleware from './middleware/auth'
// Or from '@reduxjs/toolkit/query/react'
// import { setupListeners } from '@reduxjs/toolkit/query'
import { itemsApi } from './services/items'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [itemsApi.reducerPath]: itemsApi.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      itemsApi.middleware,
      authMiddleware
    )
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)
