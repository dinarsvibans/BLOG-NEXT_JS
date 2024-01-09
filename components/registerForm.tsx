'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface form {
  name: string;
  surname: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formValues.name ||
      !formValues.surname ||
      !formValues.email ||
      !formValues.password
    ) {
      setError('All fields are required');
      return;
    }
    try {
      const userExistss = await fetch('api/userExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formValues.email }),
      });


      const { user } = await userExistss.json();
      if (user){
        setError("user with this email allready exists")
        return
      }

      const response = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formValues.name,
          surname: formValues.surname,
          email: formValues.email,
          password: formValues.password,
        }),
      });
      setFormValues({
        name: '',
        surname: '',
        email: '',
        password: '',
      });
  
      if (response.ok) {
        const form = e.target as HTMLFormElement
        form.reset()
        router.push('/login')
        console.log('Registration successful');
      } else {
        setError('Registration failed');
      }
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <form className="form" onSubmit={handleRegister}>
      <label htmlFor="name">Name</label>
      <input
        className="input"
        type="text"
        name="name"
        id="name"
        placeholder="name"
        value={formValues.name}
        onChange={(e) =>
          setFormValues((prev) => ({ ...prev, name: e.target.value }))
        }
      />
      <label htmlFor="surname">Surname</label>
      <input
        className="input"
        type="text"
        name="surname"
        id="surname"
        placeholder="surname"
        value={formValues.surname}
        onChange={(e) =>
          setFormValues((prev) => ({ ...prev, surname: e.target.value }))
        }
      />
      <label htmlFor="email">Email</label>
      <input
        className="input"
        type="text"
        id="email"
        placeholder="Email"
        value={formValues.email}
        onChange={(e) =>
          setFormValues((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <label htmlFor="password">Password</label>
      <input
        className="input"
        type="password"
        id="password"
        placeholder="Password"
        value={formValues.password}
        onChange={(e) =>
          setFormValues((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <button className='loginRegisterButton' type="submit">Register</button>
      <div>{error}</div>
      <span className="dontHaveAccount">Allredy have account?</span>
      <Link href={'/login'}>
        <span className="register">Login</span>
      </Link>
    </form>
  );
};

export default RegisterForm;
