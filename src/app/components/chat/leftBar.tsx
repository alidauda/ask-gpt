import { getOnePdf } from '@/handlers/getPdf';

export default async function LeftBar({ url }: { url: string }) {
  const pdf = await getOnePdf(url);
  return (
    <div className='lg:grid col-span-2 h-full  overflow-hidden hidden '>
      <iframe
        src={pdf.url}
        title={pdf.name}
        className='w-full h-full overflow-hidden'
      ></iframe>
    </div>
  );
}
