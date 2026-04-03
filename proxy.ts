import {NextResponse} from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest){
    const token = request.cookies.get("token");
    
     if(!token){
          const loginUrl = new URL("/auth/signin", request.url);

        
        loginUrl.searchParams.set("reason", "auth-required");

         return NextResponse.redirect(loginUrl);
     }


    console.log("Token Found, proceeding to next response");
    return NextResponse.next();
}

export const config = {
    matcher: ["/crud/productcreate", "/crud/productlist","/auth/profile"],
};   