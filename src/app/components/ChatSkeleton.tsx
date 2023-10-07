import { Skeleton } from '@/components/ui/skeleton';

export default function ChatLoading() {
  return (
    <div className='grid gap-2 p-2'>
      <Skeleton className='h-4 w-96' />
      <Skeleton className='h-4 w-96' />
      <Skeleton className='h-4 w-96' />
      <Skeleton className='h-4 w-96' />
      <Skeleton className='h-4 w-96' />
      <Skeleton className='h-4 w-96' />
      <Skeleton className='h-4 w-96' />
      <Skeleton className='h-4 w-96' />
      <Skeleton className='h-4 w-96' />
    </div>
  );
}
