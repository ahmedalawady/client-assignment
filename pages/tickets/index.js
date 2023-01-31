import { useContext } from 'react';
import Layout from '../../components/Layout';
import ListTickets from './components/ListTickets';
import { AuthContext } from '../../contexts/AuthContext';
import CreateTicket from './components/CreateTicket';
import TicketContextProvider from '../../contexts/TicketContext';
import {
  Flex,
  Button,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Tag,
  TagLabel,
  TagCloseButton,
  Tbody,
} from '@chakra-ui/react';
import { USER_ROLES, TICKETS_STATUS } from '../../utils/constants';

export default function Tickets() {
  const { userAuth } = useContext(AuthContext);
  
  return (
    <Layout>
      <TicketContextProvider>
        <Flex align="center" justify="space-between" p="4">
          <Heading mb={4}>Tickets</Heading>
          {userAuth.role === USER_ROLES.CUSTOMER ? (
            <CreateTicket></CreateTicket>
          ) : null}
        </Flex>
        <ListTickets userRole={userAuth.role}></ListTickets>
      </TicketContextProvider>
    </Layout>
  );
}
