'use client'

import { FormEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useSignIn from '@/hooks/useSignIn'

type Props = {}

export default function SignIn({}: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  // const dispatch = useDispatch()
  const router = useRouter()

  const { error, loading, success, signIn } = useSignIn()

  useEffect(() => {
    if (success) router.push('/')
  }, [success, router])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signIn(email, password, rememberMe)
  }

  return (
    <div className='mt-12 flex flex-col gap-3 w-full items-center '>
      <form
        onSubmit={handleSubmit}
        className='mt-12 flex flex-col gap-3 w-1/2 items-center shadow-md bg-lime-100 p-4'
      >
        {error && (
          <p className='p-2 rounded bg-red-500 text-white'>Wrong credentials</p>
        )}
        <label htmlFor='email'>
          Email:
          <input
            type='text'
            id='email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor='password'>
          Password:
          <input
            type='password'
            id='password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor='rememberMe'>
          Remember me:
          <input
            type='checkbox'
            id='rememberMe'
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        </label>
        <button
          type='submit'
          className='p-1 rounded bg-blue-300 disabled:bg-slate-400 disabled:cursor-not-allowed'
          disabled={loading}
        >
          Sign in
        </button>
      </form>
    </div>
  )
}
