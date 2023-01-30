import { useState, useEffect, useContext } from 'react';
import Layout from '../../components/Layout';
import { listTickets } from '../../lib/tickets';
import { AuthContext } from '../../contexts/AuthContext';
import ResolveTicket from './components/ResolveTicket';
import CreateTicket from './components/CreateTicket';
import {
  Table,
  Thead,
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

export default function ListTickets() {
  const [isLoading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [data, setData] = useState(null);
  const { userAuth } = useContext(AuthContext);

  const getTickets = async function () {
    const data = await listTickets();
    return data;
  };

  useEffect(() => {
    setLoading(true);

    getTickets().then((res) => {
      if (res.success) return setData(res.data);
      setLoading(false);
    });
  }, [isChanged]);

  return (
    <Layout>
      <Flex align="center" justify="space-between" p="4">
        <Heading mb={4}>Tickets</Heading>
        {userAuth.role === USER_ROLES.CUSTOMER ? (
          <CreateTicket setIsChanged={setIsChanged}></CreateTicket>
        ) : null}
      </Flex>

      {data?.length ? (
        <div>
          <TableContainer>
            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  {/* //TODO I have to replace ID with the customer name and email */}
                  <Th>Customer ID</Th>
                  <Th>Reason</Th>
                  <Th>Order Number</Th>
                  <Th>Agent Name</Th>
                  <Th>Status</Th>
                  <Th>Note</Th>
                  {userAuth.role === USER_ROLES.AGENT ? <Th></Th> : null}
                </Tr>
              </Thead>
              <Tbody>
                {data.map((ticket) => (
                  <Tr key={ticket.id}>
                    <Td>{ticket.customer_id}</Td>
                    <Td>{ticket.return_reason}</Td>
                    <Td>{ticket.order_number}</Td>
                    <Td>{ticket.agent?.name || 'NOT ASSIGNED'}</Td>
                    <Td>
                      <Tag
                        size="md"
                        key="md"
                        borderRadius="full"
                        variant="solid"
                        colorScheme={
                          ticket.status === TICKETS_STATUS.RESOLVED
                            ? 'green'
                            : ticket.status === TICKETS_STATUS.INPROGRESS
                            ? 'blue'
                            : 'yellow'
                        }
                      >
                        <TagLabel>{ticket.status}</TagLabel>
                      </Tag>
                    </Td>
                    <Td>{ticket.note || ''}</Td>
                    {userAuth.role === USER_ROLES.AGENT &&
                    ticket.status === TICKETS_STATUS.INPROGRESS ? (
                      <Td>
                        {' '}
                        <ResolveTicket
                          setIsChanged={setIsChanged}
                          ticketId={ticket.id}
                        ></ResolveTicket>
                      </Td>
                    ) : null}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div className="empty">No Tickets.</div>
      )}

      {isLoading ? (
        <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" />
      ) : null}
    </Layout>
  );
}
