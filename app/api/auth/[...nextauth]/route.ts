import GoogleProvider from "next-auth/providers/google";

import NextAuth from "next-auth"


//signup/signin with google
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    })
  
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google"){
        const email = user.email;
        if(!email){
          return false
        }

        
        

      }
      
      return false
    },

  }
})

export { handler as GET, handler as POST } 

console.log({
  clientId: process.env.GOOGLE_CLIENT_ID ?? "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
})