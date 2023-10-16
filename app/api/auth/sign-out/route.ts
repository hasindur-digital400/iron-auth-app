import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  cookies().delete('iron_session_cookie')

  return NextResponse.json(
    { message: 'Sign out successfully' },
    { status: 201 }
  )
}
