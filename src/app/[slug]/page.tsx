import React from 'react';
import NavBar from '../components/NavBar';
import RightBar from '../components/chat/RightBar';
import LeftBar from '../components/chat/leftBar';

export default function ChatPage({ params }: { params: { slug: string } }) {
  return (
    <div className='bg-[#f5f7f9] min-h-screen '>
      <NavBar />
      <div className='grid grid-cols-5 h-full '>
        <LeftBar url={params.slug} />
        <RightBar id={params.slug} />
      </div>
    </div>
  );
}
