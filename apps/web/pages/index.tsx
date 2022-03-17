import { useCallback, FC } from 'react'
import type { NextPage } from 'next'
import { usePlaidLink } from 'react-plaid-link'
import {
  useGetLinkTokenMutation,
  useExchangeTokenMutation,
  useFireWebhookMutation
} from '../services/api'

const userId = 'cf8eeabd-b77e-4547-b604-e1075404dc23'

const App: NextPage = () => {
  const [getToken, { data = {} }] = useGetLinkTokenMutation()
  const [fireWebhook] = useFireWebhookMutation()
  const { linkToken } = data

  if (linkToken) {
    return <Link linkToken={linkToken} />
  }

  return (
    <div>
      <div>Get token for user: {userId}</div>
      <button type='button' onClick={() => getToken(userId)}>
        Get Token
      </button>
      <button onClick={() => fireWebhook()}>Fire webhook</button>
    </div>
  )
}
// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link
interface LinkProps {
  linkToken: string | null
}

const Link: FC<LinkProps> = (props: LinkProps) => {
  const [exchangeToken, { data }] = useExchangeTokenMutation()
  console.log(data)

  const onSuccess = useCallback((publicToken) => {
    exchangeToken({ token: publicToken, userId })
  }, [])
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: props.linkToken,
    onSuccess
  }
  const { open, ready } = usePlaidLink(config)
  return (
    <div>
      <button onClick={() => open()} disabled={!ready}>
        Link account
      </button>
    </div>
  )
}
export default App
