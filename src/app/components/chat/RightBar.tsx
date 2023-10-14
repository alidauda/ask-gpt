'use client';
import { FormEvent, use, useState } from 'react';
import Circular from '../circular';

import { useFetchQuestions } from '@/hooks/question';
import ChatSection from './ChatSection';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function RightBar({ id }: { id: string }) {
  const { fetchAnswers, data, isLoading } = useFetchQuestions();
  const [question, setQuestion] = useState('');
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (question.trim().length > 6) {
      try {
        await fetchAnswers({
          pdfName: id,
          question: question.trim(),
        });
        setQuestion('');
      } catch (e) {
        setQuestion('');
      }

      //clear fields
    }
  }

  return (
    <div className=' flex flex-col col-span-3    border-l border-gray-300   justify-between'>
      <div className=' overflow-y-scroll scroll-auto row-span-3  h-[90%]'>
        {data && <ChatSection message={data.message} isLoading={isLoading} />}
      </div>
      <form
        className='border-t flex flex-row justify-around  p-3 bg-white  gap-4'
        onSubmit={onSubmit}
      >
        <Input
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
          type='text'
          className=' w-[85%]  bg-white p-7 text-lg  '
          placeholder='Please enter a question'
        />

        <Button disabled={isLoading} type='submit' className='p-7'>
          {isLoading ? <Circular /> : 'send'}
        </Button>
      </form>
    </div>
  );
}
