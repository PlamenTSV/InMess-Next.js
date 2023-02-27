import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';

const isTokenExpired = async (token: string) => {
    if(process.env.SESSION_SECRET){
        const decoded = await jwtVerify(token.toString(), new TextEncoder().encode(process.env.SESSION_SECRET));
        return decoded.payload
    }
}

export async function middleware(req: NextRequest) {
    const sessionToken = req.cookies.get('sessionToken')?.value;

    if(sessionToken){
        const decoded = await isTokenExpired(sessionToken);
        if(req.nextUrl.pathname.startsWith('/register') || req.nextUrl.pathname.endsWith('/')){
            return NextResponse.redirect(new URL('/main/home', req.url));
        }
        if(req.nextUrl.pathname.startsWith('/main') && (decoded?.exp && decoded.exp < Math.floor(Date.now() / 1000))){
            return NextResponse.redirect(new URL('/', req.url));
        }
    } 
    else {
        if(req.nextUrl.pathname.startsWith('/main'))return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/main/:id*', '/register']
}