import { useCallback, FC, useEffect } from 'react'
import type { NextPage } from 'next'
import { usePlaidLink } from 'react-plaid-link'
import { Item } from '@lib/models'
import {
  useGetLinkTokenMutation,
  useExchangeTokenMutation,
  useFireWebhookMutation,
  useGetItemsQuery,
  useRemoveItemMutation
} from '../services/items'

const userId = 'cf8eeabd-b77e-4547-b604-e1075404dc23'

const App: NextPage = () => {
  const [getToken, { data = {} }] = useGetLinkTokenMutation()
  const { data: items = [], isLoading } = useGetItemsQuery()
  const [fireWebhook] = useFireWebhookMutation()
  const [removeItem] = useRemoveItemMutation()
  const { linkToken } = data

  return (
    <div>
      <div>Get token for user: {userId}</div>
      <button type='button' onClick={() => getToken(userId)} style={{ marginBottom: '12px' }}>
        Link New Item
      </button>
      {linkToken && (<Link linkToken={linkToken} />)}
      {isLoading && <div>Loading items...</div>}
      {items.map((item: Item) => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', width: '700px', marginTop: '8px'}}>
          <div>{item.plaidId}</div>
          <button type='button' onClick={() => fireWebhook(item.token)}>Fire webhook</button>
          <button type='button' onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
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
