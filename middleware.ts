import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.cookies.has('iron_session_cookie')) {
    if (request.nextUrl.pathname.startsWith('/private')) {
      const response = NextResponse.next()
      return response
    } else if (request.nextUrl.pathname.startsWith('/auth/sign-in')) {
      return NextResponse.redirect(new URL('http://localhost:3000/'))
    }
  } else {
    return NextResponse.redirect(new URL('http://localhost:3000/'))
  }
}
