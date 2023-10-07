import { getOnePdf } from '@/handlers/getPdf';

export default async function LeftBar({ url }: { url: string }) {
  const pdf = await getOnePdf(url);
  return (
    <div className='lg:grid col-span-2 overflow-hidden hidden '>
      <iframe
        src={pdf.url}
        title={pdf.name}
        width={'100%'}
        height={'550'}
      ></iframe>
    </div>
  );
}
