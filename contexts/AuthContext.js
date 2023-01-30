import { createContext, useState, useEffect } from 'react';
import { logout } from '../lib/auth';
export const initialAuthState = {
  isLoggedIn: false,
};

export const AuthContext = createContext(initialAuthState);

export function AuthContextProvider({ children }) {
  const [userAuth, setUserAuth] = useState(initialAuthState);
  console.log(
    '🚀 ~ file: authContext.js:13 ~ AuthContextProvider ~ userAuth',
    userAuth
  );

  useEffect(() => {
    const storedAuth = localStorage.getItem('userAuth');
    console.log(
      '🚀 ~ file: authContext.js:15 ~ useEffect ~ storedAuth',
      storedAuth
    );

    if (storedAuth) {
      setUserAuth({ ...JSON.parse(storedAuth) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userAuth', JSON.stringify(userAuth));
    console.log(
      '🚀 ~ file: authContext.js:24 ~ useEffect ~ userAuth',
      userAuth
    );
  }, [userAuth]);

  const setUserAsLoggedIn = (role) => {
    setUserAuth({
      isLoggedIn: true,
      role,
    });
  };

  const setUserAsLoggedOut = () => {
    setUserAuth({
      isLoggedIn: false,
    });
    logout();
  };

  return (
    <AuthContext.Provider
      value={{ userAuth, setUserAsLoggedIn, setUserAsLoggedOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
