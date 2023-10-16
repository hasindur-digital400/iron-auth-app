'use client'
import { ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'

import { store } from '@/context/store'
import { useDispatch } from 'react-redux'
import { clientInstance } from '@/lib/axios'
import { setSession } from '@/context/session/sessionSlice'

type Props = {
  children: ReactNode
}

export default function SessionProvider({ children }: Props) {
  const dispatch = useDispatch()

  // Get session (user details and accessToken) again if cookie is available. Useful when RTK session is lost due to page reload
  useEffect(() => {
    const fetchSession = async () => {
      const { data, status } = await clientInstance.get('/auth/sign-in')

      if (status === 201)
        dispatch(setSession({ user: data.user, accessToken: data.accessToken }))
    }

    fetchSession()
  }, [dispatch])

  return <Provider store={store}>{children}</Provider>
}
