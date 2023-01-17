import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'

const AuthChecker= ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0()
  const router = useRouter()
  const { pathname } = router

  if (isLoading) {
    return null // or spinner
  }

  if (!isAuthenticated && pathname !== '/login') {
    router.push('/login')
    return <div>Redirecting to login</div>
  }

  return children
}

export default AuthChecker
