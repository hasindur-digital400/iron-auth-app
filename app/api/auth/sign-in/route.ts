import { NextResponse } from 'next/server'
import serverInstance from '@/lib/axios/serverInstance'
import { getUserData } from '@/app/api/profile/route'
import setSessionCookie from '@/lib/session/setSessionCookie'

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
    await setSessionCookie({ ...data, remember_me: rememberMe })

    const { user, status: userStatus } = await getUserData()

    return userStatus === 200
      ? NextResponse.json({ user, rememberMe }, { status: 201 })
      : NextResponse.json({}, { status: userStatus })
  }

  return NextResponse.json(
    { error: 'Unauthorized credentials' },
    { status: 401 }
  )
}
