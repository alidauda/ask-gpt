'use client';
import { Icons } from '@/helpers/Icons';
import NextAuthProvider from '@/helpers/nextauth';
import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <NextAuthProvider>
      <main className='grid h-[100dvh] place-content-center'>
        <div className=' w-80'>
          <button onClick={() => signIn('google')}>
            <Icons.google /> Google
          </button>
        </div>
        <h1>Login</h1>
      </main>
    </NextAuthProvider>
  );
}
