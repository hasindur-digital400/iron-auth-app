import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { serverInstance } from '@/lib/axios'
import sealCookie from '@/lib/sealCookie'
import unsealCookie from '@/lib/unsealCookie'

export async function POST(req: Request) {
  const cookieStore = cookies()
  const session = cookieStore.get('iron_session_cookie')?.value
  let unsealedData

  if (session) {
    unsealedData = await unsealCookie(session)
    const refreshToken = unsealedData.refresh_token as string
    const rememberMe = unsealedData.remember_me as string

    const { data, status } = await serverInstance.post(
      '/auth/refresh-token',
      JSON.stringify({
        refreshToken,
      })
    )

    if (status === 201) {
      const sealedSession = await sealCookie({
        ...data,
        remember_me: rememberMe,
      })

      const maxAge = rememberMe ? 60 * 60 * 24 * 20 : undefined

      cookieStore.set({
        name: 'iron_session_cookie',
        value: sealedSession,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge,
      })

      return NextResponse.json({ message: 'Tokens refreshed' }, { status: 201 })
    }
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json(
    { message: 'Bad request: Session cookie header is missing' },
    { status: 400 }
  )
}
