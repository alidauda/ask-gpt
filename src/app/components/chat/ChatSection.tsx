type props = {
  data: historyType[];
};
export type historyType = {
  humanQuestion: string;
  AIResponse: string;
};
export default function ChatSection({data}:props) {  
  return (
    <div className=" text-black ">
      {data &&
        data.map((value, index: number) => {
          return (
            <div key={index} className="flex flex-col">
              <p className="bg-blue-500 w-[60%] self-end rounded-lg p-1 m-1">{value.humanQuestion}</p>
              <p className="bg-green-500 w-[60%] self-start rounded-lg p-1 m-1">{value.AIResponse}</p>
            </div>
          );
        })}
    </div>
  );
}
