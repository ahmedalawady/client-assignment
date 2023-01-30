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
import React, { useState, useRef } from 'react';
import { resolveTicket } from '../../../lib/tickets';

const ResolveTicket = ({ ticketId, setIsChanged }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [note, setNote] = useState('');

  const resolveTic = async () => {
    const res = await resolveTicket(ticketId, note);
    console.log('🚀 ~ file: ResolveTicket.js:24 ~ resolveTic ~ note', note);
    console.log(
      '🚀 ~ file: ResolveTicket.js:24 ~ resolveTic ~ ticketId',
      ticketId
    );
    if (res.success) {
      onClose();
      setIsChanged(true);
    } else {
      console.log(res);
    }
  };

  return (
    <>
      <Button color="blue" onClick={onOpen}>
        Resolve
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Resolve Ticket</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Note</FormLabel>
              <Input
                onChange={(e) => {
                  setNote(e.target.value);
                }}
                placeholder="Note"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => resolveTic()} colorScheme="blue" mr={3}>
              Resolve
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ResolveTicket;
