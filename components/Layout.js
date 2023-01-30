import Header from './Header';
import Footer from './Footer';
import { useContext, useEffect } from 'react';
import Router from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import { getTokenFromLocalStorage } from '../lib/auth';

const Layout = ({ children }) => {
  const { userAuth } = useContext(AuthContext);

  const redirectIfAuthenticated = () => {
    if (!userAuth.isLoggedIn && !getTokenFromLocalStorage()) {
      Router.push('/login');
    }
  };

  useEffect(() => {
    redirectIfAuthenticated();
  }, [userAuth]);

  return (
    <>
      <Header />
      <main style={{ flex: '1 1 auto' }}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
