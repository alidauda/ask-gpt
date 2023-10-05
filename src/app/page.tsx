import { getPdfs } from '@/handlers/getPdf';
import { getServerAuthSession } from '@/utils/auth';
import HomePage from './components/HomePage';
import Login from './components/Login';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect('/login');
  }
  const pdfs = await getPdfs(session.user.id);
  return <HomePage pdfs={pdfs} />;
}
