import { useEffect, useState, useContext } from 'react';
import { listTickets } from '../../../lib/tickets';
import ResolveTicket from './ResolveTicket';
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  TableContainer,
  Tag,
  TagLabel,
  Tbody,
} from '@chakra-ui/react';
import { USER_ROLES, TICKETS_STATUS } from '../../../utils/constants';
import { TicketContext } from '../../../contexts/TicketContext';

const ListTickets = ({ userRole }) =>{
    const { tickets, dispatch } = useContext(TicketContext);
    const [loading, setLoading] = useState(true);
    const getTickets = async function () {
        const data = await listTickets();
        return data;
    };

    useEffect(() => {
        setLoading(true);
    
        getTickets().then((res) => {
            if (res.success) dispatch({ type: 'GET_TICKETS', payload: res.data });;
            
            setLoading(false);
        });
    }, []);
    
  return (
        <>
            {tickets?.length ? (
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
                        {userRole === USER_ROLES.AGENT ? <Th></Th> : null}
                    </Tr>
                    </Thead>
                    <Tbody>
                    {tickets.map((ticket) => (
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
                        {userRole === USER_ROLES.AGENT &&
                        ticket.status === TICKETS_STATUS.INPROGRESS ? (
                            <Td>
                            {' '}
                            <ResolveTicket
                                // setIsChanged={setIsChanged}
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

            {loading ? (
                <div className="mr-2 w-5 h-5 border-l-2 rounded-full animate-spin" />
            ) : null}
        </>
  );
}

export default ListTickets;