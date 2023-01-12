import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useAuth0 } from '@auth0/auth0-react'

const Logout: NextPage = () => {
  const { logout } = useAuth0()

  useEffect(() => {
    logout({ returnTo: `${process.env.NEXT_PUBLIC_HOME}/login` })
  }, [])

  return <div>loggin out</div>
}

export default Logout
