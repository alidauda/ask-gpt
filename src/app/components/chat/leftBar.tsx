import chatbot from "@/images/chat-bot-svgrepo-com.svg"
import Image from "next/image"

export default function LeftBar(){
    return <div className="w-[30vw] min-h-[90vh] flex flex-col justify-center items-center" > 
    <Image src={chatbot.src} width={250} alt="chatbot image" height={500}/>
    </div>
}