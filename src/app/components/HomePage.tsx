'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadDropzone } from '@/utils/uploadthing';
import { buttonVariants } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import '@uploadthing/react/styles.css';
import { DialogDemo } from './Dialog';
import Link from 'next/link';

type Props = {
  id: string;
  name: string;
  url: string;
}[];

export default function HomePage({ pdfs }: { pdfs: Props }) {
  return (
    <div className='w-full h-[100dvh]  px-40 bg-purple-100'>
      <nav className='w-full flex justify-between p-10'>
        <div className='text-purple-700 text-2xl'>
          <p>ChatWPDF</p>
        </div>
        <div className='flex gap-3 justify-center items-center'>
          <div>
            <Input className='bg-white w-80 p-3 h-11' placeholder='search' />
          </div>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </nav>

      <div className='px-72 py-11  '>
        <div className='flex gap-2 justify-center items-center '>
          <Input className='bg-white w-full p-3 ' placeholder='search' />
          <Button className='bg-white text-purple-900 hover:bg-purple-300'>
            search
          </Button>
          <DialogDemo />
        </div>
        {pdfs.map((item) => (
          <div key={item.id}>
            <Link href={`/${item.id}`}>
              <div className='bg-white p-5 rounded cursor-pointer hover:text-purple-900 shadow my-3'>
                {item.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
      {/**/}
    </div>
  );
}
