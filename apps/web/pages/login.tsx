import type { NextPage } from 'next'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

const Login: NextPage = () => {
  const { loginWithRedirect } = useAuth0()
  const { query } = useRouter()
  const options = {
    appState: {} as any
  }

  if (query.returnTo) {
    options.appState.target = query.returnTo
  }

  return <Button onClick={() => loginWithRedirect(options)}>Login</Button>
}

export default Login
