import React, { useContext } from 'react';
import { getTokenFromLocalStorage, logIn } from '../lib/auth';
import { useState, useEffect } from 'react';
import {
  Input,
  Button,
  Flex,
  Heading,
  Alert,
  AlertIcon,
  Container,
  Grid,
  Stack,
  Box,
  Image,
  StackDivider,
} from '@chakra-ui/react';
import Router from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';

export default function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { userAuth, setUserAsLoggedIn } = useContext(AuthContext);
  const redirectIfAuthenticated = () => {
    if (userAuth?.isLoggedIn || getTokenFromLocalStorage()) {
      Router.push('/tickets');
    }
  };

  useEffect(() => {
    redirectIfAuthenticated();
  }, []);

  const signIn = async () => {
    setIsLoading(true);
    const res = await logIn(username, password);
    if (res.success) {
      setUserAsLoggedIn(res.role);
      Router.push('/tickets');
    } else {
      // console.log(res);
      setError(res.message);
    }

    setIsLoading(false);
  };
  return (
    <>
      <Header />
      <main style={{ flex: '1 1 auto' }}>
        <Flex align="center" justify="center" minH="70vh" bg="gray.100">
          <Stack rounded="lg" shadow="md" w="420px" bg="white" align="center">
            <Box>
              <Heading my={4}>Login</Heading>
            </Box>
            {error ? (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            ) : null}
            <Box p="10px" textAlign="center">
              {/* <FormLabel>Username</FormLabel> */}
              <Input
                type="username"
                placeholder="Enter Your Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />

              {/* <FormLabel>Password</FormLabel> */}
              <Input
                mt={4}
                type="password"
                placeholder="*******"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button justify="flex-end" mt={4} onClick={signIn}>
                {isLoading ? (
                  <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" />
                ) : null}
                SIGN IN
              </Button>
            </Box>
          </Stack>
        </Flex>
      </main>
    </>
  );
}
