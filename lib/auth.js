import CredentialsProvider from "next-auth/providers/credentials";

/** @type {import('next-auth').NextAuthOptions} */
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const adminEmail    = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
          console.error("ADMIN_EMAIL / ADMIN_PASSWORD not set in .env.local");
          return null;
        }

        const emailOk    = credentials.email.toLowerCase() === adminEmail.toLowerCase();
        const passwordOk = credentials.password === adminPassword;
        // Production tip: store a bcrypt hash in env and use bcrypt.compare()

        if (emailOk && passwordOk) {
          return { id: "admin-1", email: adminEmail, name: "Admin", role: "admin" };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error:  "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
