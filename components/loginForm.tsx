"use client"

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
  
      // Check if the response indicates an error
      if (res?.error) {
        setError('Invalid credentials');
        return;
      }
  
      // If successful, navigate to the dashboard
      router.replace('/dashboard');
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="email">Email</label>
        <input
          className="input"
          type="text"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          className="input"
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='loginButton'>Login</button>

        {error && <div>{error}</div>}
        <span className="dontHaveAccount">Dont have account?</span>
        <Link href={'/register'}>
          <span className="register">Register</span>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
