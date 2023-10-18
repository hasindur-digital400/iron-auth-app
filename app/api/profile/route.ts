import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { unsealData } from 'iron-session'
import { serverInstance } from '@/lib/axios'

export async function getUserData(accessToken: string) {
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

    const user = await getUserData(unsealedData.access_token as string)

    if (user) {
      return NextResponse.json(user, { status: 200 })
    } else {
      return NextResponse.json(
        { message: 'Error in data server' },
        { status: 404 }
      )
    }
  }

  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
}
