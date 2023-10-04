import axios from "axios";

type props={
    question:string,
    history:historyType[]
}
type historyType={
    humanQuestion:string,
    AIResponse:string


}
export async function getChat(prop: props){

    try {
        const response=await axios.post("http://localhost:3000/api/hello",prop)

    console.log(response.data)

    if(response.data.response){
        return response.data.response

    } 
    else{
        throw new Error("")
    }
    } catch (error) {
        if (error instanceof Error) {
            
        throw new Error(error.message)
        }
        
        throw new Error("something went wrong! send you messeage again")
    }

}

