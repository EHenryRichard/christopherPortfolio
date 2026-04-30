import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const VIDEO_MAP: Record<string, string> = {
  '1': '[PROJECT 01] – VOICE OVER  POEM– [Fast paced Edits].mp4',
  '2': '[PROJECT 02] – CHEMICAL STUDIOS BRAND MARKETING VIDEO– [Product Teaser with motion Graphics].mp4',
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const filename = VIDEO_MAP[params.id];
  if (!filename) return new NextResponse('Not Found', { status: 404 });

  const videoPath = path.join(process.cwd(), 'private', 'videos', filename);
  if (!fs.existsSync(videoPath)) return new NextResponse('Not Found', { status: 404 });

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.get('range');

  const toWebStream = (nodeStream: fs.ReadStream) =>
    new ReadableStream({
      start(controller) {
        nodeStream.on('data', (chunk) => controller.enqueue(chunk));
        nodeStream.on('end', () => controller.close());
        nodeStream.on('error', (err) => controller.error(err));
      },
    });

  const baseHeaders = {
    'Content-Type': 'video/mp4',
    'Cache-Control': 'no-store',
    'Content-Disposition': 'inline',
    'X-Content-Type-Options': 'nosniff',
  };

  if (range) {
    const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
    const start = parseInt(startStr, 10);
    const end = endStr ? parseInt(endStr, 10) : fileSize - 1;
    const chunkSize = end - start + 1;

    return new NextResponse(toWebStream(fs.createReadStream(videoPath, { start, end })), {
      status: 206,
      headers: {
        ...baseHeaders,
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': String(chunkSize),
      },
    });
  }

  return new NextResponse(toWebStream(fs.createReadStream(videoPath)), {
    status: 200,
    headers: {
      ...baseHeaders,
      'Accept-Ranges': 'bytes',
      'Content-Length': String(fileSize),
    },
  });
}
