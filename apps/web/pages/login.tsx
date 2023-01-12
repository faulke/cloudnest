import type { NextPage } from 'next'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@mui/material/Button'

const Login: NextPage = () => {
  const { loginWithRedirect } = useAuth0()

  return <Button onClick={loginWithRedirect}>Login</Button>
}

export default Login
