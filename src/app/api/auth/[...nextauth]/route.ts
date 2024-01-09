import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectMongoDb from '../../../../../lib/mongodb';
import User from '../../../../../models/user';
import bcrypt from 'bcryptjs'

interface IUser {
  email: string,
  password: string
}


const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials) {
        const {email, password} = <IUser>credentials
      try {
        await connectMongoDb();
        const user = await User.findOne({email})

        if(!user){
          return null
        }

        const passwordsMatch = await bcrypt.compare(password, user.password)
      
      if(!passwordsMatch){
        return null;
      }
      return user
      } catch (error) {
        console.log('error', error)
      }
      },
    }),
  ],
  session: {
    // Use the appropriate SessionStrategy here, for example, 'jwt' or undefined if not using a custom strategy
    strategy: 'jwt' as const, // or undefined
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
