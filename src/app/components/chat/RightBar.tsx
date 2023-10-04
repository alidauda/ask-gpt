"use client";
import QueryProvider from "@/app/queryProvider";
import { FormEvent, useEffect, useState } from "react";
import Circular from "../circular";

import { getChat } from "@/helpers/getChats";
import { useMutation } from "@tanstack/react-query";
import ChatSection, { historyType } from "./ChatSection";

export default function RightBar() {

    const [data, setData]=useState<historyType[]>([])

  const mutation = useMutation({
    mutationFn: getChat,
    onSuccess(data) {
        setData(data)
      console.log("the data is", data);
    },
    onError(error) {
      console.log(error);
    },
  });
  useEffect(() => {
    myMutate();
  }, []);

  const myMutate = async () => {
    await mutation.mutate({
      question: "Hello, what is this about",
      history: [],
    });
  };

 async function onSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    const formElement = e.currentTarget;

    const formData= new FormData(e.currentTarget)
    const question=formData.get("question") as string
    if(question){
        await mutation.mutate({
            question:question,
            history:[
                ...(data||[])
            ]
    
        })

        //clear fields
        if (formElement) {
            formElement.reset();
        }   
     }
    console.log(formData.get("question"))
 }

  return (
    <div className="w-[70vw] h-[inherit] bg-white min-h-[90vh] border-l border-gray-300 flex flex-col justify-between overflow-hidden">
      <div className="h-[75vh] overflow-y-scroll scroll-auto	">{data && <ChatSection data={data} />}</div>
      <form className="border-t h-[10vh] flex flex-row justify-between items-center" onSubmit={onSubmit}>
        <input

          name="question"
          type="text"
          className=" h-[10vh] w-[85%] active:outline-1"
          placeholder="Please enter a question"
        />
        {
            mutation.isLoading?<div className="w-[8%]"><Circular/></div>: <button
            disabled={mutation.isLoading}
              type="submit" 
              className="bg-[#43c6dd] w-[10%] h-[5vh] rounded-lg m-4"
            >
              send
            </button> 
        }
     
       
      </form>
    </div>
  );
}
