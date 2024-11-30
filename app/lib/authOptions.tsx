
import axios from "axios";
import {  NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const data = {
          email: credentials?.username,
          password: credentials?.password,
        }
        const config = {
          method: 'post',
          url: process.env.API_URL + 'auth/login',
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };
        let user: {
          accessToken: string,
          refreshToken: string,
          expiry: string,
          id: string,
          authorities: {
            authorities: { role: string[], permission: string[] },
            authoritiesClear: { role: string[], permission: string[] }
          },
          email: string
        } | null = null;
        try {
          const sender = await axios(config);
          console.log(sender.data)
          user = {
            accessToken: sender.data.accessToken,
            refreshToken: sender.data.refreshToken,
            expiry: sender.data.expiry,
            id: sender.data.authorities.userId,
            authorities: {
              authorities: { role: sender.data.authorities.authorities.ROLE, permission: sender.data.authorities.authorities.PERMISSION },
              authoritiesClear: { role: sender.data.authorities.authorities.ROLE, permission: sender.data.authorities.authorities.PERMISSION }
            },
            email: credentials?.username
          }
        } catch (error) {
          console.log(error)
        }

        if (user === null) {
          return null
        }

        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
        token.name = user.name;
      }
      return token;
    },
    async signIn() {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      }
      return "/";
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          accessToken: token.accessToken as string,
          name: token.name as string,
        };
      }
      return session;
    },
  }
}
