import "next-auth";

declare module "next-auth" {
  interface User {
    accessToken: string,
    refreshToken: string,
    expiry: string,
    id: string,
    authorities: {
      authorities: { role: string[], permission: string[] },
      authoritiesClear: { role: string[], permission: string[] }
    },
    email: string
  }

  interface Session extends DefaultSession {
    user: User;
    expires_in: string;
    error: string;
  }
}