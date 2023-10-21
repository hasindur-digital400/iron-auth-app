import { NextResponse } from 'next/server'
import serverInstance from '@/lib/axios/serverInstance'
export async function getUserData() {
  const { data, status } = await serverInstance.get('/auth/profile')

  if (status === 200) {
    const { id, name, email, role, avatar } = data
    return { user: { id, name, email, role, avatar }, status }
  } else {
    return { user: null, status }
  }
}

export async function GET(req: Request) {
  const { user, status } = await getUserData()

  if (user) {
    return NextResponse.json(user, { status: 200 })
  } else {
    return NextResponse.json({ message: 'Error in data server' }, { status })
  }
}
