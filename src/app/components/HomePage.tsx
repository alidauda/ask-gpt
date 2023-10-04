'use client';

import { UploadDropzone } from '@/utils/uploadthing';
import '@uploadthing/react/styles.css';
type Props = {
  id: string;
  name: string;
  url: string;
}[];
export default function HomePage({ pdfs }: { pdfs: Props }) {
  return (
    <div>
      <div>
        {pdfs.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
      <UploadDropzone
        endpoint='imageUploader'
        appearance={{
          label: 'Upload',
        }}
        onClientUploadComplete={async (data) => {
          if (!data) return;
          const pdf = await fetch('/api/pdf', {
            method: 'POST',
            body: JSON.stringify({
              name: data[0].name,
              url: data[0].url,
              key: data[0].key,
            }),
          });
          const pdfData = await pdf.json();
          console.log(pdfData);
        }}
      />
    </div>
  );
}
