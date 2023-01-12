import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'
import { store } from '../store'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import AuthChecker from '../components/AuthChecker'
import NavBar from '../components/NavBar'

function MyApp({ Component, pageProps }: AppProps) {  
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={process.env.NEXT_PUBLIC_HOME}
      audience={`https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/v2/`}
    >
      <Provider store={store}>
        <NavBar />
        <AuthChecker>
          <Component {...pageProps} />
        </AuthChecker>
      </Provider>
    </Auth0Provider>
  )
}

export default MyApp
