import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const promptSchema = z.object({
  prompt: z.string().min(1),
  model: z.string().optional(),
});

// Basic chatbot endpoint. If OPENAI_API_KEY is configured, you can extend this to call the OpenAI API.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = promptSchema.parse(body);

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ success: true, message: 'OpenAI not configured. This is a placeholder response.', prompt: data.prompt, reply: 'Chatbot not configured.' });
    }

    // Minimal implementation hint: user can extend to call OpenAI here.
    return NextResponse.json({ success: true, message: 'OpenAI configured but runtime call is not implemented in this scaffold.' });
  } catch (err: any) {
    console.error('chatbot POST error', err);
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Invalid data', details: err.errors }, { status: 400 });
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 });
  }
}
