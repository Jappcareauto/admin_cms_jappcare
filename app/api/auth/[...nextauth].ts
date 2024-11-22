
import NextAuth from "next-auth/next";
import { authOptions } from "@/app/lib/authOptions";


export const handler = NextAuth(authOptions) as never; 

export { handler as GET, handler as POST}
   