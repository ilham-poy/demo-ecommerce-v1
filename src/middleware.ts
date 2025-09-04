import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import WithAuth from "./middleware/withAuth";

export function mainMiddleware(req: NextRequest) {
    const res = NextResponse.next();
    return res;
}

export default WithAuth(mainMiddleware, ['/profile', '/products/:id*', '/admin', '/api/createContent',
    '/api/sendContent', '/api/deleteContent'])