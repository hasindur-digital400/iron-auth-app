import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import secureLocalStorage from 'react-secure-storage'
import clientInstance from '@/lib/axios/clientInstance'
import { setSession } from '@/context/session/sessionSlice'

export default function useSignIn() {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const dispatch = useDispatch()

  const signIn = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    setLoading(true)
    const { data, status } = await clientInstance.post(
      '/auth/sign-in',
      JSON.stringify({
        email,
        password,
        rememberMe,
      })
    )

    if (status === 201) {
      dispatch(setSession({ user: data.user }))

      if (data.rememberMe) {
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('rememberMe', 'true')
      } else {
        sessionStorage.setItem('user', JSON.stringify(data.user))
      }
      setSuccess(true)
      setLoading(false)
    } else {
      setError(true)
      setLoading(false)
    }
  }

  useEffect(() => {}, [error, loading, success])

  return { error, loading, success, signIn }
}
