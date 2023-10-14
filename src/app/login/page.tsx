import { getServerAuthSession } from '@/utils/auth';
import Login from '../components/Login';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerAuthSession();
  if (session) {
    redirect('/');
  }

  return <Login />;
}
