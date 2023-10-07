'use client';
import { FormEvent, use, useState } from 'react';
import Circular from '../circular';

import { useFetchQuestions } from '@/hooks/question';
import ChatSection from './ChatSection';
import { Input } from '@/components/ui/input';

export default function RightBar({ id }: { id: string }) {
  const { fetchAnswers, data, isLoading } = useFetchQuestions();
  const [question, setQuestion] = useState('');
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (question.trim().length > 6) {
      await fetchAnswers({
        pdfName: id,
        question: question.trim(),
      });
      //clear fields
      setQuestion('');
    }
  }
  console.log(data);

  return (
    <div className=' flex flex-col col-span-3  bg-white  border-l border-gray-300  justify-between '>
      <div className='max-h-[75vh] overflow-y-scroll scroll-auto	'>
        {data && <ChatSection message={data.message} isLoading={isLoading} />}
      </div>
      <form
        className='border-t h-[10vh] flex flex-row justify-between items-center p-6'
        onSubmit={onSubmit}
      >
        <Input
          onChange={(e) => setQuestion(e.target.value)}
          defaultValue={question}
          type='text'
          className=' w-[85%]  bg-white p-2  '
          placeholder='Please enter a question'
        />
        {isLoading ? (
          <div className='w-[8%]'>
            <Circular />
          </div>
        ) : (
          <button
            disabled={isLoading}
            type='submit'
            className='bg-[#B0578D] w-[10%] h-[5vh] rounded-lg m-4'
          >
            send
          </button>
        )}
      </form>
    </div>
  );
}
