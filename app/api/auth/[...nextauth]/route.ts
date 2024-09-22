import GoogleProvider from "next-auth/providers/google";

import NextAuth from "next-auth"


//signup/signin with google
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    })
  
  ]
})

export { handler as GET, handler as POST }