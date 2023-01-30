import { AuthContextProvider } from '../contexts/AuthContext';
import { ChakraProvider, Stack } from '@chakra-ui/react';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ChakraProvider>
        <Stack minHeight="100vh" justifyContent="space-between">
          <Component {...pageProps} />
        </Stack>
      </ChakraProvider>
    </AuthContextProvider>
  );
}
