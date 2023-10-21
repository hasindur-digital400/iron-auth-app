import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
// import secureLocalStorage from 'react-secure-storage'
import clientInstance from '@/lib/axios/clientInstance'
import { deleteSession } from '@/context/session/sessionSlice'

export default function useSignOut() {
  const dispatch = useDispatch()
  const router = useRouter()

  return async () => {
    const { status } = await clientInstance.post('/auth/sign-out')

    if (status === 201) {
      dispatch(deleteSession())
      localStorage.clear()
      sessionStorage.clear()
      router.push('/')
    }
  }
}
