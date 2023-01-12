import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'

const AuthChecker= ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0()
  const router = useRouter()
  console.log(router)
  console.log(isLoading, isAuthenticated)

  if (isLoading) {
    return <div>Loading user...</div>
  }

  if (!isAuthenticated && router.asPath !== '/login') {
    router.push('/login')
    return <div>Redirecting to login</div>
  }

  return children
}

export default AuthChecker
