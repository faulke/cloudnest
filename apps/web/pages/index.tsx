import { useCallback, FC } from 'react'
import type { NextPage } from 'next'
import { usePlaidLink } from 'react-plaid-link'
import { useGetLinkTokenQuery } from '../services/api'

// const Home: NextPage = () => {
//   const { data, error, isLoading } = useGetTestQuery()

//   return (
//     <div className={styles.container}>
//       <div>Response</div>
//       <div>{JSON.stringify(data)}</div>
//     </div>
//   )
// }

// APP COMPONENT
// Upon rendering of App component, make a request to create and
// obtain a link token to be used in the Link component

const App: NextPage = () => {
  const { data, error } = useGetLinkTokenQuery()

  return data ? <Link linkToken={data.link_token} /> : null
}
// LINK COMPONENT
// Use Plaid Link and pass link token and onSuccess function
// in configuration to initialize Plaid Link
interface LinkProps {
  linkToken: string | null
}
const Link: FC<LinkProps> = (props: LinkProps) => {
  const onSuccess = useCallback((public_token) => {
    // Handle response ...
  }, [])
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: props.linkToken,
    onSuccess
  }
  const { open, ready } = usePlaidLink(config)
  return (
    <button onClick={() => open()} disabled={!ready}>
      Link account
    </button>
  )
}
export default App
