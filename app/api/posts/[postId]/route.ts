import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export const PATCH = async (
  req: Request,
  { params }: { params: { postId: string } }
) => {
  const body = await req.json();
  const { title, content } = body;

  try {
    const note = await prismadb.note.update({
      where: {
        id: Number(params.postId),
      },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(note);
  } catch (err: any) {
    console.log(`Error: ${err}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { postId: string } }
) => {
  try {
    const note = await prismadb.note.delete({
      where: {
        id: Number(params.postId),
      },
    });

    return NextResponse.json(note);
  } catch (err: any) {
    console.log(`Error: ${err}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
