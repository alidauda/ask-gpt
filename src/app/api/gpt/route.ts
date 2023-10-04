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
export async function POST(req: Request) {
  const loader = new PDFLoader("sodapdf-converted.pdf");
  const body = await req.json();

  // const body = JSON.parse(req.body);
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

  const CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT = `/*
  Objective: Extract pertinent context from a conversation history and summarise in no more than one paragrapgh
  
  Input:
  - Chat History: ${body?.history}
  - New Question: ${body?.question}
  
  Guidelines:
  - Extract Relevant Context: Identify and extract any section from the chat history that provides relevant context to the New question.
  
  Use the following pieces of context to answer the user's question.
  If you don't know the answer, just say that you don't know, don't try to make up an answer.
  Answer Format:
  Utilize the structure below to format your response:
  
  [Your formulated response goes here]
  */
  `;



  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  const response = await chain.call({
    query: CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT,
  });


  let newhistory: ResponseData = {
    response: [],
  };

  if (body?.question && body?.history) {
    
    newhistory = {
      response: [
        ...body?.history,
        { humanQuestion: body?.question, AIResponse: response.text },
      ],
    };
    console.log("question", body);

  } else if (body?.question) {
    newhistory = {
      response: [{ humanQuestion: body?.question, AIResponse: response.text }],
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
  return NextResponse.json(newhistory);
}
