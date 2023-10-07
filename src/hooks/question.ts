import { useState } from 'react';

type Message = {
  type: 'apiMessage' | 'userMessage';
  message: string;
};
export function useFetchQuestions() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<{
    message: Message[];
    history: { question: string; answer: string }[];
  }>({
    message: [
      {
        type: 'apiMessage',
        message:
          "Hello, I'm a bot that can answer questions from a pdf. You can ask me questions related to the pdf.",
      },
    ],
    history: [],
  });
  const [error, setError] = useState('');

  async function fetchAnswers({
    pdfName,
    question,
  }: {
    pdfName: string;
    question: string;
  }) {
    setLoading(true);
    setData((item) => ({
      ...item,
      message: [
        ...item.message,
        {
          type: 'userMessage',
          message: question,
        },
      ],
    }));
    try {
      const post = await fetch('/api/gpt', {
        method: 'POST',
        body: JSON.stringify({
          pdf: pdfName,
          question,
          history: data.history,
        }),
      });
      
      if (!post.ok) {
        setLoading(false);
        setError('Something went wrong');
      }
      const postData = await post.json();

      setData((item) => ({
        ...item,
        message: [
          ...item.message,
          {
            type: 'apiMessage',
            message: postData,
          },
        ],
        history: [...item.history, { answer: postData, question }],
      }));

      setLoading(false);
    } catch {
      setLoading(false);
      setError('Something went wrong');
    }
  }
  return { fetchAnswers, isLoading, data, error };
}
