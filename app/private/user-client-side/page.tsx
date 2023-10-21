'use client'

import React, { useState } from 'react'
import clientInstance from '@/lib/axios/clientInstance'
import useSession from '@/hooks/useSession'

type Props = {}

export default function User({}: Props) {
  const [userData, setUserData] = useState('')
  const session = useSession()

  const retrieveUserData = async () => {
    const { data, status } = await clientInstance.get('/profile')

    if (status === 200) {
      setUserData(data)
    } else if (status === 401) {
      alert('Unauthorized - Sign in to view user details')
    } else {
      alert(`Error: ${status}`)
    }
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mt-2'>User details - CSR page</h1>
      <p>This is a protected page</p>
      <div>
        {userData ? (
          <p>{JSON.stringify(userData)}</p>
        ) : (
          <button
            className='bg-blue-400 p-4 rounded'
            onClick={retrieveUserData}
          >
            Get user data
          </button>
        )}
      </div>
    </div>
  )
}
