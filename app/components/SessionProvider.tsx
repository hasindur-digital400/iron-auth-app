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

    let user

    if (rememberMe) {
      user = JSON.parse(localStorage.getItem('user') as string) as User
    } else {
      user = JSON.parse(sessionStorage.getItem('user') as string) as User
    }
    console.log(user)

    if (user) dispatch(setSession({ user }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{children}</>
}
