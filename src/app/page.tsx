import { getServerAuthSession } from '@/utils/auth';
import HomePage from './components/HomePage';
import { redirect } from 'next/navigation';
import { PdfSList } from './components/PdfList';
import Loading from './components/Loading';
import { Suspense } from 'react';

export default async function Home() {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      redirect('/login');
    }

    return (
      <HomePage>
        <Suspense fallback={<Loading />}>
          <PdfSList sessionId={session.user.id} />
        </Suspense>
      </HomePage>
    );
  } catch (e) {
    return (
      <HomePage>
        <div className='flex h-screen justify-center items-center'>
          an error has occurred Please try again later
        </div>
      </HomePage>
    );
  }
}
