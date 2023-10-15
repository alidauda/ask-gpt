import React from 'react';
import NavBar from '../components/NavBar';
import RightBar from '../components/chat/RightBar';
import LeftBar from '../components/chat/leftBar';
import { getServerAuthSession } from '@/utils/auth';
import { redirect } from 'next/navigation';

export default async function ChatPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const session = await getServerAuthSession();
    if (!session) return redirect('/login');
    return (
      <div className='bg-[#f5f7f9] h-screen flex flex-col'>
        <NavBar />
        <div className='grid lg:grid-cols-5 h-full'>
          <LeftBar url={params.slug} />

          <RightBar id={params.slug} />
        </div>
      </div>
    );
  } catch (e) {
    return (
      <div className='bg-[#f5f7f9] h-screen flex flex-col'>
        <NavBar />
        <div className='flex h-screen justify-center items-center'>
          an error has occurred Please try again later
        </div>
      </div>
    );
  }
}
