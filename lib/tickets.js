//list tickets function
import { API_ROUTES, APP_ROUTES, BASEURL } from '../utils/constants';
import { getTokenFromLocalStorage } from './auth';
import axios from 'axios';

export const listTickets = async () => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios({
      method: 'get',
      url: BASEURL + API_ROUTES.LIST_TICKETS,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return { success: true, data: response.data };
  } catch (err) {
    console.log('🚀 ~ file: tickets.js:20 ~ listTickets ~ err', err);
    // const {  status} = err.response.data;
    return { success: false, error: err.message };
  }
};

export const resolveTicket = async (id, note) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios({
      method: 'post',
      url: BASEURL + API_ROUTES.RESOLVED_TICKETS,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        id,
        note,
      },
    });
    
    return { success: true, data: response.data };
    
  } catch (err) {
    console.log('🚀 ~ file: tickets.js:43 ~ resolveTicket ~ err', err);
    // const {  status} = err.response.data;
    return { success: false, error: err.message };
  }
};

export const createTicket = async (data) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios({
      method: 'post',
      url: BASEURL + API_ROUTES.Create_TICKETS,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        order_number: data.orderNumber,
        return_reason: data.reason,
      },
    });

    return { success: true, data: response.data };
  } catch (err) {
    console.log('🚀 ~ file: tickets.js:43 ~ resolveTicket ~ err', err);
    // const {  status} = err.response.data;
    return { success: false, error: err.message };
  }
};
