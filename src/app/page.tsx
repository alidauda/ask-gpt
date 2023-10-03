'use client';
import { UploadDropzone } from '@/utils/uploadthing';
import { useSession, signIn, signOut } from 'next-auth/react';
import '@uploadthing/react/styles.css';
export default function Home() {
  const { data: session, status } = useSession();
  return (
    <main>
      <div>{session?.user.id}</div>
      <UploadDropzone
        endpoint='imageUploader'
        appearance={{
          label: 'Upload',
        }}
        onClientUploadComplete={(data) => {
          if (!data) return;
          console.log(data[0].key, data[0].url);
        }}
      />
      <button onClick={() => signIn('google')}>Sign in</button>
    </main>
  );
}
