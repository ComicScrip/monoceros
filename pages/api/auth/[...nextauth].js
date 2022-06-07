import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getTokensFromCredentials } from "../../../lib/monocerosAPI";

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize({ username: email, password }) {
        const validCredentials = await getTokensFromCredentials({
          email,
          password,
        }).catch(console.error);

        return validCredentials ? { credentials: { email, password } } : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user && token) {
        token.credentials = user.credentials;
      }
      return token;
    },
    async session({ session, token }) {
      if (session && token) {
        session.credentials = token.credentials;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});
