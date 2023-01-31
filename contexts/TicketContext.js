import React, { createContext, useReducer } from 'react';
import { ticketReducer } from '../reducers/ticketReducer';

export const TicketContext = createContext();

const initialState = {
  tickets: [],
  loading: true,
};

const TicketContextProvider = (props) => {
  const [tickets, dispatch] = useReducer(ticketReducer, []);

  return (
    <TicketContext.Provider value={{ tickets, dispatch }}>
      {props.children}
    </TicketContext.Provider>
  );
};

export default TicketContextProvider;
