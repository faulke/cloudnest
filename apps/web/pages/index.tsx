import type { NextPage } from 'next'
import Link from 'next/link'
import { useAuth0 } from '@auth0/auth0-react'

const App: NextPage = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (!isAuthenticated) {
    return <button onClick={loginWithRedirect}>Login</button>
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <Link href='/plaid'>Go to Plaid</Link>
      </div>
    )
  )
}

export default App
