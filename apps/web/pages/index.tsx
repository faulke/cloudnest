import type { NextPage } from 'next'
import { useAuth0 } from '@auth0/auth0-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useFormik } from 'formik'
import { useCreateOrgMutation, useGetOrgsQuery } from '../services/organizations'

const initialValues = {
  name: ''
}

const App: NextPage = () => {
  const { user } = useAuth0()
  const router = useRouter()
  const [createOrg] = useCreateOrgMutation()
  const { data: orgs = [] } = useGetOrgsQuery()

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      createOrg(values)
    }
  })

  if (router.query.code) {
    return null
  }

  return (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <Link href='/plaid'>Go to Plaid</Link>
        <Box onSubmit={formik.handleSubmit} component='form'>
          <TextField
            id='name'
            name='name'
            label='Name'
            variant='outlined'
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <Button type='submit'>Submit</Button>
        </Box>
        <Box>
          {orgs.map((org) => (
            <div key={org.id}>{org.name}</div>
          ))}
        </Box>
      </div>
    )
  )
}

export default App
