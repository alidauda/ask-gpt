'use client';
import { FormEvent, useEffect, useState } from 'react';
import Circular from '../circular';
import { getChat } from '@/helpers/getChats';
import { useFetchQuestions } from '@/hooks/question';
import ChatSection from './ChatSection';

export default function RightBar({ id }: { id: string }) {
  const { fetchAnswers, data, isLoading } = useFetchQuestions();
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.currentTarget;

    const formData = new FormData(e.currentTarget);
    const question = formData.get('question') as string;
    if (question) {
      await fetchAnswers({
        pdfName: id,
        question: question,
      });
      //clear fields

      formElement.delete();
    }
    console.log(formData.get('question'));
  }
  console.log(data);

  return (
    <div className='w-[70vw] h-[inherit] bg-white min-h-[90vh] border-l border-gray-300 flex flex-col justify-between overflow-hidden'>
      <div className='h-[75vh] overflow-y-scroll scroll-auto	'>
        {data && <ChatSection message={data.message} />}
      </div>
      <form
        className='border-t h-[10vh] flex flex-row justify-between items-center'
        onSubmit={onSubmit}
      >
        <input
          name='question'
          type='text'
          className=' h-[10vh] w-[85%] active:outline-1'
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
