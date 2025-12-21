import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const presignSchema = z.object({
  filename: z.string().min(1),
  contentType: z.string().min(1),
});

// Generate presigned upload URL for S3 (placeholder). If AWS credentials are configured, you can implement presigning.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = presignSchema.parse(body);

    if (!process.env.AWS_S3_BUCKET || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      return NextResponse.json({ success: false, error: 'S3 not configured. Set AWS_S3_BUCKET and AWS_* env vars to enable presigned uploads.' }, { status: 501 });
    }

    // Placeholder: return a stubbed presigned URL and key
    const key = `uploads/${Date.now()}_${data.filename}`;
    const url = `https://s3.amazonaws.com/${process.env.AWS_S3_BUCKET}/${key}?presigned=stub`;

    return NextResponse.json({ success: true, uploadUrl: url, key, contentType: data.contentType });
  } catch (err: any) {
    console.error('upload POST error', err);
    if (err instanceof z.ZodError) return NextResponse.json({ error: 'Invalid data', details: err.errors }, { status: 400 });
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 });
  }
}
