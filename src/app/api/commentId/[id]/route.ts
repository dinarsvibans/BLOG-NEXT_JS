// pages/api/comments/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import connectMongoDb from '../../../../../lib/mongodb';
import Comment from '../../../../../models/comments';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: NextApiRequest, { params }: Params) {
  try {
    await connectMongoDb();

    const { id } = params;
    const comments = await Comment.find({ blog: id });
    return NextResponse.json({ comments });
  } catch (error) {
    console.error(error);
  }
}
