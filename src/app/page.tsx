'use client';
import { UploadDropzone } from '@/utils/uploadthing';
import { useSession, signIn, signOut } from 'next-auth/react';
import '@uploadthing/react/styles.css';
import { FormEvent, useState } from 'react';
export default function Home() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState([]);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/gpt', {
      method: 'POST',
      body: JSON.stringify({
        question: 'Syntax can be described by context-free grammars.',
      }),
    });

    console.log(await response.json());
  };
  return (
    <main>
      <div>{session?.user.id}</div>
      {/* <UploadDropzone
        endpoint='imageUploader'
        appearance={{
          label: 'Upload',
        }}
        onClientUploadComplete={(data) => {
          if (!data) return;
          console.log(data[0].key, data[0].url);
        }}
      />
      <button onClick={() => signIn('google')}>Sign in</button> */}
      <form onSubmit={handleSubmit}>
        <textarea placeholder='enter a question' name='question' />
        <button type='submit'>submit</button>
      </form>
    </main>
  );
}
