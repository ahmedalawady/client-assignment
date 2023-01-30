export const API_ROUTES = {
  LOG_IN: '/users/login',
  GET_USER: '/users/profile',
  LIST_TICKETS: '/tickets',
  RESOLVED_TICKETS: '/tickets/resolved',
  Create_TICKETS: '/tickets/create',
};

export const BASEURL = 'http://localhost:4000';

export const APP_ROUTES = {
  SIGN_UP: '/signup',
  LOG_IN: '/login',
  HOME: '/',
  PROFILE: '/profile',
};

export const USER_ROLES = {
  ADMIN: 'admin',
  AGENT: 'agent',
  CUSTOMER: 'customer',
};

export const TICKETS_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  INPROGRESS: 'inprogress',
  RESOLVED: 'resolved',
};
