import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';

const authPage = ['/auth/signin', '/auth/signup'];

export default function withAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathName = req.nextUrl.pathname;
    if (requireAuth.includes(pathName)) {
      const token = await getToken({ req, secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET });

      if (!token && !authPage.includes(pathName)) {
        const url = new URL('/auth/signin', req.url);
        return NextResponse.redirect(url);
      }

      if (token) {
        // kecuali ada home page baru kondisi di bawah bisa kita hapus
        if (pathName === '/' && requireAuth.includes(pathName)) {
          return NextResponse.redirect(new URL('/dashboard', req.url));
        }
        if (authPage.includes(pathName)) {
          return NextResponse.redirect(new URL('/', req.url));
        }
      }
    }
    return middleware(req, next);
  };
}
