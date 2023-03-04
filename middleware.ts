import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {

    const sessionToken = req.cookies.get('sessionToken')?.value;

    if(!sessionToken){
        if(req.nextUrl.pathname.startsWith('/main')) return NextResponse.redirect(new URL('/', req.url));
    }

    if(sessionToken){
        if(req.nextUrl.pathname.startsWith('/register') || req.nextUrl.pathname.endsWith('/')){
            return NextResponse.redirect(new URL('/main/home', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/main/:id*', '/register']
}