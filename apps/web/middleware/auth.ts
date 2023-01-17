import { Middleware, MiddlewareAPI, isRejectedWithValue, Action } from '@reduxjs/toolkit'
import { auth0Client } from '../utils/auth'

interface ApiAction extends Action {
  payload: { originalStatus: number }
}

const auth: Middleware = (store: MiddlewareAPI) => (next: (action: ApiAction) => unknown) => (action: ApiAction) => {
	if (isRejectedWithValue(action)) {
		if (action.payload.originalStatus === 401) {
			// add a return url to state, login w/ redirect to using query string
			// handle query string when returned to app
			const returnTo = window.location.pathname
			auth0Client.logout({
				logoutParams: {
					returnTo: `${process.env.NEXT_PUBLIC_HOME}/login?returnTo=${returnTo}`
				}
			})
		}
	}
	return next(action)
}

export default auth
