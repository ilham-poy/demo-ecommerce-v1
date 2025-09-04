import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";



const onlyAdmin = ['/admin', '/api/createContent',
    '/api/sendContent', '/api/deleteContent']
export default function WithAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
    return async (req: NextRequest, next: NextFetchEvent) => {
        const pathname = req.nextUrl.pathname;

        if (requireAuth.includes(pathname)) {
            const token = await getToken({
                req,
                secret: process.env.NEXTAUTH_SECRET
            })
            if (!token) {
                const url = new URL('/', req.url)
                return NextResponse.redirect(url);
            }
            if (token.role !== 'admin' && onlyAdmin.includes(pathname)) {
                return NextResponse.redirect(new URL('/', req.url))
            }
        }
        return middleware(req, next);
    }

}



