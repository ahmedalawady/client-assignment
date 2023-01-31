import { createContext, useState, useEffect } from 'react';
import { logout } from '../lib/auth';
export const initialAuthState = {
  isLoggedIn: false,
};

export const AuthContext = createContext(initialAuthState);

export function AuthContextProvider({ children }) {
  const [userAuth, setUserAuth] = useState(initialAuthState);
  useEffect(() => {
    const storedAuth = localStorage.getItem('userAuth');

    if (storedAuth) {
      setUserAuth({ ...JSON.parse(storedAuth) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userAuth', JSON.stringify(userAuth));
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
