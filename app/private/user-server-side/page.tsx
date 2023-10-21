import serverInstance from '@/lib/axios/serverInstance'

type Props = {}

export default async function User({}: Props) {
  let content

  const { data, status } = await serverInstance.get('/auth/profile')

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

  return (
    <div>
      <h1 className='text-3xl font-bold mt-2'>User details - SSR page</h1>
      <p>This is a protected page</p>
      <div>{content}</div>
    </div>
  )
}
