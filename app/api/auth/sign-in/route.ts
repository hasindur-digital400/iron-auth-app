import { sealData, unsealData } from 'iron-session'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { serverInstance } from '@/lib/axios'

async function getUserData(accessToken: string) {
  const { data: userData, status: userStatus } = await serverInstance.get(
    '/auth/profile',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  if (userStatus === 200) {
    const { id, name, email, role, avatar } = userData
    return { id, name, email, role, avatar }
  }
}

export async function GET(req: Request) {
  const cookieStore = cookies()
  const session = cookieStore.get('iron_session_cookie')?.value

  if (session) {
    const unsealedData = await unsealData(session, {
      password: process.env.SECRET_COOKIE_PASSWORD as string,
    })

    const accessToken = unsealedData.access_token as string

    const user = await getUserData(accessToken)

    return NextResponse.json({ user, accessToken }, { status: 201 })
  }

  return NextResponse.json({ message: 'No session cookie' }, { status: 400 })
}

export async function POST(req: Request) {
  const { email, password, rememberMe } = await req.json()

  const { data, status } = await serverInstance.post(
    '/auth/login',
    JSON.stringify({
      email,
      password,
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

    const cookieStore = cookies()

    cookieStore.set({
      name: 'iron_session_cookie',
      value: sealedSession,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge,
    })

    const user = await getUserData(data.access_token)

    return NextResponse.json(
      { user, accessToken: data.access_token },
      { status: 201 }
    )
  }

  return NextResponse.json(
    { error: 'Unauthorized credentials' },
    { status: 401 }
  )
}
