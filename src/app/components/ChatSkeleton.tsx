import { Skeleton } from '@/components/ui/skeleton';

export default function ChatLoading() {
  return (
    <div className='grid gap-2 p-2'>
      <Skeleton className='h-4 lg:w-96 w-64' />
      <Skeleton className='h-4 lg:w-96 w-64' />
      <Skeleton className='h-4 lg:w-96 w-64' />
      <Skeleton className='h-4 lg:w-96 w-64' />
      <Skeleton className='h-4 lg:w-96 w-64' />
      <Skeleton className='h-4 lg:w-96 w-64' />
      <Skeleton className='h-4 lg:w-96 w-64' />
      <Skeleton className='h-4 lg:w-96 w-64' />
    </div>
  );
}
