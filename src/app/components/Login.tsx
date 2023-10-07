'use client';

import NextAuthProvider from '@/helpers/nextauth';
import LoginComponent from './LoginComponent';

export default function Login() {
  return (
    <NextAuthProvider>
      <LoginComponent />
    </NextAuthProvider>
  );
}
