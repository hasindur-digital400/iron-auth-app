'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import useSession from '@/hooks/useSession'
import { clientInstance } from '@/lib/axios'
import { deleteSession } from '@/context/session/sessionSlice'

type Props = {}

export default function Navbar({}: Props) {
  const session = useSession()
  const dispatch = useDispatch()
  const router = useRouter()

  const handleSignOut = async () => {
    const { status } = await clientInstance.post('/auth/sign-out')

    if (status === 201) {
      dispatch(deleteSession())
      router.push('/')
    }
  }

  const refresh = async () => {
    await clientInstance.post('/auth/refresh')
  }

  return (
    <nav className='flex justify-between items-center w-full py-10 px-5 bg-slate-400'>
      <div className='flex justify-between items-center gap-4 w-ful'>
        <Link href='/' className='text-2xl font-bold'>
          AuthApp
        </Link>
        <Link href='/products' className='font-bold'>
          Products
        </Link>
      </div>
      {session.user.id ? (
        <>
          <Link
            href='/private/user-client-side'
            className='font-bold text-orange-400 bg-slate-500'
          >
            {session.user.name} - CSR
          </Link>
          <Link
            href='/private/user-server-side'
            className='font-bold text-orange-400 bg-slate-500'
          >
            {session.user.name} - SSR
          </Link>

          <button className='p-2 rounded-sm border' onClick={refresh}>
            Refresh
          </button>

          <button className='p-2 rounded-sm border' onClick={handleSignOut}>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link className='p-2 rounded-sm border' href='/auth/sign-in'>
            Sign In
          </Link>
        </>
      )}
    </nav>
  )
}
