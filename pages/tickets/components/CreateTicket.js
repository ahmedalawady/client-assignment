import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { createTicket } from '../../../lib/tickets';
import { TicketContext } from '../../../contexts/TicketContext';

const CreateTicket = () => {
  const { dispatch } = useContext(TicketContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderNumber, setOrderNumber] = useState('');
  const [reason, setReason] = useState('');

  const create = async () => {
    const res = await createTicket({ orderNumber, reason });
    if (res.success) {
      dispatch({ type: 'CREATE_TICKET', payload: res.data });
      onClose();
    } else {
      console.log(res);
    }
  };

  return (
    <>
      <Button size="lg" colorScheme="blue" mt="24px" onClick={onOpen}>
        Create Ticket
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Ticket</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Order Number</FormLabel>
              <Input
                onChange={(e) => {
                  setOrderNumber(e.target.value);
                }}
                placeholder="Order Number"
              />

              <FormLabel>Reason</FormLabel>
              <Input
                onChange={(e) => {
                  setReason(e.target.value);
                }}
                placeholder="Reason"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => create()} colorScheme="blue" mr={3}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateTicket;
