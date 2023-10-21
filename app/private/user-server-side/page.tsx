import serverInstance from '@/lib/axios/clientInstance'
import { unsealData } from 'iron-session'
import { cookies } from 'next/headers'

type Props = {}

export default async function User({}: Props) {
  const cookieStore = cookies()
  const session = cookieStore.get('iron_session_cookie')?.value
  let unsealedData
  let content

  if (session) {
    unsealedData = await unsealData(session, {
      password: process.env.SECRET_COOKIE_PASSWORD as string,
    })
    const accessToken = unsealedData.access_token as string
    // console.log(accessToken)

    const { data, status } = await serverInstance.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (status === 200) {
      content = data && <p>{JSON.stringify(data)}</p>
    } else if (status === 401) {
      content = (
        <div>
          <p className='text-lg font-bold'>Unauthorized</p>
          <p>Sign in to view user details</p>
        </div>
      )
    } else {
      content = <p>Error occurred: {status}</p>
    }
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mt-2'>User details - SSR page</h1>
      <p>This is a protected page</p>
      <div>{content}</div>
    </div>
  )
}
