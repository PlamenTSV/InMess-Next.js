import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    if(req.cookies.get('sessionToken')){
        if(req.nextUrl.pathname.startsWith('/register') || req.nextUrl.pathname.endsWith('/')){
            return NextResponse.redirect(new URL('/main/home', req.url));
        }
    }
    else {
        if(req.nextUrl.pathname.startsWith('/main')){
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/main/:id*', '/register']
}