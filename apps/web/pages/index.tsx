import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useGetTestQuery } from '../services/api'

const Home: NextPage = () => {
  const { data, error, isLoading } = useGetTestQuery()

  return (
    <div className={styles.container}>
      <div>Response</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  )
}

export default Home
