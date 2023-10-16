import { serverInstance } from '@/lib/axios'
import { sealData, unsealData } from 'iron-session'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const cookieStore = cookies()
  const session = cookieStore.get('iron_session_cookie')?.value
  let unsealedData

  if (session) {
    unsealedData = await unsealData(session, {
      password: process.env.SECRET_COOKIE_PASSWORD as string,
    })
    const refreshToken = unsealedData.refresh_token as string
    const rememberMe = unsealedData.remember_me as string

    const { data, status } = await serverInstance.post(
      '/auth/refresh-token',
      JSON.stringify({
        refreshToken,
      })
    )

    if (status === 201) {
      const sealedSession = await sealData(
        { ...data, remember_me: rememberMe },
        {
          password: process.env.SECRET_COOKIE_PASSWORD as string,
        }
      )

      const maxAge = rememberMe ? 60 * 60 * 24 * 20 : undefined

      cookieStore.set({
        name: 'iron_session_cookie',
        value: sealedSession,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge,
      })

      return NextResponse.json(
        { accessToken: data.access_token },
        { status: 201 }
      )
    }
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json(
    { message: 'Bad request: Session cookie header is missing' },
    { status: 400 }
  )
}
