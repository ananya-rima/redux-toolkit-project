// // import { NextResponse } from "next/server";
// // import { toast } from "react-toastify";

// // export function middleware(request: any) {
// //   const token = request.cookies.get("token");
// //   console.log(token, "dsfghj");
// //   if (!token) {
// //     console.log("Redirecting to /auth/login");
// //     return NextResponse.redirect(new URL("/auth/login", request.url));
// //   }

// //   console.log("Token found, proceeding to next response");

// //   return NextResponse.next();
// // }

// // export const config = {
// //   matcher: ["/cms/create", "/cms/product_List"],
// // };

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function proxy(request: NextRequest) {
//   return NextResponse.redirect(new URL("/home", request.url));
// }

// // Alternatively, you can use a default export:
// // export default function proxy(request: NextRequest) { ... }

// export const config = {
//   matcher: "/about/:path*",
// };


import {NextResponse} from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest){
    const token = request.cookies.get("token");
    
     if(!token){
          const loginUrl = new URL("/auth/signin", request.url);

        // pass message to login page
        loginUrl.searchParams.set("reason", "auth-required");

         return NextResponse.redirect(loginUrl);
     }


    console.log("Token Found, proceeding to next response");
    return NextResponse.next();
}

export const config = {
    matcher: ["/crud/productcreate", "/crud/productlist","/auth/profile"],
};   