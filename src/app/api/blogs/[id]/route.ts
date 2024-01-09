import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDb from '../../../../../lib/mongodb';
import Blog from '../../../../../models/blogs';
import Comment from '../../../../../models/blogs';

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest,{ params }: Params) {
  try {
    const { id } = params
    const {title,content,author,category,image} = await request.json()
    await connectMongoDb();
    await await Blog.findByIdAndUpdate(id, {title,content,author,category,image});
    return NextResponse.json({message: "post has been edited"}, {status: 200});
  } catch (error) {
    console.error('Error updating blog post:', error);
  }
}

export async function GET(request: NextApiRequest, { params }: Params) {
  await connectMongoDb();
  const { id } = params;
  const blogContent = await Blog.findOne({ _id: id })
    .populate('comments')
    .lean();
  return NextResponse.json({ blogContent }, { status: 200 });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    await connectMongoDb();
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ message: "post has been deleted" }, { status: 200 });
  } catch (error) {
    console.error('Error deleting blog post:', error);
  }
}