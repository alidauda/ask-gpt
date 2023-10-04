"use client"
import { getChat } from "@/helpers/getChats";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";


type props={
    question:string,
    history:historyType[]
}
type historyType={
    humanQuestion:string,
    AIResponse:string


}
export default function ChatSection() {
    // const query= useMutation({
    //     mutationFn:getChat })
    const [question, setQuestion]=useState<props>()

        useEffect(()=>{
            myMutate()
        })

        const myMutate=async()=>{

            const data= await getChat()
            // await query.mutate({question:"Hello, explain the xontext to me",history:[]})

        }
  return <div>

    {/* {query.data&&query.data.response} */}


  </div>;
}
