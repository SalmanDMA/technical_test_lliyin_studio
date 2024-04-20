import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password, token } = credentials as { email: string; password: string; token: string };
        if (email === 'rifaldi@test.co' && password === 'rifaldi') {
          return { email: 'rifaldi@test.co', token } as any;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, profile }: any) {
      if (account?.provider === 'credentials') {
        token.email = user.email;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }: any) {
      if ('email' in token) {
        session.user.email = token.email;
      }
      if ('token' in token) {
        session.user.token = token.token;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    maxAge: 24 * 60 * 60,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
