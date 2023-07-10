import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const body = await req.json();
  const { title, content } = body;

  try {
    const note = await prismadb.note.create({
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (err: any) {
    console.log(`Error: ${err}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const notes = await prismadb.note.findMany({
      select: {
        id: true,
        title: true,
        content: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json(notes, { status: 200 });
  } catch (err: any) {
    console.log(`Error: ${err}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
