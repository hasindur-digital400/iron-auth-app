import { cookies } from 'next/headers'
import sealCookie from '@/lib/session/sealCookie'

export default async function setSessionCookie(data: any) {
  const sealedSession = await sealCookie(data)
  const maxAge = data.remember_me ? 60 * 60 * 24 * 20 : undefined
  const cookieStore = cookies()

  cookieStore.set({
    name: process.env.SESSION_COOKIE_NAME as string,
    value: sealedSession,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge,
  })
}
