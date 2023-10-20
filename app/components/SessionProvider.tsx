'use client'
import { ReactNode, useEffect } from 'react'
import secureLocalStorage from 'react-secure-storage'
import { useDispatch } from 'react-redux'
import { setSession } from '@/context/session/sessionSlice'

type Props = {
  children: ReactNode
}

export default function SessionProvider({ children }: Props) {
  const dispatch = useDispatch()

  // Get session (user details) again from encrypted localStorage value.
  // Useful when RTK session is lost due to page reload
  useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe') || false

    const storedData = rememberMe
      ? localStorage.getItem('user')
      : sessionStorage.getItem('user')

    if (storedData && storedData !== 'undefined') {
      const user = JSON.parse(storedData) as User
      dispatch(setSession({ user }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}
