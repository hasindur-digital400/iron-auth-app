import { useSelector } from 'react-redux'
import { selectSession } from '@/context/session/sessionSlice'

export default function useSession() {
  return useSelector(selectSession)
}
