export const ticketReducer = (state, action) => {
    switch (action.type) {
      case 'GET_TICKETS':
        return action.payload;
      case 'CREATE_TICKET':
        return [...state, action.payload];
      case 'RESOLVE_TICKET':
        return state.map((ticket) => ticket.id === action.payload.id ? action.payload : ticket);
      default:
        return state;
    }
  };