"use client"
import QueryProvider from "@/app/queryProvider";
import ChatSection from "./ChatSection";
import { QueryClient, QueryClientProvider } from "react-query";

export default function RightBar() {
    const queryClient = new QueryClient()

  return (
    <div className="w-[70vw] h-[inherit] bg-white min-h-[90vh] border-l border-gray-300 flex flex-col justify-between">
      <div>       
      <QueryClientProvider client={queryClient}>
      <ChatSection/>
    </QueryClientProvider>
  </div>
      <div className="border-t min-h-[10vh] flex flex-row justify-between items-center">
        
        <input
          type="text"
          className=" h-[10vh] w-[85%] active:outline-1"
          placeholder="Please enter a question"
        />
        <button type="submit" className="bg-[#43c6dd] w-[10%] h-[5vh] rounded-lg m-4">send</button>
      </div>
    </div>
  );
}
