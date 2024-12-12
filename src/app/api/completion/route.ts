// /api/completion
'use server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import {generateText, streamText} from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const google = createGoogleGenerativeAI({
  // custom settings
  apiKey : process.env.GEMINI_API_KEY
});


export async function POST(req: Request) {
    // extract the prompt from the request body
    const body = await req.json();
    // console.log(body)
    let hint = body.prompt
    // console.log(hint)
    const query = `Please generate a completion for the following text: ${ hint }`;
    const result = streamText({
        model: google('gemini-1.5-flash'),
        prompt : query
    });
    return result.toDataStreamResponse();
  
        
}
