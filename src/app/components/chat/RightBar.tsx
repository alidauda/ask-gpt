'use client';

import { FormEvent, useEffect, useState } from 'react';
import Circular from '../circular';

import { getChat } from '@/helpers/getChats';

import ChatSection, { historyType } from './ChatSection';

import { useFetchQuestions } from '@/hooks/question';

export default function RightBar() {
  const { fetchAnswers, data, isLoading } = useFetchQuestions();
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.currentTarget;

    const formData = new FormData(e.currentTarget);
    const question = formData.get('question') as string;
    if (question) {
      await fetchAnswers({
        pdfName: 'clncc8di90003uok0hpnfce5m',
        question: question,
      });
      //clear fields
      if (formElement) {
        formElement.reset();
      }
    }
    console.log(formData.get('question'));
  }
  console.log(data);

  return (
    <div className='w-[70vw] h-[inherit] bg-white min-h-[90vh] border-l border-gray-300 flex flex-col justify-between overflow-hidden'>
      {/* <div className="h-[75vh] overflow-y-scroll scroll-auto	">{data && <ChatSection data={data} />}</div> */}
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
            className='bg-[#43c6dd] w-[10%] h-[5vh] rounded-lg m-4'
          >
            send
          </button>
        )}
      </form>
    </div>
  );
}
