import type { NextPage } from 'next'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@mui/material/Button'
import Link from 'next/link'

const App: NextPage = () => {
  const { user } = useAuth0()

  return (
    user && (
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
