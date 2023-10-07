import { getPdfs } from '@/handlers/getPdf';
import Link from 'next/link';

export async function PdfSList({ sessionId }: { sessionId: string }) {
  const pdfs = await getPdfs(sessionId);

  return (
    <>
      {pdfs.map((item) => (
        <div key={item.id}>
          <Link href={`/${item.id}`}>
            <div className='bg-white p-5 rounded cursor-pointer hover:text-purple-900 shadow my-3'>
              {item.name}
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
