import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    emailVerified?: Date | null;
    role: string;
    image?: string | null;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      emailVerified?: boolean;
      role: string;
      image?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: string;
    data?: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }
}