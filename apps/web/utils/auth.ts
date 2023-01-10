import { Auth0Client } from '@auth0/auth0-spa-js'

export const auth0Client = new Auth0Client({
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: process.env.NEXT_PUBLIC_HOME,
    audience: `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/`
  }
})
