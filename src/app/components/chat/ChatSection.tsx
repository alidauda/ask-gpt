import { Skeleton } from '@/components/ui/skeleton';
import ChatLoading from '../ChatSkeleton';
import { TypeAnimation } from 'react-type-animation';

type Message = {
  type: 'apiMessage' | 'userMessage';
  message: string;
};
export type props = {
  message: Message[];
  isLoading: boolean;
  // history: [string, string][];
};
export default function ChatSection({ message, isLoading }: props) {
  const load = true;
  return (
    <div className=' text-black min-h-[80vh]'>
      {message &&
        message.map((value, index: number) => {
          return (
            <div key={index} className='flex flex-col'>
              {value.type == 'apiMessage' ? (
                <p className='bg-[#D988B9] w-[60%] self-start rounded-lg p-1 m-1 whitespace-break-spaces'>
                  <TypeAnimation
                    sequence={[value.message]}
                    cursor={false}
                    speed={99}
                  />
                </p>
              ) : (
                <p className='bg-[#FACBEA] w-[60%] self-end rounded-lg p-1 m-1'>
                  {value.message}
                </p>
              )}
            </div>
          );
        })}
      {isLoading && <ChatLoading />}
    </div>
  );
}
