import { createContext, useEffect, useState } from 'react';

import { NEXT_URL } from '@/config/index';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => checkUserLogin(), []);

  // Register User
  const register = async (user) => {
    console.log('User Object from Context : ', user);
    try {
      const res = await fetch(`${NEXT_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        router.push('/account/dashboard');
      } else {
        setError(data.message);
        setError(null);
      }
      // console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Login User
  const login = async ({ email: identifier, password }) => {
    try {
      const res = await fetch(`${NEXT_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        router.push('/account/dashboard');
      } else {
        setError(data.message);
        setError(null);
      }
      // console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Logout User
  const logout = async () => {
    try {
      const res = await fetch(`${NEXT_URL}/api/logout`, {
        method: 'POST',
      });
      if (res.ok) {
        setUser(null);
        router.push('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Check user Logged in
  const checkUserLogin = async (user) => {
    try {
      const res = await fetch(`${NEXT_URL}/api/user`);

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
