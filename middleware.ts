import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.cookies.has('iron_session_cookie')) {
    const response = NextResponse.next()
    return response
  } else {
    return NextResponse.redirect(new URL('http://localhost:3000/'))
  }
}

export const config = {
  matcher: ['/private/:path*', '/api/auth/:path*'],
}
