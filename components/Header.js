import { Flex, Image, Box, Button } from '@chakra-ui/react';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';
import { getTokenFromLocalStorage } from '../lib/auth';

const Header = () => {
  const { userAuth, setUserAsLoggedOut } = useContext(AuthContext);
  return (
    <Flex as="header" justifyContent="space-between" alignItems="center" p={4}>
      <Image src="/images/logo.svg" alt="Site logo" size="40px" />
      <Box flex="1"></Box>
      {userAuth.isLoggedIn && getTokenFromLocalStorage() ? (
        <Button onClick={() => setUserAsLoggedOut()} fontWeight="medium">
          Logout
        </Button>
      ) : null}
    </Flex>
  );
};

export default Header;
