import { NextResponse, NextRequest } from 'next/server';
import connectMongoDb from '../../../../lib/mongodb';
import Comment from '../../../../models/comments';

export async function POST(req: NextRequest) {
  try {
    const { text, author, blog } = await req.json();
    await connectMongoDb();
    const comment = await Comment.create({ text, author, blog });
    return NextResponse.json({ message: 'comment has been posted' });
  } catch (error) {
    console.error('An error occurred while postting a comment:', error);
    return NextResponse.json(
      { message: 'An error occurred while postting a comment' },
      { status: 500 }
    );
  }
}
