import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, decodeJwt } from 'jose';

const isTokenExpired = (token: string): boolean => {
    try{
        const payload = decodeJwt(token);
        const expirationTime = payload.exp! * 1000;
        const now = Date.now();

        return expirationTime <= now;
    } catch(error) {
        return true;
    }
}

export async function middleware(req: NextRequest) {
    

    if(req.cookies.get('sessionToken') && isTokenExpired(req.cookies.get('sessionToken')!.value)){
        
    }

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