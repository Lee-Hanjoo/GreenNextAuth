// 서버단

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_PW,
    }),
    GoogleProvider({
      clientId: '456650788979-o4t9uk5m23ds7ghhfq9h564svfke4l09.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    NaverProvider({
      clientId: 'process.env.NAVER_CLIENT_ID',
      clientSecret: 'process.env.NAVER_CLIENT_SECRET'
    }),
    KakaoProvider({
      clientId: 'process.env.KAKAO_CLIENT_ID',
      clientSecret: 'process.env.KAKAO_CLIENT_SECRET'
    }),
    CredentialsProvider({
      async authorize(credentials, req) {
        let {id, pw} = credentials;
        throw new Error('등록된 사용자 없는데용 ㅋㅋ')
        return true;
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      console.log(user);
      // db 쌓는 곳(getDoc, setDoc... 했던것들)

      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      return session
    }
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/',
  }
}
export default NextAuth(authOptions)