"use client"
import React from "react"
import NavBar from "../components/NavBar";
import RightBar from "../components/chat/RightBar";
import LeftBar from "../components/chat/leftBar";
import QueryProvider from "../queryProvider";
export default function ChatPage(){
    return <div className="bg-[#f5f7f9] min-h-screen ">
      <NavBar/>
      <div className="flex flex-row jus">
        <LeftBar/>
        <QueryProvider><RightBar/></QueryProvider>

        
      </div>
    </div>;
}