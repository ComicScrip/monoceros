import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getTokensFromCredentials } from "../../../lib/monocerosAPI";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
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
});
