import Head from 'next/head';
import { useEffect } from 'react';
import Router from 'next/router';
export default function Home() {
  useEffect(() => {
    Router.push('/login');
  }, []);

  return (
    <div>
      <Head>
        <title>APP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <footer></footer>
    </div>
  );
}
