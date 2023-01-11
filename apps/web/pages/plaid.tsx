import { useCallback, FC, useEffect, useState } from 'react'
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
  const [getToken] = useGetLinkTokenMutation()
  const { data: items = [], isLoading, isFetching } = useGetItemsQuery()
  const [fireWebhook, { isLoading: webhookLoading }] = useFireWebhookMutation()
  const [removeItem, { isLoading: removeLoading }] = useRemoveItemMutation()
  const [linkToken, setLinkToken] = useState('')

  const getLinkToken = async (userId: string) => {
    const res = await getToken(userId)
    const { linkToken } = (res as any).data
    setLinkToken(linkToken)
  }

  const disableBtn = webhookLoading || removeLoading

  return (
    <div>
      <div>Get token for user: {userId}</div>
      <button type='button' onClick={() => getLinkToken(userId)} style={{ marginBottom: '12px' }} disabled={disableBtn}>
        Link New Item
      </button>
      {linkToken && (<Link linkToken={linkToken} clearToken={() => setLinkToken('')} />)}
      {(isLoading || isFetching) && <div>Loading items...</div>}
      {items.map((item: Item) => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', width: '700px', marginTop: '8px'}}>
          <div>{item.plaidId}</div>
          <button type='button' onClick={() => fireWebhook(item.token)} disabled={disableBtn}>Fire webhook</button>
          <button type='button' onClick={() => removeItem(item.id)} disabled={disableBtn}>Remove</button>
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
  clearToken: Function
}

const Link: FC<LinkProps> = (props: LinkProps) => {
  const [exchangeToken] = useExchangeTokenMutation()

  const onSuccess = useCallback((publicToken, metadata) => {
    const { institution_id: institutionId } = metadata.institution
    console.log(metadata) // get institutionId here
    exchangeToken({ token: publicToken, userId, institutionId })
  }, [])
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: props.linkToken,
    onSuccess,
    onEvent: (name, metadata) => {
      if (['EXIT', 'HANDOFF'].includes(name)) {
        props.clearToken()
      }
    }
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
