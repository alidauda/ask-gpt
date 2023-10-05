'use client';
import { Icons } from '@/helpers/Icons';
import NextAuthProvider from '@/helpers/nextauth';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function Login() {
  return (
    <NextAuthProvider>
      <main className='grid h-[100dvh] place-content-center gap-3'>
        <h1 className='text-center font-medium  text-3xl'>Login</h1>
        <p className='text-center text-5xl font-normal'>welcome to chatWPdf</p>
        <div className=' w-80 flex justify-center'>
          <Button
            variant='outline'
            size='lg'
            className='w-full'
            onClick={() => signIn('google')}
          >
            <Icons.google className='h-4 w-4 mr-2' /> google
          </Button>
        </div>
      </main>
    </NextAuthProvider>
  );
}
