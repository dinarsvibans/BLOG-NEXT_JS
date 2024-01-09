import { NextResponse, NextRequest } from 'next/server';
import connectMongoDb from '../../../../lib/mongodb';
import Blog from '../../../../models/blogs';


export async function POST(req:NextRequest){
    try {
        const {title, content, author, category, image} = await req.json();
        await connectMongoDb();
        const blog = await Blog.create({ title, content, author, category, image });
        return NextResponse.json({ message: "blog has been posted" });
    } catch (error) {
        console.error('An error occurred while postting a blog:', error);
        return NextResponse.json(
          { message: 'An error occurred while postting a blog' },
          { status: 500 }
        );
      }


}


export async function GET(){
  await connectMongoDb();
  const blogs = await Blog.find().lean();
  return NextResponse.json({blogs})
}