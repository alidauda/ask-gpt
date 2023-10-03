import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ConversationChain, RetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { NextResponse } from "next/server";
import { ConversationSummaryMemory } from "langchain/memory";
import { NextApiRequest, NextApiResponse } from "next";
import { type } from "os";
import { ChainValues } from "langchain/schema";

type ResponseData = {
  response: {
    humanQuestion: string;
    AIResponse: ChainValues;
  }[];
};
export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  
  const loader = new PDFLoader("sodapdf-converted.pdf");

  const docs = await loader.load();
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });
  const splitDocs = await textSplitter.splitDocuments(docs);
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );

  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const template = `Use the following pieces of context to answer the question at the end.
                    If you don't know the answer, just say that you don't know, don't try to make up an answer.
                    Use three sentences maximum and keep the answer as concise as possible.
                    Always say "thanks for asking!" at the end of the answer.
                    {context}
                    Question: {question}
                    Helpful Answer:`;

  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  const response = await chain.call({
    query: `You are an AI language model assistant. Your task is to generate five 
    different versions of the given user question to retrieve relevant documents from a vector 
    database.  question is ${req.body?.question}
    Provide these alternative questions seperated by newlines. add the orginal question as part of the response. if the previous chat history exist, you can use it. previous chat history is ${req.body?.history}. 
    If something went wrong with the question, just say that you don't know, don't try to make up an answer.

    Original question: {question}`,
  });

  let newhistory: ResponseData = {
    response: [],
  };
  if (req.body?.question && req.body?.history) {
    newhistory = {
      response: [
        ...req.body.history,
        { humanQuestion: req.body.question, AIResponse: response.text },
      ],
    };
  } else if (req.body?.question) {
    newhistory = {
      response: [
        { humanQuestion: req.body.question, AIResponse: response.text },
      ],
    };
  } else {
    newhistory = {
      response: [
        { humanQuestion: "unknown question", AIResponse: response.text },
      ],
    };
  }
  //  let history = new ChatMessageHistory()

  console.log("response", newhistory);
  console.log("question", req.body);
  return NextResponse.json(newhistory);
}


export const config = {
  api: {
    bodyParser: false,
  },
};