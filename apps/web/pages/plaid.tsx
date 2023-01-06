import { useCallback, FC, useEffect } from 'react'
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

  const onSuccess = useCallback((publicToken, metadata) => {
    const { institution_id: institutionId } = metadata.institution
    console.log(metadata) // get institutionId here
    exchangeToken({ token: publicToken, userId, institutionId })
  }, [])
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: props.linkToken,
    onSuccess,
    onEvent: (name, metadata) => console.log(name, metadata) // handle window closed by user
  }
  const { open, ready } = usePlaidLink(config)

  useEffect(() => {
    if (ready) {
      open()
    }
  }, [open, ready])

  return (
    <div>
      Linking account
    </div>
  )
}
export default App
