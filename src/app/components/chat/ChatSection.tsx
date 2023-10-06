type Message = {
  type: 'apiMessage' | 'userMessage';
  message: string;
};
export type props = {
  message: Message[];
  // history: [string, string][];
};
export default function ChatSection({ message }: props) {
  return (
    <div className=' text-black '>
      {message &&
        message.map((value, index: number) => {
          return (
            <div key={index} className='flex flex-col'>
              {value.type == 'apiMessage' ? (
                <p className='bg-[#D988B9] w-[60%] self-start rounded-lg p-1 m-1 whitespace-break-spaces'>
                  {value.message}
                </p>
              ) : (
                <p className='bg-[#FACBEA] w-[60%] self-end rounded-lg p-1 m-1'>
                  {value.message}
                </p>
              )}
            </div>
          );
        })}
    </div>
  );
}
