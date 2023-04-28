import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  export interface User {
    id: string
    name: string
    username: string
    email: string
    avatar_url: string
  }

  export interface Session {
    user: User
  }
}
