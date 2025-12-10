import NextAuth from 'next-auth';

const handler = NextAuth({
  // Configuration NextAuth
});

export { handler as GET, handler as POST };
