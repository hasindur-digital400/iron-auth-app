import { cookies } from 'next/headers'
import unsealCookie from '@/lib/session/unsealCookie'

export default async function getSessionCookie() {
  console.log('in getSessionCookie')
  const cookieStore = cookies()
  const session = cookieStore.get('iron_session_cookie')?.value
  console.log('session', session)
  return session ? await unsealCookie(session as string) : undefined
}
