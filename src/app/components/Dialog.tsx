import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadDropzone } from '@/utils/uploadthing';
import { Plus } from 'lucide-react';

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='bg-white'>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>AddPdf</DialogTitle>
          <DialogDescription>drap or upload your pdf</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid  items-center'>
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
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
