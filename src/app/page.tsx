import { getServerAuthSession } from '@/utils/auth';
import HomePage from './components/HomePage';
import { redirect } from 'next/navigation';
import { PdfSList } from './components/PdfList';
import Loading from './components/Loading';
import { Suspense } from 'react';

export default async function Home() {
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
}
