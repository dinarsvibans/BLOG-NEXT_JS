import { NextResponse, NextRequest } from 'next/server';
import connectMongoDb from '../../../../lib/mongodb';
import User from '../../../../models/user';
import bcrypt from 'bcryptjs';



export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { name, surname, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('nameeeee', name);
    console.log('surname', surname);
    console.log('email', email);
    console.log('password', password);

    await connectMongoDb();
const user = await User.create({ name, surname, email, password: hashedPassword });

    return NextResponse.json({ message: "user registered" });
  } catch (error) {
    console.error('An error occurred while registering the user:', error);
    return NextResponse.json(
      { message: 'An error occurred while registering the user' },
      { status: 500 }
    );
  }
}
