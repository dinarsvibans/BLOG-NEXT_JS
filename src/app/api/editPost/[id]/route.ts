import { NextRequest, NextResponse } from "next/server";
import connectMongoDb from "../../../../../lib/mongodb";
import Blog from "../../../../../models/blogs";

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