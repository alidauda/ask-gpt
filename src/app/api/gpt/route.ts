import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { WebPDFLoader } from 'langchain/document_loaders/web/pdf';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { NextResponse } from 'next/server';
import { ChainValues } from 'langchain/schema';
import * as z from 'zod';
import { getServerAuthSession } from '@/utils/auth';
import { BufferMemory } from 'langchain/memory';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import prisma from '@/utils/db';
import { HumanMessage, AIMessage } from 'langchain/schema';

const bodySchema = z.object({
  pdf: z.string(),
  question: z.string(),
  history: z.array(z.tuple([z.string(), z.string()])),
});

export async function POST(req: Request) {
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json({ error: 'no response' });
  }
  try {
    const body = await req.json();
    const validate = bodySchema.safeParse(body);
    if (!validate.success) {
      return NextResponse.json(validate.error);
    }
    const { data } = validate;
    const url = await prisma.pdf.findUnique({
      where: {
        id: data.pdf,
      },
    });
    if (!url) {
      return NextResponse.json({ error: 'no pdf found' });
    }
    const pdf = await fetch(url.url);
    const blob = await pdf.blob();

    const loader = new WebPDFLoader(blob);

    // const body = JSON.parse(req.body);
    const docs = await loader.load();
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
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
      modelName: 'gpt-3.5-turbo',
      temperature: 0,
    });
    const CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT = `Given the following conversation and a follow up question, return the conversation history excerpt that includes any relevant context to the question if it exists and rephrase the follow up question to be a standalone question.  
    Chat History:  
    {chat_history}  
    Follow Up Input: {question}  
    Your answer should follow the following format:  
    \`\`\`  
    Use the following pieces of context to answer the users question.  
    If you don't know the answer, just say that you don't know, don't try to make up an answer.  
    ----------------  
    <Relevant chat history excerpt as context here>  
    Standalone question: <Rephrased question here>  
    \`\`\``;
    const question = new HumanMessage(body.history[0]);
    const chain = ConversationalRetrievalQAChain.fromLLM(
      model,
      vectorStore.asRetriever(),
      {
        questionGeneratorChainOptions: {
          template: CUSTOM_QUESTION_GENERATOR_CHAIN_PROMPT,
        },
      }
    );
    const response = await chain.call({
      question: data.question,
      chat_history: data.history,
    });

    //  let history = new ChatMessageHistory()

    return NextResponse.json(response.text);
  } catch (e) {
    return NextResponse.json(e);
  }
}
